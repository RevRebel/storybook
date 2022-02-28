"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const global_1 = __importDefault(require("global"));
const configure_1 = __importDefault(require("../configure"));
function test(options) {
    return options.framework === 'web-components';
}
function load(options) {
    global_1.default.STORYBOOK_ENV = 'web-components';
    const storybook = jest.requireActual('@storybook/web-components');
    configure_1.default(Object.assign(Object.assign({}, options), { storybook }));
    return {
        framework: 'web-components',
        renderTree: jest.requireActual('./renderTree').default,
        renderShallowTree: () => {
            throw new Error('Shallow renderer is not supported for web-components');
        },
        storybook,
    };
}
const webComponentsLoader = {
    load,
    test,
};
exports.default = webComponentsLoader;
