"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("core-js");
require("core-js/es/reflect");
const hasDependency_1 = __importDefault(require("../hasDependency"));
const configure_1 = __importDefault(require("../configure"));
function setupAngularJestPreset() {
    // Needed to prevent "Zone.js has detected that ZoneAwarePromise `(window|global).Promise` has been overwritten."
    jest.requireActual('core-js');
    jest.requireActual('core-js/modules/es.promise');
    // jest.requireActual('core-js/es6/reflect');
    // jest.requireActual('core-js/es7/reflect');
    // Angular + Jest + Storyshots = Crazy Shit:
    // We need to require 'jest-preset-angular/build/setupJest' before any storybook code
    // is running inside jest -  one of the things that `jest-preset-angular/build/setupJest` does is
    // extending the `window.Reflect` with all the needed metadata functions, that are required
    // for emission of the TS decorations like 'design:paramtypes'
    try {
        jest.requireActual('jest-preset-angular/build/setupJest');
    }
    catch (e) {
        jest.requireActual('jest-preset-angular/build/setup-jest');
    }
}
function test(options) {
    return (options.framework === 'angular' || (!options.framework && hasDependency_1.default('@storybook/angular')));
}
function load(options) {
    setupAngularJestPreset();
    const storybook = jest.requireActual('@storybook/angular');
    configure_1.default(Object.assign(Object.assign({}, options), { storybook }));
    return {
        framework: 'angular',
        renderTree: jest.requireActual('./renderTree').default,
        renderShallowTree: () => {
            throw new Error('Shallow renderer is not supported for angular');
        },
        storybook,
    };
}
const angularLoader = {
    load,
    test,
};
exports.default = angularLoader;
