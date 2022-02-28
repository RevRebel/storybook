"use strict";
/** @jsxRuntime classic */
/** @jsx h */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const global_1 = __importDefault(require("global"));
const configure_1 = __importDefault(require("../configure"));
const hasDependency_1 = __importDefault(require("../hasDependency"));
function test(options) {
    return (options.framework === 'preact' || (!options.framework && hasDependency_1.default('@storybook/preact')));
}
function load(options) {
    global_1.default.STORYBOOK_ENV = 'preact';
    const storybook = jest.requireActual('@storybook/preact');
    configure_1.default(Object.assign(Object.assign({}, options), { storybook }));
    return {
        framework: 'preact',
        renderTree: jest.requireActual('./renderTree').default,
        renderShallowTree: () => {
            throw new Error('Shallow renderer is not supported for preact');
        },
        storybook,
    };
}
const preactLoader = {
    load,
    test,
};
exports.default = preactLoader;
