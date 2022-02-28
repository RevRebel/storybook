"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const global_1 = __importDefault(require("global"));
const hasDependency_1 = __importDefault(require("../hasDependency"));
const configure_1 = __importDefault(require("../configure"));
function mockRiotToIncludeCompiler() {
    jest.mock('riot', () => jest.requireActual('riot/riot.js'));
}
function test(options) {
    return options.framework === 'riot' || (!options.framework && hasDependency_1.default('@storybook/riot'));
}
function load(options) {
    global_1.default.STORYBOOK_ENV = 'riot';
    mockRiotToIncludeCompiler();
    const storybook = jest.requireActual('@storybook/riot');
    configure_1.default(Object.assign(Object.assign({}, options), { storybook }));
    return {
        framework: 'riot',
        renderTree: jest.requireActual('./renderTree').default,
        renderShallowTree: () => {
            throw new Error('Shallow renderer is not supported for riot');
        },
        storybook,
    };
}
const riotLoader = {
    load,
    test,
};
exports.default = riotLoader;
