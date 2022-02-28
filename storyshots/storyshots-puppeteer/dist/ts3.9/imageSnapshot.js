"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageSnapshot = void 0;
const jest_image_snapshot_1 = require("jest-image-snapshot");
const config_1 = require("./config");
const puppeteerTest_1 = require("./puppeteerTest");
expect.extend({ toMatchImageSnapshot: jest_image_snapshot_1.toMatchImageSnapshot });
exports.imageSnapshot = (customConfig = {}) => {
    const config = Object.assign(Object.assign({}, config_1.defaultImageSnapshotConfig), customConfig);
    const { getMatchOptions, getScreenshotOptions, beforeScreenshot, afterScreenshot } = config;
    return puppeteerTest_1.puppeteerTest(Object.assign(Object.assign({}, config), { testBody(page, options) {
            return __awaiter(this, void 0, void 0, function* () {
                expect.hasAssertions();
                const element = yield beforeScreenshot(page, options);
                const image = yield (element || page).screenshot(getScreenshotOptions(options));
                yield afterScreenshot({ image, context: options.context });
                expect(image).toMatchImageSnapshot(getMatchOptions(options));
            });
        } }));
};
