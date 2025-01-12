function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

import "core-js/modules/es.array.concat.js";
import "core-js/modules/es.object.get-prototype-of.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.reflect.construct.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

import React, { Component as ReactComponent } from 'react';
import { STORY_CHANGED } from '@storybook/core-events';
import { ADD_TESTS } from '../shared'; // TODO: import type from @types/jest

var provideTests = function provideTests(Component) {
  var _class, _temp;

  return _temp = _class = /*#__PURE__*/function (_ReactComponent) {
    _inherits(TestProvider, _ReactComponent);

    var _super = _createSuper(TestProvider);

    function TestProvider() {
      var _this;

      _classCallCheck(this, TestProvider);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));
      _this.state = {};

      _this.onAddTests = function (_ref) {
        var kind = _ref.kind,
            storyName = _ref.storyName,
            tests = _ref.tests;

        _this.setState({
          kind: kind,
          storyName: storyName,
          tests: tests
        });
      };

      _this.mounted = void 0;
      _this.stopListeningOnStory = void 0;
      return _this;
    }

    _createClass(TestProvider, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this2 = this;

        this.mounted = true;
        var api = this.props.api;
        this.stopListeningOnStory = api.on(STORY_CHANGED, function () {
          var _this2$state = _this2.state,
              kind = _this2$state.kind,
              storyName = _this2$state.storyName,
              tests = _this2$state.tests;

          if (_this2.mounted && (kind || storyName || tests)) {
            _this2.onAddTests({});
          }
        });
        api.on(ADD_TESTS, this.onAddTests);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.mounted = false;
        var api = this.props.api;
        this.stopListeningOnStory();
        api.off(ADD_TESTS, this.onAddTests);
      }
    }, {
      key: "render",
      value: function render() {
        var active = this.props.active;
        var tests = this.state.tests;
        return active ? /*#__PURE__*/React.createElement(Component, {
          tests: tests
        }) : null;
      }
    }]);

    return TestProvider;
  }(ReactComponent), _class.defaultProps = {
    active: false
  }, _temp;
};

export default provideTests;