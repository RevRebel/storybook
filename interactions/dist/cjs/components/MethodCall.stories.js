"use strict";

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.function.name.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Simple = exports.Nested = exports.Complex = exports.Chained = exports.Args = void 0;

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.regexp.constructor.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.regexp.to-string.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.map.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireDefault(require("react"));

var _theming = require("@storybook/theming");

var _MethodCall = require("./MethodCall");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StyledWrapper = _theming.styled.div(function (_ref) {
  var theme = _ref.theme;
  return {
    backgroundColor: theme.background.content,
    padding: '20px',
    boxShadow: "0 0 0 1px ".concat(theme.appBorderColor),
    color: theme.color.defaultText,
    fontFamily: _theming.typography.fonts.mono,
    fontSize: _theming.typography.size.s1
  };
});

var _default = {
  title: 'Addons/Interactions/MethodCall',
  component: _MethodCall.MethodCall,
  decorators: [function (Story) {
    return /*#__PURE__*/_react.default.createElement(StyledWrapper, null, /*#__PURE__*/_react.default.createElement(Story, null));
  }],
  parameters: {
    layout: 'fullscreen'
  }
};
exports.default = _default;

var FooBar = /*#__PURE__*/_createClass(function FooBar() {
  _classCallCheck(this, FooBar);
});

var Args = function Args() {
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: 'inline-flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/_react.default.createElement(_MethodCall.Node, {
    value: null
  }), /*#__PURE__*/_react.default.createElement(_MethodCall.Node, {
    value: undefined
  }), /*#__PURE__*/_react.default.createElement(_MethodCall.Node, {
    value: "Hello world"
  }), /*#__PURE__*/_react.default.createElement(_MethodCall.Node, {
    value: "https://github.com/storybookjs/storybook/blob/next/README.md"
  }), /*#__PURE__*/_react.default.createElement(_MethodCall.Node, {
    value: "012345678901234567890123456789012345678901234567890123456789"
  }), /*#__PURE__*/_react.default.createElement(_MethodCall.Node, {
    value: true
  }), /*#__PURE__*/_react.default.createElement(_MethodCall.Node, {
    value: false
  }), /*#__PURE__*/_react.default.createElement(_MethodCall.Node, {
    value: 12345
  }), /*#__PURE__*/_react.default.createElement(_MethodCall.Node, {
    value: ['foo', 1, {
      hello: 'world'
    }]
  }), /*#__PURE__*/_react.default.createElement(_MethodCall.Node, {
    value: _toConsumableArray(Array(23)).map(function (_, i) {
      return i;
    })
  }), /*#__PURE__*/_react.default.createElement(_MethodCall.Node, {
    value: {
      hello: 'world'
    }
  }), /*#__PURE__*/_react.default.createElement(_MethodCall.Node, {
    value: {
      hello: 'world',
      arr: [1, 2, 3],
      more: 1
    }
  }), /*#__PURE__*/_react.default.createElement(_MethodCall.Node, {
    value: new FooBar()
  }), /*#__PURE__*/_react.default.createElement(_MethodCall.Node, {
    value: function goFaster() {}
  }), /*#__PURE__*/_react.default.createElement(_MethodCall.Node, {
    value: {
      __element__: {
        localName: 'hr'
      }
    }
  }), /*#__PURE__*/_react.default.createElement(_MethodCall.Node, {
    value: {
      __element__: {
        localName: 'foo',
        prefix: 'x'
      }
    }
  }), /*#__PURE__*/_react.default.createElement(_MethodCall.Node, {
    value: {
      __element__: {
        localName: 'div',
        id: 'foo'
      }
    }
  }), /*#__PURE__*/_react.default.createElement(_MethodCall.Node, {
    value: {
      __element__: {
        localName: 'span',
        classNames: ['foo', 'bar']
      }
    }
  }), /*#__PURE__*/_react.default.createElement(_MethodCall.Node, {
    value: {
      __element__: {
        localName: 'button',
        innerText: 'Click me'
      }
    }
  }), /*#__PURE__*/_react.default.createElement(_MethodCall.Node, {
    value: new Date(Date.UTC(2012, 11, 20, 0, 0, 0))
  }), /*#__PURE__*/_react.default.createElement(_MethodCall.Node, {
    value: new Date(1600000000000)
  }), /*#__PURE__*/_react.default.createElement(_MethodCall.Node, {
    value: new Date(1600000000123)
  }), /*#__PURE__*/_react.default.createElement(_MethodCall.Node, {
    value: new EvalError()
  }), /*#__PURE__*/_react.default.createElement(_MethodCall.Node, {
    value: new SyntaxError("Can't do that")
  }), /*#__PURE__*/_react.default.createElement(_MethodCall.Node, {
    value: new TypeError("Cannot read property 'foo' of undefined")
  }), /*#__PURE__*/_react.default.createElement(_MethodCall.Node, {
    value: new ReferenceError('Invalid left-hand side in assignment')
  }), /*#__PURE__*/_react.default.createElement(_MethodCall.Node, {
    value: new Error("XMLHttpRequest cannot load https://example.com. No 'Access-Control-Allow-Origin' header is present on the requested resource.")
  }), /*#__PURE__*/_react.default.createElement(_MethodCall.Node, {
    value: /hello/i
  }), /*#__PURE__*/_react.default.createElement(_MethodCall.Node, {
    value: new RegExp("src(.*)\\.js$")
  }), /*#__PURE__*/_react.default.createElement(_MethodCall.Node, {
    value: Symbol()
  }), /*#__PURE__*/_react.default.createElement(_MethodCall.Node, {
    value: Symbol('Hello world')
  }));
};

exports.Args = Args;
var calls = [{
  id: '1',
  path: ['screen'],
  method: 'getByText',
  storyId: 'kind--story',
  args: ['Click'],
  interceptable: false,
  retain: false
}, {
  id: '2',
  path: ['userEvent'],
  method: 'click',
  storyId: 'kind--story',
  args: [{
    __callId__: '1'
  }],
  interceptable: true,
  retain: false
}, {
  id: '3',
  path: [],
  method: 'expect',
  storyId: 'kind--story',
  args: [true],
  interceptable: true,
  retain: false
}, {
  id: '4',
  path: [{
    __callId__: '3'
  }, 'not'],
  method: 'toBe',
  storyId: 'kind--story',
  args: [false],
  interceptable: true,
  retain: false
}, {
  id: '5',
  path: ['jest'],
  method: 'fn',
  storyId: 'kind--story',
  args: [function actionHandler() {}],
  interceptable: false,
  retain: false
}, {
  id: '6',
  path: [],
  method: 'expect',
  storyId: 'kind--story',
  args: [{
    __callId__: '5'
  }],
  interceptable: false,
  retain: false
}, {
  id: '7',
  path: ['expect'],
  method: 'stringMatching',
  storyId: 'kind--story',
  args: [/hello/i],
  interceptable: false,
  retain: false
}, {
  id: '8',
  path: [{
    __callId__: '6'
  }, 'not'],
  method: 'toHaveBeenCalledWith',
  storyId: 'kind--story',
  args: [{
    __callId__: '7'
  }, new Error("Cannot read property 'foo' of undefined")],
  interceptable: false,
  retain: false
}];
var callsById = calls.reduce(function (acc, call) {
  acc.set(call.id, call);
  return acc;
}, new Map());

var Simple = function Simple() {
  return /*#__PURE__*/_react.default.createElement(_MethodCall.MethodCall, {
    call: callsById.get('1'),
    callsById: callsById
  });
};

exports.Simple = Simple;

var Nested = function Nested() {
  return /*#__PURE__*/_react.default.createElement(_MethodCall.MethodCall, {
    call: callsById.get('2'),
    callsById: callsById
  });
};

exports.Nested = Nested;

var Chained = function Chained() {
  return /*#__PURE__*/_react.default.createElement(_MethodCall.MethodCall, {
    call: callsById.get('4'),
    callsById: callsById
  });
};

exports.Chained = Chained;

var Complex = function Complex() {
  return /*#__PURE__*/_react.default.createElement(_MethodCall.MethodCall, {
    call: callsById.get('8'),
    callsById: callsById
  });
};

exports.Complex = Complex;