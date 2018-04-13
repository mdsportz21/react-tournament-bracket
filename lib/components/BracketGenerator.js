"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _underscore = require("underscore");

var _underscore2 = _interopRequireDefault(_underscore);

var _Bracket = require("./Bracket");

var _Bracket2 = _interopRequireDefault(_Bracket);

var _winningPathLength = require("../util/winningPathLength");

var _winningPathLength2 = _interopRequireDefault(_winningPathLength);

var _GameShape = require("./GameShape");

var _GameShape2 = _interopRequireDefault(_GameShape);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var makeFinals = function makeFinals(_ref) {
  var games = _ref.games;

  var isInGroup = function () {
    var gameIdHash = _underscore2.default.chain(games).indexBy('id').mapObject(function (val) {
      return 1;
    }).value();
    return function (id) {
      return Boolean(gameIdHash[id]);
    };
  }();

  var gamesFeedInto = _underscore2.default.map(games, function (game) {
    return _extends({}, game, {
      feedsInto: _underscore2.default.filter(games, function (_ref2) {
        var id = _ref2.id,
            sides = _ref2.sides;
        return isInGroup(id) && _underscore2.default.any(sides, function (_ref3) {
          var seed = _ref3.seed;
          return seed !== null && seed.sourceGame !== null && seed.rank === 1 && seed.sourceGame.id === game.id;
        });
      })
    });
  });

  return _underscore2.default.chain(gamesFeedInto)
  // get the games that don't feed into anything else in the group, i.e. finals for this game group
  .filter(function (_ref4) {
    var feedsInto = _ref4.feedsInto;
    return feedsInto.length === 0;
  }).map(
  // get their heights
  function (game) {
    return {
      game: game,
      height: (0, _winningPathLength2.default)(game)
    };
  })
  // render the tallest bracket first
  .sortBy(function (_ref5) {
    var height = _ref5.height;
    return height * -1;
  }).value();
};

/**
 * The default title component used for each bracket, receives the game and the height of the bracket
 */

var BracketTitle = function (_PureComponent) {
  _inherits(BracketTitle, _PureComponent);

  function BracketTitle() {
    _classCallCheck(this, BracketTitle);

    return _possibleConstructorReturn(this, (BracketTitle.__proto__ || Object.getPrototypeOf(BracketTitle)).apply(this, arguments));
  }

  _createClass(BracketTitle, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          game = _props.game,
          height = _props.height;


      return _react2.default.createElement(
        "h3",
        { style: { textAlign: 'center' } },
        game.bracketLabel || game.name,
        " (",
        height,
        " ",
        height === 1 ? 'round' : 'rounds',
        ")"
      );
    }
  }]);

  return BracketTitle;
}(_react.PureComponent);

/**
 * Displays the brackets for some set of games sorted by bracket height
 */


BracketTitle.propTypes = {
  game: _GameShape2.default.isRequired,
  height: _react.PropTypes.number.isRequired
};

var BracketGenerator = function (_Component) {
  _inherits(BracketGenerator, _Component);

  function BracketGenerator() {
    var _ref6;

    var _temp, _this2, _ret;

    _classCallCheck(this, BracketGenerator);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref6 = BracketGenerator.__proto__ || Object.getPrototypeOf(BracketGenerator)).call.apply(_ref6, [this].concat(args))), _this2), _this2.state = {
      finals: makeFinals({ games: _this2.props.games })
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(BracketGenerator, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(_ref7) {
      var games = _ref7.games;

      if (games !== this.props.games) {
        this.setState({ finals: makeFinals({ games: games }) });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _props2 = this.props,
          games = _props2.games,
          TitleComponent = _props2.titleComponent,
          style = _props2.style,
          rest = _objectWithoutProperties(_props2, ["games", "titleComponent", "style"]);

      var finals = this.state.finals;


      return _react2.default.createElement(
        "div",
        { className: "bracketGenerator", style: _extends({ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }, style) },
        _underscore2.default.map(finals, function (_ref8) {
          var game = _ref8.game,
              height = _ref8.height;
          return _react2.default.createElement(
            "div",
            { key: game.id, style: { textAlign: 'center', flexGrow: 1, maxWidth: '100%' } },
            _react2.default.createElement(TitleComponent, { game: game, height: height }),
            _react2.default.createElement(
              "div",
              { style: { maxWidth: '100%', overflow: 'auto', WebkitOverflowScrolling: 'touch' } },
              _react2.default.createElement(_Bracket2.default, _extends({ game: game }, rest))
            )
          );
        })
      );
    }
  }]);

  return BracketGenerator;
}(_react.Component);

BracketGenerator.propTypes = {
  games: _react.PropTypes.arrayOf(_GameShape2.default).isRequired,

  titleComponent: _react.PropTypes.func
};
BracketGenerator.defaultProps = {
  titleComponent: BracketTitle
};
exports.default = BracketGenerator;