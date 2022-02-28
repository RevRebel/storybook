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
exports.defaultAxeConfig = exports.defaultImageSnapshotConfig = exports.defaultPuppeteerTestConfig = exports.defaultCommonConfig = void 0;
const noop = () => undefined;
const asyncNoop = () => __awaiter(void 0, void 0, void 0, function* () { return undefined; });
exports.defaultCommonConfig = {
    storybookUrl: 'http://localhost:6006',
    chromeExecutablePath: process.env.SB_CHROMIUM_PATH,
    getGotoOptions: noop,
    customizePage: asyncNoop,
    getCustomBrowser: undefined,
    setupTimeout: 15000,
    testTimeout: 15000,
};
const getTestBody = (options) => options.context.parameters.puppeteerTest;
function defaultTestBody(page, options) {
    const testBody = getTestBody(options);
    if (testBody != null) {
        return testBody(page, options);
    }
    return null;
}
defaultTestBody.filter = (options) => getTestBody(options) != null;
exports.defaultPuppeteerTestConfig = Object.assign(Object.assign({}, exports.defaultCommonConfig), { testBody: defaultTestBody });
// We consider taking the full page is a reasonable default.
const defaultScreenshotOptions = () => ({ fullPage: true, encoding: 'base64' });
exports.defaultImageSnapshotConfig = Object.assign(Object.assign({}, exports.defaultCommonConfig), { getMatchOptions: noop, getScreenshotOptions: defaultScreenshotOptions, beforeScreenshot: noop, afterScreenshot: noop });
exports.defaultAxeConfig = Object.assign(Object.assign({}, exports.defaultCommonConfig), { beforeAxeTest: noop });
