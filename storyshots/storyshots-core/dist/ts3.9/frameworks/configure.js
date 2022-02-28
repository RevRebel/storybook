"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMainFile = exports.getPreviewFile = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const core_common_1 = require("@storybook/core-common");
const register_1 = __importDefault(require("@storybook/babel-plugin-require-context-hook/register"));
const global_1 = __importDefault(require("global"));
register_1.default();
const isFile = (file) => {
    try {
        return fs_1.default.lstatSync(file).isFile();
    }
    catch (e) {
        return false;
    }
};
const supportedExtensions = ['ts', 'tsx', 'js', 'jsx'];
const resolveFile = (configDir, supportedFilenames) => supportedFilenames
    .flatMap((filename) => supportedExtensions.map((ext) => path_1.default.join(configDir, `${filename}.${ext}`)))
    .find(isFile) || false;
exports.getPreviewFile = (configDir) => resolveFile(configDir, ['preview', 'config']);
exports.getMainFile = (configDir) => resolveFile(configDir, ['main']);
function getConfigPathParts(input) {
    const configDir = path_1.default.resolve(input);
    if (fs_1.default.lstatSync(configDir).isDirectory()) {
        const output = {};
        const preview = exports.getPreviewFile(configDir);
        const main = exports.getMainFile(configDir);
        if (preview) {
            output.preview = preview;
        }
        if (main) {
            const { stories = [], features = {} } = jest.requireActual(main);
            output.features = features;
            const workingDir = process.cwd();
            output.stories = stories.map((entry) => {
                const specifier = core_common_1.normalizeStoriesEntry(entry, {
                    configDir,
                    workingDir,
                });
                return specifier;
            });
            output.requireContexts = output.stories.map((specifier) => {
                const { path: basePath, recursive, match } = core_common_1.toRequireContext(specifier);
                // eslint-disable-next-line no-underscore-dangle
                return global_1.default.__requireContext(workingDir, basePath, recursive, match);
            });
        }
        return output;
    }
    return { preview: configDir };
}
function configure(options) {
    const { configPath = '.storybook', config, storybook } = options;
    if (config && typeof config === 'function') {
        config(storybook);
        return;
    }
    const { preview, features = {}, stories = [], requireContexts = [], } = getConfigPathParts(configPath);
    global_1.default.FEATURES = features;
    global_1.default.STORIES = stories.map((specifier) => (Object.assign(Object.assign({}, specifier), { importPathMatcher: specifier.importPathMatcher.source })));
    if (preview) {
        // This is essentially the same code as lib/core/src/server/preview/virtualModuleEntry.template
        const { parameters, decorators, globals, globalTypes, argsEnhancers, argTypesEnhancers } = jest.requireActual(preview);
        if (decorators) {
            decorators.forEach((decorator) => storybook.addDecorator(decorator));
        }
        if (parameters || globals || globalTypes) {
            storybook.addParameters(Object.assign(Object.assign({}, parameters), { globals, globalTypes }));
        }
        if (argsEnhancers) {
            argsEnhancers.forEach((enhancer) => storybook.addArgsEnhancer(enhancer));
        }
        if (argTypesEnhancers) {
            argTypesEnhancers.forEach((enhancer) => storybook.addArgTypesEnhancer(enhancer));
        }
    }
    if (requireContexts && requireContexts.length) {
        storybook.configure(requireContexts, false, false);
    }
}
exports.default = configure;
