"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line import/no-unresolved
const rax_test_renderer_1 = __importDefault(require("rax-test-renderer"));
function getRenderedTree(story, context, _a) {
    var { renderer } = _a, rendererOptions = __rest(_a, ["renderer"]);
    const storyElement = story.render();
    const currentRenderer = renderer || rax_test_renderer_1.default.create;
    const tree = currentRenderer(storyElement, rendererOptions);
    return tree;
}
exports.default = getRenderedTree;
