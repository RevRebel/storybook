"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AngularSnapshotSerializer_1 = __importDefault(require("jest-preset-angular/build/AngularSnapshotSerializer"));
const HTMLCommentSerializer_1 = __importDefault(require("jest-preset-angular/build/HTMLCommentSerializer"));
const testing_1 = require("@angular/core/testing");
const testing_2 = require("@angular/platform-browser-dynamic/testing");
const jest_specific_snapshot_1 = require("jest-specific-snapshot");
const renderer_1 = require("@storybook/angular/renderer");
const rxjs_1 = require("rxjs");
jest_specific_snapshot_1.addSerializer(HTMLCommentSerializer_1.default);
jest_specific_snapshot_1.addSerializer(AngularSnapshotSerializer_1.default);
function getRenderedTree(story) {
    const currentStory = story.render();
    const moduleMeta = renderer_1.getStorybookModuleMetadata({
        storyFnAngular: currentStory,
        component: story.component,
        // TODO : To change with the story Id in v7. Currently keep with static id to avoid changes in snapshots
        targetSelector: 'storybook-wrapper',
    }, new rxjs_1.BehaviorSubject(currentStory.props));
    testing_1.TestBed.configureTestingModule({
        imports: [...moduleMeta.imports],
        declarations: [...moduleMeta.declarations],
        providers: [...moduleMeta.providers],
        schemas: [...moduleMeta.schemas],
    });
    testing_1.TestBed.overrideModule(testing_2.BrowserDynamicTestingModule, {
        set: {
            entryComponents: [...moduleMeta.entryComponents],
        },
    });
    return testing_1.TestBed.compileComponents().then(() => {
        const tree = testing_1.TestBed.createComponent(moduleMeta.bootstrap[0]);
        tree.detectChanges();
        // Empty componentInstance remove attributes of the internal main component (<storybook-wrapper>) in snapshot
        return Object.assign(Object.assign({}, tree), { componentInstance: {} });
    });
}
exports.default = getRenderedTree;
