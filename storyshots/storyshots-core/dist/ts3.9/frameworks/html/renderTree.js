"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const global_1 = __importDefault(require("global"));
const { document, Node } = global_1.default;
function getRenderedTree(story) {
    const component = story.render();
    if (component instanceof Node) {
        return component;
    }
    const section = document.createElement('section');
    section.innerHTML = component;
    if (section.childElementCount > 1) {
        return section;
    }
    return section.firstChild;
}
exports.default = getRenderedTree;
