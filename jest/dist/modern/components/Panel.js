import React, { Fragment } from 'react';
import { styled, themes, convert } from '@storybook/theming';
import { ScrollArea, TabsState, Link, Placeholder } from '@storybook/components';
import { SizeMe } from 'react-sizeme';
import Result from './Result';
import provideJestResult from '../hoc/provideJestResult';
const StatusTypes = {
  PASSED_TYPE: 'passed',
  FAILED_TYPE: 'failed',
  PENDING_TYPE: 'pending',
  TODO_TYPE: 'todo'
};
const List = styled.ul({
  listStyle: 'none',
  fontSize: 14,
  padding: 0,
  margin: 0
});
const Item = styled.li({
  display: 'block',
  padding: 0
});
const ProgressWrapper = styled.div({
  position: 'relative',
  height: 10,
  width: 30,
  display: 'flex',
  top: -2
});
const SuiteHead = styled.div({
  display: 'flex',
  alignItems: 'baseline',
  position: 'absolute',
  zIndex: 2,
  right: 20,
  marginTop: 15
});
const SuiteTotals = styled(({
  result,
  className,
  width
}) => /*#__PURE__*/React.createElement("div", {
  className: className
}, /*#__PURE__*/React.createElement(Fragment, null, width > 325 && result.assertionResults ? /*#__PURE__*/React.createElement("div", null, result.assertionResults.length, " ", result.assertionResults.length > 1 ? `tests` : `test`) : null, width > 280 && result.endTime && result.startTime ? /*#__PURE__*/React.createElement("div", null, result.endTime - result.startTime, "ms") : null)))(({
  theme
}) => ({
  display: 'flex',
  alignItems: 'center',
  color: theme.color.dark,
  fontSize: '14px',
  marginTop: -5,
  '& > *': {
    marginRight: 10
  }
}));
const SuiteProgressPortion = styled.div(({
  theme,
  color,
  progressPercent
}) => ({
  height: 6,
  top: 3,
  width: `${progressPercent}%`,
  backgroundColor: color
}));

const getTestsByTypeMap = result => {
  const testsByType = new Map();
  result.assertionResults.forEach(assertion => {
    testsByType.set(assertion.status, testsByType.get(assertion.status) ? testsByType.get(assertion.status).concat(assertion) : [assertion]);
  });
  return testsByType;
};

const getColorByType = type => {
  // using switch to allow for new types to be added
  switch (type) {
    case StatusTypes.PASSED_TYPE:
      return convert(themes.normal).color.positive;

    case StatusTypes.FAILED_TYPE:
      return convert(themes.normal).color.negative;

    case StatusTypes.PENDING_TYPE:
      return convert(themes.normal).color.warning;

    case StatusTypes.TODO_TYPE:
      return convert(themes.normal).color.purple;

    default:
      return null;
  }
};

const Content = styled(({
  tests,
  className
}) => /*#__PURE__*/React.createElement("div", {
  className: className
}, tests.map(({
  name,
  result
}) => {
  if (!result || !result.assertionResults) {
    return /*#__PURE__*/React.createElement(Placeholder, {
      key: name
    }, "This story has tests configured, but no file was found");
  }

  const testsByType = getTestsByTypeMap(result);
  const entries = testsByType.entries();
  const sortedTestsByCount = [...entries].sort((a, b) => a[1].length - b[1].length);
  return /*#__PURE__*/React.createElement(SizeMe, {
    refreshMode: "debounce",
    key: name
  }, ({
    size
  }) => {
    const {
      width
    } = size;
    return /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement(SuiteHead, null, /*#__PURE__*/React.createElement(SuiteTotals, {
      result,
      width
    }), width > 240 ? /*#__PURE__*/React.createElement(ProgressWrapper, null, sortedTestsByCount.map(entry => {
      return /*#__PURE__*/React.createElement(SuiteProgressPortion, {
        key: `progress-portion-${entry[0]}`,
        color: getColorByType(entry[0]),
        progressPercent: entry[1] ? entry[1].length / result.assertionResults.length * 100 : 0
      });
    })) : null), /*#__PURE__*/React.createElement(TabsState, {
      initial: "failing-tests",
      backgroundColor: convert(themes.normal).background.hoverable
    }, /*#__PURE__*/React.createElement("div", {
      id: "failing-tests",
      title: `${testsByType.get(StatusTypes.FAILED_TYPE) ? testsByType.get(StatusTypes.FAILED_TYPE).length : 0} Failed`,
      color: getColorByType(StatusTypes.FAILED_TYPE)
    }, /*#__PURE__*/React.createElement(List, null, testsByType.get(StatusTypes.FAILED_TYPE) ? testsByType.get(StatusTypes.FAILED_TYPE).map(res => /*#__PURE__*/React.createElement(Item, {
      key: res.fullName || res.title
    }, /*#__PURE__*/React.createElement(Result, res))) : /*#__PURE__*/React.createElement(Placeholder, {
      key: `no-tests-${StatusTypes.FAILED_TYPE}`
    }, "This story has no failing tests."))), /*#__PURE__*/React.createElement("div", {
      id: "passing-tests",
      title: `${testsByType.get(StatusTypes.PASSED_TYPE) ? testsByType.get(StatusTypes.PASSED_TYPE).length : 0} Passed`,
      color: getColorByType(StatusTypes.PASSED_TYPE)
    }, /*#__PURE__*/React.createElement(List, null, testsByType.get(StatusTypes.PASSED_TYPE) ? testsByType.get(StatusTypes.PASSED_TYPE).map(res => /*#__PURE__*/React.createElement(Item, {
      key: res.fullName || res.title
    }, /*#__PURE__*/React.createElement(Result, res))) : /*#__PURE__*/React.createElement(Placeholder, {
      key: `no-tests-${StatusTypes.PASSED_TYPE}`
    }, "This story has no passing tests."))), /*#__PURE__*/React.createElement("div", {
      id: "pending-tests",
      title: `${testsByType.get(StatusTypes.PENDING_TYPE) ? testsByType.get(StatusTypes.PENDING_TYPE).length : 0} Pending`,
      color: getColorByType(StatusTypes.PENDING_TYPE)
    }, /*#__PURE__*/React.createElement(List, null, testsByType.get(StatusTypes.PENDING_TYPE) ? testsByType.get(StatusTypes.PENDING_TYPE).map(res => /*#__PURE__*/React.createElement(Item, {
      key: res.fullName || res.title
    }, /*#__PURE__*/React.createElement(Result, res))) : /*#__PURE__*/React.createElement(Placeholder, {
      key: `no-tests-${StatusTypes.PENDING_TYPE}`
    }, "This story has no pending tests."))), /*#__PURE__*/React.createElement("div", {
      id: "todo-tests",
      title: `${testsByType.get(StatusTypes.TODO_TYPE) ? testsByType.get(StatusTypes.TODO_TYPE).length : 0} Todo`,
      color: getColorByType(StatusTypes.TODO_TYPE)
    }, /*#__PURE__*/React.createElement(List, null, testsByType.get(StatusTypes.TODO_TYPE) ? testsByType.get(StatusTypes.TODO_TYPE).map(res => /*#__PURE__*/React.createElement(Item, {
      key: res.fullName || res.title
    }, /*#__PURE__*/React.createElement(Result, res))) : /*#__PURE__*/React.createElement(Placeholder, {
      key: `no-tests-${StatusTypes.TODO_TYPE}`
    }, "This story has no tests todo.")))));
  });
})))({
  flex: '1 1 0%'
});

const Panel = ({
  tests
}) => /*#__PURE__*/React.createElement(ScrollArea, {
  vertical: true
}, tests ? /*#__PURE__*/React.createElement(Content, {
  tests: tests
}) : /*#__PURE__*/React.createElement(Placeholder, null, /*#__PURE__*/React.createElement(Fragment, null, "No tests found"), /*#__PURE__*/React.createElement(Fragment, null, "Learn how to\xA0", /*#__PURE__*/React.createElement(Link, {
  href: "https://github.com/storybookjs/storybook/tree/master/addons/jest",
  target: "_blank",
  withArrow: true
}, "add Jest test results to your story"))));

Panel.defaultProps = {
  tests: null
};
export default provideJestResult(Panel);