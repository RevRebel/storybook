"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const global_1 = __importDefault(require("global"));
const hasDependency_1 = __importDefault(require("../hasDependency"));
const configure_1 = __importDefault(require("../configure"));
function test(options) {
    return (options.framework === 'svelte' || (!options.framework && hasDependency_1.default('@storybook/svelte')));
}
function load(options) {
    global_1.default.STORYBOOK_ENV = 'svelte';
    const storybook = jest.requireActual('@storybook/svelte');
    configure_1.default(Object.assign(Object.assign({}, options), { storybook }));
    return {
        framework: 'svelte',
        renderTree: jest.requireActual('./renderTree').default,
        renderShallowTree: () => {
            throw new Error('Shallow renderer is not supported for svelte');
        },
        storybook,
    };
}
const svelteLoader = {
    load,
    test,
};
exports.default = svelteLoader;
