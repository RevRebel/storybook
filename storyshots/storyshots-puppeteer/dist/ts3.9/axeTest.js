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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.axeTest = void 0;
const puppeteer_1 = __importDefault(require("@axe-core/puppeteer"));
const config_1 = require("./config");
const puppeteerTest_1 = require("./puppeteerTest");
exports.axeTest = (customConfig = {}) => {
    const extendedConfig = Object.assign(Object.assign({}, config_1.defaultAxeConfig), customConfig);
    const { beforeAxeTest } = extendedConfig;
    return puppeteerTest_1.puppeteerTest(Object.assign(Object.assign({}, extendedConfig), { testBody(page, testOptions) {
            return __awaiter(this, void 0, void 0, function* () {
                const { element = '#root', exclude, disabledRules, options, config, } = testOptions.context.parameters.a11y || {};
                yield beforeAxeTest(page, options);
                const axe = new puppeteer_1.default(page);
                axe.include(element);
                if (exclude) {
                    axe.exclude(exclude);
                }
                if (options) {
                    axe.options(options);
                }
                if (disabledRules) {
                    axe.disableRules(disabledRules);
                }
                if (config) {
                    axe.configure(config);
                }
                const { violations } = yield axe.analyze();
                expect(violations).toHaveLength(0);
            });
        } }));
};
