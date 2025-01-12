import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.array.from.js";
import "core-js/modules/es.regexp.exec.js";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import React, { useState } from 'react';
import { useChannel, useStorybookApi } from '@storybook/api';
import { Icons, IconButton } from '@storybook/components';
import { FORCE_REMOUNT } from '@storybook/core-events';
import { styled } from '@storybook/theming';
import { TOOL_ID } from './constants';
var StyledAnimatedIconButton = styled(IconButton)(function (_ref) {
  var theme = _ref.theme,
      animating = _ref.animating,
      disabled = _ref.disabled;
  return {
    opacity: disabled ? 0.5 : 1,
    svg: {
      animation: animating && "".concat(theme.animation.rotate360, " 1000ms ease-out")
    }
  };
});
export var Tool = function Tool() {
  var _ref2 = useStorybookApi().getCurrentStoryData() || {},
      storyId = _ref2.id;

  var emit = useChannel({});

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      isAnimating = _useState2[0],
      setIsAnimating = _useState2[1];

  var animateAndReplay = function animateAndReplay() {
    if (!storyId) return;
    setIsAnimating(true);
    emit(FORCE_REMOUNT, {
      storyId: storyId
    });
  };

  return /*#__PURE__*/React.createElement(StyledAnimatedIconButton, {
    key: TOOL_ID,
    title: "Rerun interactions",
    onClick: animateAndReplay,
    onAnimationEnd: function onAnimationEnd() {
      return setIsAnimating(false);
    },
    animating: isAnimating,
    disabled: !storyId
  }, /*#__PURE__*/React.createElement(Icons, {
    icon: "sync"
  }));
};