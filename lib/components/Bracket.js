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

var _GameShape = require("./GameShape");

var _GameShape2 = _interopRequireDefault(_GameShape);

var _winningPathLength = require("../util/winningPathLength");

var _winningPathLength2 = _interopRequireDefault(_winningPathLength);

var _BracketGame = require("./BracketGame");

var _BracketGame2 = _interopRequireDefault(_BracketGame);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var toBracketGames = function toBracketGames(_ref) {
  var GameComponent = _ref.GameComponent,
      game = _ref.game,
      x = _ref.x,
      y = _ref.y,
      gameDimensions = _ref.gameDimensions,
      roundSeparatorWidth = _ref.roundSeparatorWidth,
      round = _ref.round,
      lineInfo = _ref.lineInfo,
      homeOnTop = _ref.homeOnTop,
      rest = _objectWithoutProperties(_ref, ["GameComponent", "game", "x", "y", "gameDimensions", "roundSeparatorWidth", "round", "lineInfo", "homeOnTop"]);

  var gameWidth = gameDimensions.width,
      gameHeight = gameDimensions.height;


  var ySep = gameHeight * Math.pow(2, round - 2);

  return [_react2.default.createElement(
    "g",
    { key: game.id + "-" + y },
    _react2.default.createElement(GameComponent, _extends({}, rest, gameDimensions, {
      key: game.id, homeOnTop: homeOnTop, game: game, x: x, y: y }))
  )].concat(_underscore2.default.chain(game.sides).map(function (obj, side) {
    return _extends({}, obj, { side: side });
  })
  // filter to the teams that come from winning other games
  .filter(function (_ref2) {
    var seed = _ref2.seed;
    return seed && seed.sourceGame !== null && seed.rank === 1;
  }).map(function (_ref3) {
    var sourceGame = _ref3.seed.sourceGame,
        side = _ref3.side;

    // we put visitor teams on the bottom
    var isTop = side === 'home' ? homeOnTop : !homeOnTop,
        multiplier = isTop ? -1 : 1;

    var pathInfo = ["M" + (x - lineInfo.separation) + " " + (y + gameHeight / 2 + lineInfo.yOffset + multiplier * lineInfo.homeVisitorSpread), "H" + (x - roundSeparatorWidth / 2), "V" + (y + gameHeight / 2 + lineInfo.yOffset + ySep / 2 * multiplier), "H" + (x - roundSeparatorWidth + lineInfo.separation)];

    return [_react2.default.createElement("path", { key: game.id + "-" + side + "-" + y + "-path", d: pathInfo.join(' '), fill: "transparent", stroke: "black" })].concat(toBracketGames(_extends({
      GameComponent: GameComponent,
      game: sourceGame,
      homeOnTop: homeOnTop,
      lineInfo: lineInfo,
      gameDimensions: gameDimensions,
      roundSeparatorWidth: roundSeparatorWidth,
      x: x - gameWidth - roundSeparatorWidth,
      y: y + ySep / 2 * multiplier,
      round: round - 1
    }, rest)));
  }).flatten(true).value());
};

/**
 * Displays the bracket that culminates in a particular finals game
 */

var Bracket = function (_Component) {
  _inherits(Bracket, _Component);

  function Bracket() {
    _classCallCheck(this, Bracket);

    return _possibleConstructorReturn(this, (Bracket.__proto__ || Object.getPrototypeOf(Bracket)).apply(this, arguments));
  }

  _createClass(Bracket, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          GameComponent = _props.GameComponent,
          game = _props.game,
          gameDimensions = _props.gameDimensions,
          svgPadding = _props.svgPadding,
          roundSeparatorWidth = _props.roundSeparatorWidth,
          rest = _objectWithoutProperties(_props, ["GameComponent", "game", "gameDimensions", "svgPadding", "roundSeparatorWidth"]);

      var numRounds = (0, _winningPathLength2.default)(game);

      var svgDimensions = {
        height: gameDimensions.height * Math.pow(2, numRounds - 1) + svgPadding * 2,
        width: numRounds * (gameDimensions.width + roundSeparatorWidth) + svgPadding * 2
      };

      return _react2.default.createElement(
        "svg",
        svgDimensions,
        _react2.default.createElement(
          "g",
          { className: "bracket" },
          toBracketGames(_extends({
            GameComponent: GameComponent,
            gameDimensions: gameDimensions,
            roundSeparatorWidth: roundSeparatorWidth,
            game: game,
            round: numRounds,
            // svgPadding away from the right
            x: svgDimensions.width - svgPadding - gameDimensions.width,
            // vertically centered first game
            y: svgDimensions.height / 2 - gameDimensions.height / 2

          }, rest))
        )
      );
    }
  }]);

  return Bracket;
}(_react.Component);

Bracket.propTypes = {
  game: _GameShape2.default.isRequired,
  GameComponent: _react.PropTypes.func,

  homeOnTop: _react.PropTypes.bool,

  gameDimensions: _react.PropTypes.shape({
    height: _react.PropTypes.number.isRequired,
    width: _react.PropTypes.number.isRequired
  }).isRequired,

  svgPadding: _react.PropTypes.number.isRequired,

  lineInfo: _react.PropTypes.shape({
    yOffset: _react.PropTypes.number.isRequired,
    separation: _react.PropTypes.number.isRequired,
    homeVisitorSpread: _react.PropTypes.number.isRequired
  }).isRequired
};
Bracket.defaultProps = {
  GameComponent: _BracketGame2.default,

  homeOnTop: true,

  gameDimensions: {
    height: 80,
    width: 200
  },

  svgPadding: 20,
  roundSeparatorWidth: 24,

  lineInfo: {
    yOffset: -6,
    separation: 6,
    homeVisitorSpread: 11
  }
};
exports.default = Bracket;