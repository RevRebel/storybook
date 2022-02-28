import { PuppeteerTestConfig } from './config';
export declare const puppeteerTest: (customConfig?: Partial<PuppeteerTestConfig>) => {
    ({ context }: any): Promise<void>;
    timeout: number;
    afterAll: () => Promise<void>;
    beforeAll: {
        (): Promise<void>;
        timeout: number;
    };
};
