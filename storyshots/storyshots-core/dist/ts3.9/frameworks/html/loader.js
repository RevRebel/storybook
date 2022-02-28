"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const global_1 = __importDefault(require("global"));
const configure_1 = __importDefault(require("../configure"));
function test(options) {
    return options.framework === 'html';
}
function load(options) {
    global_1.default.STORYBOOK_ENV = 'html';
    const storybook = jest.requireActual('@storybook/html');
    configure_1.default(Object.assign(Object.assign({}, options), { storybook }));
    return {
        framework: 'html',
        renderTree: jest.requireActual('./renderTree').default,
        renderShallowTree: () => {
            throw new Error('Shallow renderer is not supported for HTML');
        },
        storybook,
    };
}
const htmLoader = {
    load,
    test,
};
exports.default = htmLoader;
