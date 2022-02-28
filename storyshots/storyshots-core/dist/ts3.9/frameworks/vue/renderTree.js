"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = __importDefault(require("vue"));
// this is defined in @storybook/vue but not exported,
// and we need it to inject args into the story component's props
const VALUES = 'STORYBOOK_VALUES';
function getRenderedTree(story) {
    const component = story.render();
    const vm = new vue_1.default({
        render(h) {
            return h(component);
        },
    });
    // @ts-ignore
    vm[VALUES] = story.initialArgs;
    return vm.$mount().$el;
}
exports.default = getRenderedTree;
