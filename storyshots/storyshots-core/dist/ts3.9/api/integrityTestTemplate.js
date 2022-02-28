"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable jest/no-export */
const fs_1 = __importDefault(require("fs"));
const glob_1 = __importDefault(require("glob"));
const global_1 = __importDefault(require("global"));
const ts_dedent_1 = __importDefault(require("ts-dedent"));
const { describe, it } = global_1.default;
expect.extend({
    notToBeAbandoned(storyshots, stories2snapsConverter) {
        const abandonedStoryshots = storyshots.filter((fileName) => {
            const possibleStoriesFiles = stories2snapsConverter.getPossibleStoriesFiles(fileName);
            return !possibleStoriesFiles.some(fs_1.default.existsSync);
        });
        if (abandonedStoryshots.length === 0) {
            return { pass: true, message: () => '' };
        }
        const formattedList = abandonedStoryshots.join('\n  ');
        // See https://github.com/facebook/jest/issues/8732#issuecomment-516445064
        // eslint-disable-next-line no-underscore-dangle
        const isUpdate = expect.getState().snapshotState._updateSnapshot === 'all';
        if (isUpdate) {
            abandonedStoryshots.forEach((file) => fs_1.default.unlinkSync(file));
            // eslint-disable-next-line no-console
            console.log(ts_dedent_1.default `
        Removed abandoned storyshots:
          ${formattedList}
      `);
            return { pass: true, message: () => '' };
        }
        return {
            pass: false,
            message: () => ts_dedent_1.default `
          Found abandoned storyshots. Run jest with -u to remove them:
            ${formattedList}
        `,
        };
    },
});
function integrityTest(integrityOptions, stories2snapsConverter) {
    if (integrityOptions === false) {
        return;
    }
    describe('Storyshots Integrity', () => {
        it('Abandoned Storyshots', () => {
            const snapshotExtension = stories2snapsConverter.getSnapshotExtension();
            const storyshots = glob_1.default.sync(`**/*${snapshotExtension}`, integrityOptions);
            // @ts-ignore
            expect(storyshots).notToBeAbandoned(stories2snapsConverter);
        });
    });
}
exports.default = integrityTest;
