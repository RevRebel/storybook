"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stories2SnapsConverter = void 0;
const path_1 = __importDefault(require("path"));
const ts_dedent_1 = __importDefault(require("ts-dedent"));
const defaultOptions = {
    snapshotsDirName: '__snapshots__',
    snapshotExtension: '.storyshot',
    storiesExtensions: ['.js', '.jsx', '.ts', '.tsx', '.mdx'],
};
class Stories2SnapsConverter {
    constructor(options = {}) {
        this.getSnapshotExtension = () => this.options.snapshotExtension;
        this.options = Object.assign(Object.assign({}, defaultOptions), options);
    }
    getStoryshotFile(fileName) {
        const { dir, name } = path_1.default.parse(fileName);
        const { snapshotsDirName, snapshotExtension } = this.options;
        return path_1.default.format({ dir: path_1.default.join(dir, snapshotsDirName), name, ext: snapshotExtension });
    }
    getSnapshotFileName(context) {
        const { fileName, kind } = context;
        if (!fileName) {
            // eslint-disable-next-line no-console
            console.warn(ts_dedent_1.default `
          Storybook was unable to detect filename for stories of kind "${kind}".
          To fix it, add following to your jest.config.js:
              transform: {
                // should be above any other js transform like babel-jest
                '^.+\\.stories\\.js$': '@storybook/addon-storyshots/injectFileName',
              }
        `);
            return null;
        }
        return this.getStoryshotFile(fileName);
    }
    getPossibleStoriesFiles(storyshotFile) {
        const { dir, name } = path_1.default.parse(storyshotFile);
        const { storiesExtensions } = this.options;
        return storiesExtensions.map((ext) => path_1.default.format({
            dir: path_1.default.dirname(dir),
            name,
            ext,
        }));
    }
}
exports.Stories2SnapsConverter = Stories2SnapsConverter;
