"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.snapshot = exports.renderOnly = exports.renderWithOptions = exports.shallowSnapshot = exports.multiSnapshotWithOptions = exports.snapshotWithOptions = void 0;
require("jest-specific-snapshot");
const isFunction = (obj) => !!(obj && obj.constructor && obj.call && obj.apply);
const optionsOrCallOptions = (opts, story) => (isFunction(opts) ? opts(story) : opts);
function snapshotWithOptions(options = {}) {
    return ({ story, context, renderTree, snapshotFileName }) => {
        const result = renderTree(story, context, optionsOrCallOptions(options, story));
        function match(tree) {
            let target = tree;
            const isReact = story.parameters.framework === 'react';
            if (isReact && typeof tree.childAt === 'function') {
                target = tree.childAt(0);
            }
            if (isReact && Array.isArray(tree.children)) {
                [target] = tree.children;
            }
            if (snapshotFileName) {
                expect(target).toMatchSpecificSnapshot(snapshotFileName);
            }
            else {
                expect(target).toMatchSnapshot();
            }
            if (typeof tree.unmount === 'function') {
                tree.unmount();
            }
        }
        if (typeof result.then === 'function') {
            return result.then(match);
        }
        return match(result);
    };
}
exports.snapshotWithOptions = snapshotWithOptions;
function multiSnapshotWithOptions(options = {}) {
    return ({ story, context, renderTree, stories2snapsConverter }) => {
        const snapshotFileName = stories2snapsConverter.getSnapshotFileName(context);
        return snapshotWithOptions(options)({ story, context, renderTree, snapshotFileName });
    };
}
exports.multiSnapshotWithOptions = multiSnapshotWithOptions;
exports.shallowSnapshot = ({ story, context, renderShallowTree, options = {}, }) => {
    const result = renderShallowTree(story, context, options);
    expect(result).toMatchSnapshot();
};
function renderWithOptions(options = {}) {
    return ({ story, context, renderTree }) => {
        const result = renderTree(story, context, options);
        if (typeof result.then === 'function') {
            return result;
        }
        return undefined;
    };
}
exports.renderWithOptions = renderWithOptions;
exports.renderOnly = renderWithOptions();
exports.snapshot = snapshotWithOptions();
