"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Clipped = require("./Clipped");

var _GameShape = require("./GameShape");

var _GameShape2 = _interopRequireDefault(_GameShape);

var _reactControllables = require("react-controllables");

var _reactControllables2 = _interopRequireDefault(_reactControllables);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _underscore = require("underscore");

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BracketGame = function (_PureComponent) {
  _inherits(BracketGame, _PureComponent);

  function BracketGame() {
    _classCallCheck(this, BracketGame);

    return _possibleConstructorReturn(this, (BracketGame.__proto__ || Object.getPrototypeOf(BracketGame)).apply(this, arguments));
  }

  _createClass(BracketGame, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          game = _props.game,
          hoveredTeamId = _props.hoveredTeamId,
          onHoveredTeamIdChange = _props.onHoveredTeamIdChange,
          onSideClick = _props.onSideClick,
          _props$styles = _props.styles,
          backgroundColor = _props$styles.backgroundColor,
          hoverBackgroundColor = _props$styles.hoverBackgroundColor,
          selectedColor = _props$styles.selectedColor,
          scoreBackground = _props$styles.scoreBackground,
          winningScoreBackground = _props$styles.winningScoreBackground,
          teamNameStyle = _props$styles.teamNameStyle,
          teamScoreStyle = _props$styles.teamScoreStyle,
          gameNameStyle = _props$styles.gameNameStyle,
          gameTimeStyle = _props$styles.gameTimeStyle,
          teamSeparatorStyle = _props$styles.teamSeparatorStyle,
          homeOnTop = _props.homeOnTop,
          topText = _props.topText,
          bottomText = _props.bottomText,
          rest = _objectWithoutProperties(_props, ["game", "hoveredTeamId", "onHoveredTeamIdChange", "onSideClick", "styles", "homeOnTop", "topText", "bottomText"]);

      var sides = game.sides,
          selected = game.selected;


      var top = sides[homeOnTop ? _GameShape.HOME : _GameShape.VISITOR],
          bottom = sides[homeOnTop ? _GameShape.VISITOR : _GameShape.HOME];

      var winnerBackground = top && bottom && top.score && bottom.score && top.score.score !== bottom.score.score ? top.score.score > bottom.score.score ? _react2.default.createElement("rect", { x: "170", y: "12", width: "30", height: "22.5", style: { fill: winningScoreBackground }, rx: "3", ry: "3" }) : _react2.default.createElement("rect", { x: "170", y: "34.5", width: "30", height: "22.5", style: { fill: winningScoreBackground }, rx: "3", ry: "3" }) : null;

      var Side = function Side(_ref) {
        var x = _ref.x,
            y = _ref.y,
            side = _ref.side,
            onHover = _ref.onHover,
            _onClick = _ref.onClick;

        var tooltip = side.seed && side.team ? _react2.default.createElement(
          "title",
          null,
          side.seed.displayName
        ) : null;

        return _react2.default.createElement(
          "g",
          { onClick: function onClick() {
              return _onClick(side);
            }, onMouseEnter: function onMouseEnter() {
              return onHover(side && side.team ? side.team.id : null);
            }, onMouseLeave: function onMouseLeave() {
              return onHover(null);
            } },
          _react2.default.createElement(
            "rect",
            { x: x, y: y, height: 22.5, width: 200, fillOpacity: 0 },
            tooltip
          ),
          _react2.default.createElement(
            _Clipped.RectClipped,
            { x: x, y: y, height: 22.5, width: 165 },
            _react2.default.createElement(
              "text",
              { x: x + 5, y: y + 16,
                style: _extends({}, teamNameStyle, { fontStyle: side.seed && side.seed.sourcePool ? 'italic' : null }) },
              tooltip,
              side.team ? side.team.name : side.seed ? side.seed.displayName : null
            )
          ),
          _react2.default.createElement(
            "text",
            { x: x + 185, y: y + 16, style: teamScoreStyle, textAnchor: "middle" },
            side.score ? side.score.score : null
          )
        );
      };

      var topHovered = top && top.team && top.team.id === hoveredTeamId,
          bottomHovered = bottom && bottom.team && bottom.team.id === hoveredTeamId;

      return _react2.default.createElement(
        "svg",
        _extends({ className: "bracketGame", width: "200", height: "82", viewBox: "0 0 200 82" }, rest),
        _react2.default.createElement("rect", { x: "0", y: "12", width: "200", height: "45", fill: selected ? selectedColor : backgroundColor, rx: "3", ry: "3" }),
        _react2.default.createElement("rect", { x: "0", y: "12", width: "200", height: "22.5", fill: topHovered ? hoverBackgroundColor : selected ? selectedColor : backgroundColor, rx: "3",
          ry: "3" }),
        _react2.default.createElement("rect", { x: "0", y: "34.5", width: "200", height: "22.5", fill: bottomHovered ? hoverBackgroundColor : selected ? selectedColor : backgroundColor,
          rx: "3", ry: "3" }),
        _react2.default.createElement("rect", { x: "170", y: "12", width: "30", height: "45", fill: scoreBackground, rx: "3", ry: "3" }),
        winnerBackground,
        top ? _react2.default.createElement(Side, { x: 0, y: 12, side: top, onHover: onHoveredTeamIdChange, onClick: onSideClick }) : null,
        bottom ? _react2.default.createElement(Side, { x: 0, y: 34.5, side: bottom, onHover: onHoveredTeamIdChange, onClick: onSideClick }) : null,
        _react2.default.createElement("line", { x1: "0", y1: "34.5", x2: "200", y2: "34.5", style: teamSeparatorStyle }),
        _react2.default.createElement(
          "text",
          { x: "100", y: "68", textAnchor: "middle", style: gameNameStyle },
          bottomText(game)
        )
      );
    }
  }]);

  return BracketGame;
}(_react.PureComponent);

BracketGame.propTypes = {
  game: _GameShape2.default.isRequired,

  homeOnTop: _react.PropTypes.bool,

  hoveredTeamId: _react.PropTypes.string,
  onHoveredTeamIdChange: _react.PropTypes.func.isRequired,
  onSideClick: _react.PropTypes.func.isRequired,

  styles: _react.PropTypes.shape({
    backgroundColor: _react.PropTypes.string.isRequired,
    hoverBackgroundColor: _react.PropTypes.string.isRequired,
    selectedColor: _react.PropTypes.string.isRequired,
    scoreBackground: _react.PropTypes.string.isRequired,
    winningScoreBackground: _react.PropTypes.string.isRequired,
    teamNameStyle: _react.PropTypes.object.isRequired,
    teamScoreStyle: _react.PropTypes.object.isRequired,
    gameNameStyle: _react.PropTypes.object.isRequired,
    teamSeparatorStyle: _react.PropTypes.object.isRequired
  }),

  topText: _react.PropTypes.func,
  bottomText: _react.PropTypes.func
};
BracketGame.defaultProps = {
  homeOnTop: true,
  hoveredTeamId: null,

  styles: {
    backgroundColor: '#58595e',
    hoverBackgroundColor: '#222',
    // selectedColor: '#ff0000',

    scoreBackground: '#787a80',
    winningScoreBackground: '#ff7324',
    teamNameStyle: { fill: '#fff', fontSize: 12, textShadow: '1px 1px 1px #222' },
    teamScoreStyle: { fill: '#23252d', fontSize: 12 },
    gameNameStyle: { fill: '#999', fontSize: 10 },
    gameTimeStyle: { fill: '#999', fontSize: 10 },
    teamSeparatorStyle: { stroke: '#444549', strokeWidth: 1 }
  },

  topText: function topText(_ref2) {
    var scheduled = _ref2.scheduled;
    return (0, _moment2.default)(scheduled).format('l LT');
  },
  bottomText: function bottomText(_ref3) {
    var name = _ref3.name,
        bracketLabel = _ref3.bracketLabel;
    return _underscore2.default.compact([name, bracketLabel]).join(' - ');
  }
};
exports.default = (0, _reactControllables2.default)(BracketGame, ['hoveredTeamId']);