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
exports.puppeteerTest = void 0;
const node_logger_1 = require("@storybook/node-logger");
const url_1 = require("./url");
const config_1 = require("./config");
exports.puppeteerTest = (customConfig = {}) => {
    const { storybookUrl, chromeExecutablePath, getGotoOptions, customizePage, getCustomBrowser, testBody, setupTimeout, testTimeout, } = Object.assign(Object.assign({}, config_1.defaultPuppeteerTestConfig), customConfig);
    let browser; // holds ref to browser. (ie. Chrome)
    let page; // Hold ref to the page to screenshot.
    const testFn = ({ context }) => __awaiter(void 0, void 0, void 0, function* () {
        const { kind, framework, name, id } = context;
        if (framework === 'react-native') {
            // Skip tests since RN is not a browser environment.
            node_logger_1.logger.error("It seems you are running puppeteer test on RN app and it's not supported. Skipping test.");
            return;
        }
        const url = url_1.constructUrl(storybookUrl, id);
        const options = { context, url };
        if (testBody.filter != null && !testBody.filter(options)) {
            return;
        }
        if (!browser || !page) {
            node_logger_1.logger.error(`Error when running puppeteer test for ${kind} - ${name} : It seems the headless browser is not running.`);
            throw new Error('no-headless-browser-running');
        }
        try {
            yield customizePage(page);
            yield page.goto(url, getGotoOptions(options));
        }
        catch (e) {
            node_logger_1.logger.error(`Error when connecting to ${url}, did you start or build the storybook first? A storybook instance should be running or a static version should be built when using puppeteer test feature.`);
            throw e;
        }
        yield testBody(page, options);
    });
    testFn.timeout = testTimeout;
    const cleanup = () => __awaiter(void 0, void 0, void 0, function* () {
        if (getCustomBrowser && page) {
            yield page.close();
        }
        else if (browser) {
            yield browser.close();
        }
    });
    process.on('SIGINT', () => __awaiter(void 0, void 0, void 0, function* () {
        yield cleanup();
        process.exit();
    }));
    testFn.afterAll = cleanup;
    const beforeAll = () => __awaiter(void 0, void 0, void 0, function* () {
        if (getCustomBrowser) {
            browser = yield getCustomBrowser();
        }
        else {
            // eslint-disable-next-line global-require
            const puppeteer = require('puppeteer');
            // add some options "no-sandbox" to make it work properly on some Linux systems as proposed here: https://github.com/Googlechrome/puppeteer/issues/290#issuecomment-322851507
            browser = yield puppeteer.launch({
                args: ['--no-sandbox ', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
                executablePath: chromeExecutablePath,
            });
        }
        page = yield browser.newPage();
    });
    beforeAll.timeout = setupTimeout;
    testFn.beforeAll = beforeAll;
    return testFn;
};
