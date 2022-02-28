import { AnyFramework } from '@storybook/csf';
import { ClientApi } from './Loader';
import { StoryshotsOptions } from '../api/StoryshotsOptions';
export declare const getPreviewFile: (configDir: string) => string | false;
export declare const getMainFile: (configDir: string) => string | false;
declare function configure<TFramework extends AnyFramework>(options: {
    storybook: ClientApi<TFramework>;
} & StoryshotsOptions): void;
export default configure;
