"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const global_1 = __importDefault(require("global"));
const internal_1 = require("svelte/internal");
const { document } = global_1.default;
/**
 * Provides functionality to convert your raw story to the resulting markup.
 *
 * Storybook snapshots need the rendered markup that svelte outputs,
 * but since we only have the story config data ({ Component, data }) in
 * the Svelte stories, we need to mount the component, and then return the
 * resulting HTML.
 *
 * If we don't render to HTML, we will get a snapshot of the raw story
 * i.e. ({ Component, data }).
 */
function getRenderedTree(story) {
    // allow setContext to work
    internal_1.set_current_component({ $$: { context: new Map() } });
    const { Component, props } = story.render();
    const DefaultCompatComponent = Component.default || Component;
    // We need to create a target to mount onto.
    const target = document.createElement('section');
    new DefaultCompatComponent({ target, props }); // eslint-disable-line
    // Classify the target so that it is clear where the markup
    // originates from, and that it is specific for snapshot tests.
    target.className = 'storybook-snapshot-container';
    return target;
}
exports.default = getRenderedTree;
