"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const global_1 = __importDefault(require("global"));
const addons_1 = require("@storybook/addons");
const ensureOptionsDefaults_1 = __importDefault(require("./ensureOptionsDefaults"));
const snapshotsTestsTemplate_1 = __importDefault(require("./snapshotsTestsTemplate"));
const integrityTestTemplate_1 = __importDefault(require("./integrityTestTemplate"));
const frameworkLoader_1 = __importDefault(require("../frameworks/frameworkLoader"));
const { describe, window: globalWindow } = global_1.default;
global_1.default.STORYBOOK_REACT_CLASSES = global_1.default.STORYBOOK_REACT_CLASSES || {};
const methods = ['beforeAll', 'beforeEach', 'afterEach', 'afterAll'];
function callTestMethodGlobals(testMethod) {
    methods.forEach((method) => {
        if (typeof testMethod[method] === 'function') {
            global_1.default[method](testMethod[method], testMethod[method].timeout);
        }
    });
}
const isDisabled = (parameter) => parameter === false || (parameter && parameter.disable === true);
function testStorySnapshots(options = {}) {
    if (typeof describe !== 'function') {
        throw new Error('testStorySnapshots is intended only to be used inside jest');
    }
    addons_1.addons.setChannel(addons_1.mockChannel());
    const { storybook, framework, renderTree, renderShallowTree } = frameworkLoader_1.default(options);
    const { asyncJest, suite, storyNameRegex, storyKindRegex, stories2snapsConverter, testMethod, integrityOptions, snapshotSerializers, } = ensureOptionsDefaults_1.default(options);
    const testMethodParams = {
        renderTree,
        renderShallowTree,
        stories2snapsConverter,
    };
    // NOTE: as the store + preview's initialization process entirely uses
    // `SychronousPromise`s in the v6 store case, the callback to the `then()` here
    // will run *immediately* (in the same tick), and thus the `snapshotsTests`, and
    // subsequent calls to `it()` etc will all happen within this tick, which is required
    // by Jest (cannot add tests asynchronously)
    globalWindow.__STORYBOOK_STORY_STORE__.initializationPromise.then(() => {
        const data = storybook.raw().reduce((acc, item) => {
            if (storyNameRegex && !item.name.match(storyNameRegex)) {
                return acc;
            }
            if (storyKindRegex && !item.kind.match(storyKindRegex)) {
                return acc;
            }
            const { kind, storyFn: render, parameters } = item;
            const existing = acc.find((i) => i.kind === kind);
            const { fileName } = item.parameters;
            if (!isDisabled(parameters.storyshots)) {
                if (existing) {
                    existing.children.push(Object.assign(Object.assign({}, item), { render, fileName }));
                }
                else {
                    acc.push({
                        kind,
                        children: [Object.assign(Object.assign({}, item), { render, fileName })],
                    });
                }
            }
            return acc;
        }, []);
        if (data.length) {
            callTestMethodGlobals(testMethod);
            snapshotsTestsTemplate_1.default({
                data,
                asyncJest,
                suite,
                framework,
                testMethod,
                testMethodParams,
                snapshotSerializers,
            });
            integrityTestTemplate_1.default(integrityOptions, stories2snapsConverter);
        }
        else {
            throw new Error('storyshots found 0 stories');
        }
    });
}
exports.default = testStorySnapshots;
