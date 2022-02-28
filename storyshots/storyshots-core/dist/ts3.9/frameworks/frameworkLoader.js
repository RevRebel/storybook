"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable global-require,import/no-dynamic-require */
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const loaderScriptName = 'loader.js';
const isDirectory = (source) => fs_1.default.lstatSync(source).isDirectory();
function getLoaders() {
    return fs_1.default
        .readdirSync(__dirname)
        .map((name) => path_1.default.join(__dirname, name))
        .filter(isDirectory)
        .map((framework) => path_1.default.join(framework, loaderScriptName))
        .filter(fs_1.default.existsSync)
        .map((loader) => require(loader).default);
}
function loadFramework(options) {
    const loaders = getLoaders();
    const loader = loaders.find((frameworkLoader) => frameworkLoader.test(options));
    if (!loader) {
        throw new Error("Couldn't find an appropriate framework loader -- do you need to set the `framework` option?");
    }
    return loader.load(options);
}
exports.default = loadFramework;
