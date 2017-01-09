'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = reactElementToJSXString;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _collapseWhiteSpace = require('collapse-white-space');

var _collapseWhiteSpace2 = _interopRequireDefault(_collapseWhiteSpace);

var _reactAddonsTestUtils = require('react-addons-test-utils');

var _isPlainObject = require('is-plain-object');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _stringifyObject = require('stringify-object');

var _stringifyObject2 = _interopRequireDefault(_stringifyObject);

var _sortobject = require('sortobject');

var _sortobject2 = _interopRequireDefault(_sortobject);

var _traverse = require('traverse');

var _traverse2 = _interopRequireDefault(_traverse);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function reactElementToJSXString(ReactElement) {
  var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var displayName = _ref.displayName;
  var _ref$showDefaultProps = _ref.showDefaultProps;
  var showDefaultProps = _ref$showDefaultProps === undefined ? true : _ref$showDefaultProps;
  var _ref$showFunctions = _ref.showFunctions;
  var showFunctions = _ref$showFunctions === undefined ? false : _ref$showFunctions;

  var getDisplayName = displayName || getDefaultDisplayName;

  return toJSXString({ ReactElement: ReactElement });

  function toJSXString(_ref2) {
    var _ref2$ReactElement = _ref2.ReactElement;
    var Element = _ref2$ReactElement === undefined ? null : _ref2$ReactElement;
    var _ref2$lvl = _ref2.lvl;
    var lvl = _ref2$lvl === undefined ? 0 : _ref2$lvl;
    var _ref2$inline = _ref2.inline;
    var inline = _ref2$inline === undefined ? false : _ref2$inline;

    if (typeof Element === 'string' || typeof Element === 'number') {
      return Element;
    } else if (!(0, _reactAddonsTestUtils.isElement)(Element)) {
      throw new Error('react-element-to-jsx-string: Expected a ReactElement,\ngot `' + (typeof Element === 'undefined' ? 'undefined' : _typeof(Element)) + '`');
    }

    var tagName = getDisplayName(Element);

    var out = '<' + tagName;
    var props = formatProps(Element.props, getDefaultProps(Element));
    var attributes = [];
    var children = _react2.default.Children.toArray(Element.props.children).filter(onlyMeaningfulChildren);

    if (Element.ref !== null) {
      attributes.push(getJSXAttribute('ref', Element.ref));
    }

    if (Element.key !== null &&
    // React automatically add key=".X" when there are some children
    !/^\./.test(Element.key)) {
      attributes.push(getJSXAttribute('key', Element.key));
    }

    attributes = attributes.concat(props);

    attributes.forEach(function (attribute) {
      if (attributes.length === 1 || inline) {
        out += ' ';
      } else {
        out += '\n' + spacer(lvl + 1);
      }

      if (attribute.value === '{true}') {
        out += '' + attribute.name;
      } else {
        out += attribute.name + '=' + attribute.value;
      }
    });

    if (attributes.length > 1 && !inline) {
      out += '\n' + spacer(lvl);
    }

    if (children.length > 0) {
      out += '>';
      lvl++;
      if (!inline) {
        out += '\n';
        out += spacer(lvl);
      }

      if (typeof children === 'string') {
        out += children;
      } else {
        out += children.reduce(mergePlainStringChildren, []).map(recurse({ lvl: lvl, inline: inline })).join('\n' + spacer(lvl));
      }
      if (!inline) {
        out += '\n';
        out += spacer(lvl - 1);
      }
      out += '</' + tagName + '>';
    } else {
      if (attributes.length <= 1) {
        out += ' ';
      }

      out += '/>';
    }

    return out;
  }

  function formatProps(props, defaultProps) {
    var formatted = Object.keys(props).filter(noChildren).filter(function (key) {
      return noFalse(props[key]);
    });

    if (!showDefaultProps) {
      formatted = formatted.filter(function (key) {
        return defaultProps[key] ? defaultProps[key] !== props[key] : true;
      });
    }

    return formatted.sort().map(function (propName) {
      return getJSXAttribute(propName, props[propName]);
    });
  }

  function getJSXAttribute(name, value) {
    return {
      name: name,
      value: formatJSXAttribute(value).replace(/'?<__reactElementToJSXString__Wrapper__>/g, '').replace(/<\/__reactElementToJSXString__Wrapper__>'?/g, '')
    };
  }

  function formatJSXAttribute(propValue) {
    if (typeof propValue === 'string') {
      return '"' + propValue + '"';
    }

    return '{' + formatValue(propValue) + '}';
  }

  function formatValue(value) {
    var wrapper = '__reactElementToJSXString__Wrapper__';

    if (typeof value === 'function' && !showFunctions) {
      return function noRefCheck() {};
    } else if ((0, _reactAddonsTestUtils.isElement)(value)) {
      // we use this delimiter hack in cases where the react element is a property
      // of an object from a root prop
      // i.e.
      //   reactElementToJSXString(<div a={{b: <div />}} />
      //   // <div a={{b: <div />}} />
      // we then remove the whole wrapping
      // otherwise, the element would be surrounded by quotes: <div a={{b: '<div />'}} />
      return '<' + wrapper + '>' + toJSXString({ ReactElement: value, inline: true }) + '</' + wrapper + '>';
    } else if ((0, _isPlainObject2.default)(value) || Array.isArray(value)) {
      return '<' + wrapper + '>' + stringifyObject(value) + '</' + wrapper + '>';
    }

    return value;
  }

  function recurse(_ref3) {
    var lvl = _ref3.lvl;
    var inline = _ref3.inline;

    return function (Element) {
      return toJSXString({ ReactElement: Element, lvl: lvl, inline: inline });
    };
  }

  function stringifyObject(obj) {
    if (Object.keys(obj).length > 0 || obj.length > 0) {
      // eslint-disable-next-line array-callback-return
      obj = (0, _traverse2.default)(obj).map(function (value) {
        if ((0, _reactAddonsTestUtils.isElement)(value) || this.isLeaf) {
          this.update(formatValue(value));
        }
      });

      obj = (0, _sortobject2.default)(obj);
    }

    return (0, _collapseWhiteSpace2.default)((0, _stringifyObject2.default)(obj)).replace(/{ /g, '{').replace(/ }/g, '}').replace(/\[ /g, '[').replace(/ \]/g, ']');
  }
}

function getDefaultDisplayName(ReactElement) {
  return ReactElement.type.name || // function name
  ReactElement.type.displayName || (typeof ReactElement.type === 'function' ? // function without a name, you should provide one
  'No Display Name' : ReactElement.type);
}

function getDefaultProps(ReactElement) {
  return ReactElement.type.defaultProps || {};
}

function mergePlainStringChildren(prev, cur) {
  var lastItem = prev[prev.length - 1];

  if (typeof cur === 'number') {
    cur = String(cur);
  }

  if (typeof lastItem === 'string' && typeof cur === 'string') {
    prev[prev.length - 1] += cur;
  } else {
    prev.push(cur);
  }

  return prev;
}

function spacer(times) {
  return (0, _lodash.fill)(new Array(times), '  ').join('');
}

function noChildren(propName) {
  return propName !== 'children';
}

function noFalse(propValue) {
  return typeof propValue !== 'boolean' || propValue;
}

function onlyMeaningfulChildren(children) {
  return children !== true && children !== false && children !== null && children !== '';
}
