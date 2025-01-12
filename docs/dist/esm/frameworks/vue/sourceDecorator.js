function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

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

import "regenerator-runtime/runtime.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.promise.js";
import "core-js/modules/es.array.join.js";
import "core-js/modules/es.array.filter.js";
import "core-js/modules/es.array.map.js";
import "core-js/modules/es.array.concat.js";
import "core-js/modules/es.object.entries.js";
import "core-js/modules/es.array.find-index.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.string.replace.js";
import "core-js/modules/es.string.split.js";
import "core-js/modules/es.array.includes.js";
import "core-js/modules/es.string.includes.js";
import "core-js/modules/es.symbol.js";
import "core-js/modules/es.symbol.description.js";
import "core-js/modules/es.symbol.iterator.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import "core-js/modules/es.array.from.js";
import "core-js/modules/es.array.slice.js";
import "core-js/modules/es.function.name.js";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/* eslint no-underscore-dangle: ["error", { "allow": ["_vnode"] }] */
import { addons } from '@storybook/addons';
import { logger } from '@storybook/client-logger';
import { SourceType, SNIPPET_RENDERED } from '../../shared';
export var skipSourceRender = function skipSourceRender(context) {
  var _context$parameters$d;

  var sourceParams = context === null || context === void 0 ? void 0 : (_context$parameters$d = context.parameters.docs) === null || _context$parameters$d === void 0 ? void 0 : _context$parameters$d.source;
  var isArgsStory = context === null || context === void 0 ? void 0 : context.parameters.__isArgsStory; // always render if the user forces it

  if ((sourceParams === null || sourceParams === void 0 ? void 0 : sourceParams.type) === SourceType.DYNAMIC) {
    return false;
  } // never render if the user is forcing the block to render code, or
  // if the user provides code, or if it's not an args story.


  return !isArgsStory || (sourceParams === null || sourceParams === void 0 ? void 0 : sourceParams.code) || (sourceParams === null || sourceParams === void 0 ? void 0 : sourceParams.type) === SourceType.CODE;
};
export var sourceDecorator = function sourceDecorator(storyFn, context) {
  var story = storyFn(); // See ../react/jsxDecorator.tsx

  if (skipSourceRender(context)) {
    return story;
  }

  var channel = addons.getChannel();
  var storyComponent = getStoryComponent(story.options.STORYBOOK_WRAPS);
  return {
    components: {
      Story: story
    },
    // We need to wait until the wrapper component to be mounted so Vue runtime
    // struct VNode tree. We get `this._vnode == null` if switch to `created`
    // lifecycle hook.
    mounted: function mounted() {
      // Theoretically this does not happens but we need to check it.
      if (!this._vnode) {
        return;
      }

      try {
        var storyNode = lookupStoryInstance(this, storyComponent);
        var code = vnodeToString(storyNode._vnode);

        var emitFormattedTemplate = /*#__PURE__*/function () {
          var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var prettier, prettierHtml;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return import('prettier/standalone');

                  case 2:
                    prettier = _context.sent;
                    _context.next = 5;
                    return import('prettier/parser-html');

                  case 5:
                    prettierHtml = _context.sent;
                    channel.emit(SNIPPET_RENDERED, (context || {}).id, prettier.format("<template>".concat(code, "</template>"), {
                      parser: 'vue',
                      plugins: [prettierHtml],
                      // Because the parsed vnode missing spaces right before/after the surround tag,
                      // we always get weird wrapped code without this option.
                      htmlWhitespaceSensitivity: 'ignore'
                    }));

                  case 7:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));

          return function emitFormattedTemplate() {
            return _ref.apply(this, arguments);
          };
        }();

        emitFormattedTemplate();
      } catch (e) {
        logger.warn("Failed to generate dynamic story source: ".concat(e));
      }
    },
    template: '<story />'
  };
};
export function vnodeToString(vnode) {
  var _vnode$data, _vnode$componentOptio, _vnode$data2;

  var attrString = [].concat(_toConsumableArray((_vnode$data = vnode.data) !== null && _vnode$data !== void 0 && _vnode$data.slot ? [['slot', vnode.data.slot]] : []), [['class', stringifyClassAttribute(vnode)]], _toConsumableArray((_vnode$componentOptio = vnode.componentOptions) !== null && _vnode$componentOptio !== void 0 && _vnode$componentOptio.propsData ? Object.entries(vnode.componentOptions.propsData) : []), _toConsumableArray((_vnode$data2 = vnode.data) !== null && _vnode$data2 !== void 0 && _vnode$data2.attrs ? Object.entries(vnode.data.attrs) : [])).filter(function (_ref2, index, list) {
    var _ref3 = _slicedToArray(_ref2, 1),
        name = _ref3[0];

    return list.findIndex(function (item) {
      return item[0] === name;
    }) === index;
  }).map(function (_ref4) {
    var _ref5 = _slicedToArray(_ref4, 2),
        name = _ref5[0],
        value = _ref5[1];

    return stringifyAttr(name, value);
  }).filter(Boolean).join(' ');

  if (!vnode.componentOptions) {
    // Non-component elements (div, span, etc...)
    if (vnode.tag) {
      if (!vnode.children) {
        return "<".concat(vnode.tag, " ").concat(attrString, "/>");
      }

      return "<".concat(vnode.tag, " ").concat(attrString, ">").concat(vnode.children.map(vnodeToString).join(''), "</").concat(vnode.tag, ">");
    } // TextNode


    if (vnode.text) {
      if (/[<>"&]/.test(vnode.text)) {
        return "{{`".concat(vnode.text.replace(/`/g, '\\`'), "`}}");
      }

      return vnode.text;
    } // Unknown


    return '';
  } // Probably users never see the "unknown-component". It seems that vnode.tag
  // is always set.


  var tag = vnode.componentOptions.tag || vnode.tag || 'unknown-component';

  if (!vnode.componentOptions.children) {
    return "<".concat(tag, " ").concat(attrString, "/>");
  }

  return "<".concat(tag, " ").concat(attrString, ">").concat(vnode.componentOptions.children.map(vnodeToString).join(''), "</").concat(tag, ">");
}

function stringifyClassAttribute(vnode) {
  var _vnode$data$staticCla, _vnode$data$staticCla2;

  if (!vnode.data || !vnode.data.staticClass && !vnode.data.class) {
    return undefined;
  }

  return [].concat(_toConsumableArray((_vnode$data$staticCla = (_vnode$data$staticCla2 = vnode.data.staticClass) === null || _vnode$data$staticCla2 === void 0 ? void 0 : _vnode$data$staticCla2.split(' ')) !== null && _vnode$data$staticCla !== void 0 ? _vnode$data$staticCla : []), _toConsumableArray(normalizeClassBinding(vnode.data.class))).filter(Boolean).join(' ') || undefined;
} // https://vuejs.org/v2/guide/class-and-style.html#Binding-HTML-Classes


function normalizeClassBinding(binding) {
  if (!binding) {
    return [];
  }

  if (typeof binding === 'string') {
    return [binding];
  }

  if (binding instanceof Array) {
    // To handle an object-in-array binding smartly, we use recursion
    return binding.map(normalizeClassBinding).reduce(function (a, b) {
      return [].concat(_toConsumableArray(a), _toConsumableArray(b));
    }, []);
  }

  if (_typeof(binding) === 'object') {
    return Object.entries(binding).filter(function (_ref6) {
      var _ref7 = _slicedToArray(_ref6, 2),
          active = _ref7[1];

      return !!active;
    }).map(function (_ref8) {
      var _ref9 = _slicedToArray(_ref8, 1),
          className = _ref9[0];

      return className;
    });
  } // Unknown class binding


  return [];
}

function stringifyAttr(attrName, value) {
  if (typeof value === 'undefined' || typeof value === 'function') {
    return null;
  }

  if (value === true) {
    return attrName;
  }

  if (typeof value === 'string') {
    return "".concat(attrName, "=").concat(quote(value));
  } // TODO: Better serialization (unquoted object key, Symbol/Classes, etc...)
  //       Seems like Prettier don't format JSON-look object (= when keys are quoted)


  return ":".concat(attrName, "=").concat(quote(JSON.stringify(value)));
}

function quote(value) {
  return value.includes("\"") && !value.includes("'") ? "'".concat(value, "'") : "\"".concat(value.replace(/"/g, '&quot;'), "\"");
}
/**
 * Skip decorators and grab a story component itself.
 * https://github.com/pocka/storybook-addon-vue-info/pull/113
 */


function getStoryComponent(w) {
  var matched = w;

  while (matched && matched.options && matched.options.components && matched.options.components.story && matched.options.components.story.options && matched.options.components.story.options.STORYBOOK_WRAPS) {
    matched = matched.options.components.story.options.STORYBOOK_WRAPS;
  }

  return matched;
}

/**
 * Find the story's instance from VNode tree.
 */
function lookupStoryInstance(instance, storyComponent) {
  if (instance.$vnode && instance.$vnode.componentOptions && instance.$vnode.componentOptions.Ctor === storyComponent) {
    return instance;
  }

  for (var i = 0, l = instance.$children.length; i < l; i += 1) {
    var found = lookupStoryInstance(instance.$children[i], storyComponent);

    if (found) {
      return found;
    }
  }

  return null;
}