"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Vue = __importStar(require("vue"));
const global_1 = __importDefault(require("global"));
const vue3_1 = require("@storybook/vue3");
const { document } = global_1.default;
// This is cast as `any` to workaround type errors caused by Vue 2 types
const { h } = Vue;
let vm;
function getRenderedTree(story) {
    const component = story.render();
    const vnode = h(component, story.args);
    // Vue 3's Jest renderer throws if all of the required props aren't specified
    // So we try/catch and warn the user if they forgot to specify one in their args
    vue3_1.activeStoryComponent.value = vnode;
    if (!vm) {
        vm = vue3_1.app.mount(document.createElement('div'));
    }
    vm.$forceUpdate();
    return vm.$el;
}
exports.default = getRenderedTree;
