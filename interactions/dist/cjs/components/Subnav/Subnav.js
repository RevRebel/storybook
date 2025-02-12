"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Subnav = exports.StyledIconButton = void 0;

var _react = _interopRequireDefault(require("react"));

var _components = require("@storybook/components");

var _instrumenter = require("@storybook/instrumenter");

var _theming = require("@storybook/theming");

var _StatusBadge = require("../StatusBadge/StatusBadge");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SubnavWrapper = _theming.styled.div(function (_ref) {
  var theme = _ref.theme;
  return {
    background: theme.background.app,
    borderBottom: "1px solid ".concat(theme.appBorderColor),
    position: 'sticky',
    top: 0,
    zIndex: 1
  };
});

var StyledSubnav = _theming.styled.nav(function (_ref2) {
  var theme = _ref2.theme;
  return {
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 15
  };
});

var StyledButton = (0, _theming.styled)(_components.Button)(function (_ref3) {
  var theme = _ref3.theme;
  return {
    borderRadius: 4,
    padding: 6,
    color: theme.textMutedColor,
    '&:not(:disabled)': {
      '&:hover,&:focus-visible': {
        color: theme.color.secondary
      }
    }
  };
});
var Note = (0, _theming.styled)(_components.TooltipNote)(function (_ref4) {
  var theme = _ref4.theme;
  return {
    fontFamily: theme.typography.fonts.base
  };
});
var StyledIconButton = (0, _theming.styled)(_components.IconButton)(function (_ref5) {
  var theme = _ref5.theme;
  return {
    color: theme.color.mediumdark,
    margin: '0 3px'
  };
});
exports.StyledIconButton = StyledIconButton;
var StyledSeparator = (0, _theming.styled)(_components.Separator)({
  marginTop: 0
});
var StyledLocation = (0, _theming.styled)(_components.P)(function (_ref6) {
  var theme = _ref6.theme;
  return {
    color: theme.textMutedColor,
    justifyContent: 'flex-end',
    textAlign: 'right',
    whiteSpace: 'nowrap',
    marginTop: 'auto',
    marginBottom: 1,
    paddingRight: 15,
    fontSize: 13
  };
});

var Group = _theming.styled.div({
  display: 'flex',
  alignItems: 'center'
});

var RewindButton = (0, _theming.styled)(StyledIconButton)({
  marginLeft: 9
});
var JumpToEndButton = (0, _theming.styled)(StyledButton)({
  marginLeft: 9,
  marginRight: 9,
  marginBottom: 1,
  lineHeight: '12px'
});

var Subnav = function Subnav(_ref7) {
  var controls = _ref7.controls,
      controlStates = _ref7.controlStates,
      status = _ref7.status,
      storyFileName = _ref7.storyFileName,
      onScrollToEnd = _ref7.onScrollToEnd;
  var buttonText = status === _instrumenter.CallStates.ERROR ? 'Scroll to error' : 'Scroll to end';
  return /*#__PURE__*/_react.default.createElement(SubnavWrapper, null, /*#__PURE__*/_react.default.createElement(_components.Bar, null, /*#__PURE__*/_react.default.createElement(StyledSubnav, null, /*#__PURE__*/_react.default.createElement(Group, null, /*#__PURE__*/_react.default.createElement(_StatusBadge.StatusBadge, {
    status: status
  }), /*#__PURE__*/_react.default.createElement(JumpToEndButton, {
    onClick: onScrollToEnd,
    disabled: !onScrollToEnd
  }, buttonText), /*#__PURE__*/_react.default.createElement(StyledSeparator, null), /*#__PURE__*/_react.default.createElement(_components.WithTooltip, {
    hasChrome: false,
    tooltip: /*#__PURE__*/_react.default.createElement(Note, {
      note: "Go to start"
    })
  }, /*#__PURE__*/_react.default.createElement(RewindButton, {
    containsIcon: true,
    onClick: controls.start,
    disabled: !controlStates.start
  }, /*#__PURE__*/_react.default.createElement(_components.Icons, {
    icon: "rewind"
  }))), /*#__PURE__*/_react.default.createElement(_components.WithTooltip, {
    hasChrome: false,
    tooltip: /*#__PURE__*/_react.default.createElement(Note, {
      note: "Go back"
    })
  }, /*#__PURE__*/_react.default.createElement(StyledIconButton, {
    containsIcon: true,
    onClick: controls.back,
    disabled: !controlStates.back
  }, /*#__PURE__*/_react.default.createElement(_components.Icons, {
    icon: "playback"
  }))), /*#__PURE__*/_react.default.createElement(_components.WithTooltip, {
    hasChrome: false,
    tooltip: /*#__PURE__*/_react.default.createElement(Note, {
      note: "Go forward"
    })
  }, /*#__PURE__*/_react.default.createElement(StyledIconButton, {
    containsIcon: true,
    onClick: controls.next,
    disabled: !controlStates.next
  }, /*#__PURE__*/_react.default.createElement(_components.Icons, {
    icon: "playnext"
  }))), /*#__PURE__*/_react.default.createElement(_components.WithTooltip, {
    hasChrome: false,
    tooltip: /*#__PURE__*/_react.default.createElement(Note, {
      note: "Go to end"
    })
  }, /*#__PURE__*/_react.default.createElement(StyledIconButton, {
    containsIcon: true,
    onClick: controls.end,
    disabled: !controlStates.end
  }, /*#__PURE__*/_react.default.createElement(_components.Icons, {
    icon: "fastforward"
  })))), storyFileName && /*#__PURE__*/_react.default.createElement(Group, null, /*#__PURE__*/_react.default.createElement(StyledLocation, null, storyFileName)))));
};

exports.Subnav = Subnav;