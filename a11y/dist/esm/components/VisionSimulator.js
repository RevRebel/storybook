function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import "core-js/modules/es.array.filter.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.array.concat.js";
import "core-js/modules/es.array.map.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.array.from.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.regexp.exec.js";
import React, { useState } from 'react';
import { Global, styled } from '@storybook/theming';
import { Icons, IconButton, WithTooltip, TooltipLinkList } from '@storybook/components';
import { Filters } from './ColorFilters';
var iframeId = 'storybook-preview-iframe';
var baseList = ['blurred vision', 'deuteranomaly', 'deuteranopia', 'protanomaly', 'protanopia', 'tritanomaly', 'tritanopia', 'achromatomaly', 'achromatopsia', 'grayscale'];

var getFilter = function getFilter(filter) {
  if (!filter) {
    return 'none';
  }

  if (filter === 'blurred vision') {
    return 'blur(2px)';
  }

  if (filter === 'grayscale') {
    return 'grayscale(100%)';
  }

  return "url('#".concat(filter, "')");
};

var Hidden = styled.div(function () {
  return {
    '&, & svg': {
      position: 'absolute',
      width: 0,
      height: 0
    }
  };
});
var ColorIcon = styled.span({
  background: 'linear-gradient(to right, #F44336, #FF9800, #FFEB3B, #8BC34A, #2196F3, #9C27B0)',
  borderRadius: '1rem',
  display: 'block',
  height: '1rem',
  width: '1rem'
}, function (_ref) {
  var filter = _ref.filter;
  return {
    filter: getFilter(filter)
  };
}, function (_ref2) {
  var theme = _ref2.theme;
  return {
    boxShadow: "".concat(theme.appBorderColor, " 0 0 0 1px inset")
  };
});

var getColorList = function getColorList(active, set) {
  return [].concat(_toConsumableArray(active !== null ? [{
    id: 'reset',
    title: 'Reset color filter',
    onClick: function onClick() {
      set(null);
    },
    right: undefined,
    active: false
  }] : []), _toConsumableArray(baseList.map(function (i) {
    return {
      id: i,
      title: i.charAt(0).toUpperCase() + i.slice(1),
      onClick: function onClick() {
        set(i);
      },
      right: /*#__PURE__*/React.createElement(ColorIcon, {
        filter: i
      }),
      active: active === i
    };
  })));
};

export var VisionSimulator = function VisionSimulator() {
  var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      filter = _useState2[0],
      setFilter = _useState2[1];

  return /*#__PURE__*/React.createElement(React.Fragment, null, filter && /*#__PURE__*/React.createElement(Global, {
    styles: _defineProperty({}, "#".concat(iframeId), {
      filter: getFilter(filter)
    })
  }), /*#__PURE__*/React.createElement(WithTooltip, {
    placement: "top",
    trigger: "click",
    tooltip: function tooltip(_ref4) {
      var onHide = _ref4.onHide;
      var colorList = getColorList(filter, function (i) {
        setFilter(i);
        onHide();
      });
      return /*#__PURE__*/React.createElement(TooltipLinkList, {
        links: colorList
      });
    },
    closeOnClick: true,
    onDoubleClick: function onDoubleClick() {
      return setFilter(null);
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    key: "filter",
    active: !!filter,
    title: "Vision simulator"
  }, /*#__PURE__*/React.createElement(Icons, {
    icon: "accessibility"
  }))), /*#__PURE__*/React.createElement(Hidden, null, /*#__PURE__*/React.createElement(Filters, null)));
};