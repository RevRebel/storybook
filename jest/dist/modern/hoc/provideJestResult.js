import React, { Component as ReactComponent } from 'react';
import { STORY_CHANGED } from '@storybook/core-events';
import { ADD_TESTS } from '../shared'; // TODO: import type from @types/jest

const provideTests = Component => {
  var _class, _temp;

  return _temp = _class = class TestProvider extends ReactComponent {
    constructor(...args) {
      super(...args);
      this.state = {};

      this.onAddTests = ({
        kind,
        storyName,
        tests
      }) => {
        this.setState({
          kind,
          storyName,
          tests
        });
      };

      this.mounted = void 0;
      this.stopListeningOnStory = void 0;
    }

    componentDidMount() {
      this.mounted = true;
      const {
        api
      } = this.props;
      this.stopListeningOnStory = api.on(STORY_CHANGED, () => {
        const {
          kind,
          storyName,
          tests
        } = this.state;

        if (this.mounted && (kind || storyName || tests)) {
          this.onAddTests({});
        }
      });
      api.on(ADD_TESTS, this.onAddTests);
    }

    componentWillUnmount() {
      this.mounted = false;
      const {
        api
      } = this.props;
      this.stopListeningOnStory();
      api.off(ADD_TESTS, this.onAddTests);
    }

    render() {
      const {
        active
      } = this.props;
      const {
        tests
      } = this.state;
      return active ? /*#__PURE__*/React.createElement(Component, {
        tests: tests
      }) : null;
    }

  }, _class.defaultProps = {
    active: false
  }, _temp;
};

export default provideTests;