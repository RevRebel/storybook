"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const global_1 = __importDefault(require("global"));
const configure_1 = __importDefault(require("../configure"));
const hasDependency_1 = __importDefault(require("../hasDependency"));
function test(options) {
    return options.framework === 'rax' || (!options.framework && hasDependency_1.default('@storybook/rax'));
}
function load(options) {
    global_1.default.STORYBOOK_ENV = 'rax';
    const storybook = jest.requireActual('@storybook/rax');
    configure_1.default(Object.assign(Object.assign({}, options), { storybook }));
    return {
        framework: 'rax',
        renderTree: jest.requireActual('./renderTree').default,
        renderShallowTree: () => {
            throw new Error('Shallow renderer is not supported for rax');
        },
        storybook,
    };
}
const raxLoader = {
    load,
    test,
};
exports.default = raxLoader;
