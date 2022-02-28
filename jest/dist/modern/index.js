import { addons } from '@storybook/addons';
import { normalize, sep } from 'upath';
import { ADD_TESTS, defineJestParameter } from './shared';

const findTestResults = (testFiles, jestTestResults, jestTestFilesExt) => Object.values(testFiles).map(name => {
  const fileName = `${sep}${name}${jestTestFilesExt}`;

  if (jestTestResults && jestTestResults.testResults) {
    const fileNamePattern = new RegExp(fileName);
    return {
      fileName,
      name,
      result: jestTestResults.testResults.find(test => Boolean(normalize(test.name).match(fileNamePattern)))
    };
  }

  return {
    fileName,
    name
  };
});

const emitAddTests = ({
  kind,
  story,
  testFiles,
  options
}) => {
  addons.getChannel().emit(ADD_TESTS, {
    kind,
    storyName: story,
    tests: findTestResults(testFiles, options.results, options.filesExt)
  });
};

export const withTests = userOptions => {
  const defaultOptions = {
    filesExt: '((\\.specs?)|(\\.tests?))?(\\.[jt]sx?)?$'
  };
  const options = Object.assign({}, defaultOptions, userOptions);
  return (...args) => {
    const [storyFn, {
      kind,
      parameters = {}
    }] = args;
    const testFiles = defineJestParameter(parameters);

    if (testFiles !== null) {
      emitAddTests({
        kind,
        story: storyFn,
        testFiles,
        options
      });
    }

    return storyFn();
  };
};

if (module && module.hot && module.hot.decline) {
  module.hot.decline();
}