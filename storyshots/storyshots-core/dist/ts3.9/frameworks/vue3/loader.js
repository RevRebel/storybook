"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const global_1 = __importDefault(require("global"));
const hasDependency_1 = __importDefault(require("../hasDependency"));
const configure_1 = __importDefault(require("../configure"));
function test(options) {
    return options.framework === 'vue3' || (!options.framework && hasDependency_1.default('@storybook/vue3'));
}
function load(options) {
    global_1.default.STORYBOOK_ENV = 'vue3';
    const storybook = jest.requireActual('@storybook/vue3');
    configure_1.default(Object.assign(Object.assign({}, options), { storybook }));
    return {
        framework: 'vue3',
        renderTree: jest.requireActual('./renderTree').default,
        renderShallowTree: () => {
            throw new Error('Shallow renderer is not supported for Vue 3');
        },
        storybook,
    };
}
const vueLoader = {
    load,
    test,
};
exports.default = vueLoader;
