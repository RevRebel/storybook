import { AxeConfig } from './config';
export declare const axeTest: (customConfig?: Partial<AxeConfig>) => {
    ({ context }: any): Promise<void>;
    timeout: number;
    afterAll: () => Promise<void>;
    beforeAll: {
        (): Promise<void>;
        timeout: number;
    };
};
