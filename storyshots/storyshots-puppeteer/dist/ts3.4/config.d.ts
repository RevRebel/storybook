import { MatchImageSnapshotOptions } from 'jest-image-snapshot';
import { Base64ScreenShotOptions, Browser, DirectNavigationOptions, Page, ElementHandle } from 'puppeteer';
export interface Context {
    kind: string;
    story: string;
    parameters: {
        [key: string]: any;
    };
}
interface Options {
    context: Context;
    url: string;
}
export interface CommonConfig {
    storybookUrl: string;
    chromeExecutablePath: string;
    getGotoOptions: (options: Options) => DirectNavigationOptions;
    customizePage: (page: Page) => Promise<void>;
    getCustomBrowser: () => Promise<Browser>;
    setupTimeout: number;
    testTimeout: number;
}
export interface PuppeteerTestConfig extends CommonConfig {
    testBody: ((page: Page, options: Options) => void | Promise<void>) & {
        filter?: (options: Options) => boolean;
    };
}
export interface ImageSnapshotConfig extends CommonConfig {
    getMatchOptions: (options: Options) => MatchImageSnapshotOptions;
    getScreenshotOptions: (options: Options) => Base64ScreenShotOptions;
    beforeScreenshot: (page: Page, options: Options) => Promise<void | ElementHandle>;
    afterScreenshot: (options: {
        image: string;
        context: Context;
    }) => Promise<void>;
}
export interface AxeConfig extends CommonConfig {
    beforeAxeTest: (page: Page, options: Options) => Promise<void>;
}
export declare const defaultCommonConfig: CommonConfig;
export declare const defaultPuppeteerTestConfig: PuppeteerTestConfig;
export declare const defaultImageSnapshotConfig: ImageSnapshotConfig;
export declare const defaultAxeConfig: AxeConfig;
export {};
