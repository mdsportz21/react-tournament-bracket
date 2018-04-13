'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RectClipped = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _uuid = require('uuid');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Clipped = function (_PureComponent) {
  _inherits(Clipped, _PureComponent);

  function Clipped() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Clipped);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Clipped.__proto__ || Object.getPrototypeOf(Clipped)).call.apply(_ref, [this].concat(args))), _this), _this._id = (0, _uuid.v4)(), _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Clipped, [{
    key: 'render',
    value: function render() {
      var _id = this._id,
          _props = this.props,
          path = _props.path,
          children = _props.children;


      return _react2.default.createElement(
        'g',
        null,
        _react2.default.createElement(
          'defs',
          null,
          _react2.default.createElement(
            'clipPath',
            { id: _id },
            path
          )
        ),
        _react2.default.createElement(
          'g',
          { clipPath: 'url(#' + _id + ')' },
          children
        )
      );
    }
  }]);

  return Clipped;
}(_react.PureComponent);

Clipped.propTypes = {
  path: _react.PropTypes.oneOfType([_react.PropTypes.node, _react.PropTypes.arrayOf(_react.PropTypes.node)]).isRequired
};
Clipped.defaultProps = {};
exports.default = Clipped;
;

var RectClipped = exports.RectClipped = function (_PureComponent2) {
  _inherits(RectClipped, _PureComponent2);

  function RectClipped() {
    _classCallCheck(this, RectClipped);

    return _possibleConstructorReturn(this, (RectClipped.__proto__ || Object.getPrototypeOf(RectClipped)).apply(this, arguments));
  }

  _createClass(RectClipped, [{
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          x = _props2.x,
          y = _props2.y,
          width = _props2.width,
          height = _props2.height,
          children = _props2.children;


      return _react2.default.createElement(
        Clipped,
        { path: _react2.default.createElement('rect', { x: x, y: y, width: width, height: height }) },
        children
      );
    }
  }]);

  return RectClipped;
}(_react.PureComponent);

RectClipped.propTypes = {
  x: _react.PropTypes.number.isRequired,
  y: _react.PropTypes.number.isRequired,
  width: _react.PropTypes.number.isRequired,
  height: _react.PropTypes.number.isRequired
};
RectClipped.defaultProps = {};