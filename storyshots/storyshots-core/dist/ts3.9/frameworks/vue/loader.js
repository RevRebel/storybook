"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const global_1 = __importDefault(require("global"));
const hasDependency_1 = __importDefault(require("../hasDependency"));
const configure_1 = __importDefault(require("../configure"));
function mockVueToIncludeCompiler() {
    jest.mock('vue', () => jest.requireActual('vue/dist/vue.common.js'));
}
function test(options) {
    return options.framework === 'vue' || (!options.framework && hasDependency_1.default('@storybook/vue'));
}
function load(options) {
    global_1.default.STORYBOOK_ENV = 'vue';
    mockVueToIncludeCompiler();
    const storybook = jest.requireActual('@storybook/vue');
    configure_1.default(Object.assign(Object.assign({}, options), { storybook }));
    return {
        framework: 'vue',
        renderTree: jest.requireActual('./renderTree').default,
        renderShallowTree: () => {
            throw new Error('Shallow renderer is not supported for vue');
        },
        storybook,
    };
}
const vueLoader = {
    load,
    test,
};
exports.default = vueLoader;
