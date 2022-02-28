import { ImageSnapshotConfig } from './config';
export declare const imageSnapshot: (customConfig?: Partial<ImageSnapshotConfig>) => {
    ({ context }: any): Promise<void>;
    timeout: number;
    afterAll: () => Promise<void>;
    beforeAll: {
        (): Promise<void>;
        timeout: number;
    };
};
