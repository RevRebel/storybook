"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const global_1 = __importDefault(require("global"));
const { document } = global_1.default;
const riotForStorybook = jest.requireActual('@storybook/riot');
function bootstrapADocumentAndReturnANode() {
    const rootElement = document.createElement('div');
    rootElement.id = 'root';
    document.body = document.createElement('body');
    document.body.appendChild(rootElement);
    return rootElement;
}
function makeSureThatResultIsRenderedSomehow({ context, result, rootElement }) {
    if (!rootElement.firstChild) {
        const { kind, name } = context;
        riotForStorybook.render({
            storyFn: () => result,
            kind,
            name,
        });
    }
}
function getRenderedTree(story, context) {
    const rootElement = bootstrapADocumentAndReturnANode();
    const result = story.render();
    makeSureThatResultIsRenderedSomehow({ context, result, rootElement });
    return rootElement;
}
exports.default = getRenderedTree;
