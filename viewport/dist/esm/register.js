import * as React from 'react';
import { addons, types } from '@storybook/addons';
import { ADDON_ID } from './constants';
import { ViewportTool } from './Tool';
addons.register(ADDON_ID, function () {
  addons.add(ADDON_ID, {
    title: 'viewport / media-queries',
    type: types.TOOL,
    match: function match(_ref) {
      var viewMode = _ref.viewMode;
      return viewMode === 'story';
    },
    render: function render() {
      return /*#__PURE__*/React.createElement(ViewportTool, null);
    }
  });
});