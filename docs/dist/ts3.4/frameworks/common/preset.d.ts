import { createCompiler } from '@storybook/csf-tools/mdx';
import { Options } from '@storybook/core-common';
declare type BabelParams = {
    babelOptions?: any;
    mdxBabelOptions?: any;
    configureJSX?: boolean;
};
export declare function webpack(webpackConfig: any, options: Options & BabelParams & {
    sourceLoaderOptions: any;
    transcludeMarkdown: boolean;
} & Parameters<typeof createCompiler>[0]): Promise<any>;
export {};