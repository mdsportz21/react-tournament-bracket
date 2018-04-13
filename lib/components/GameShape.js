'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VISITOR = exports.HOME = undefined;

var _PropTypes$shape;

var _react = require('react');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// for nested PropTypes
var lazyFunction = function lazyFunction(f) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return f().apply(undefined, args);
  };
};

var GameShape = void 0;

var HOME = exports.HOME = 'home';
var VISITOR = exports.VISITOR = 'visitor';

var ID_TYPE = _react.PropTypes.string;

// the shape of one side of the competition - e.g. home or visitor
var SideShape = _react.PropTypes.shape({
  gameId: _react.PropTypes.string.isRequired,
  score: _react.PropTypes.shape({
    score: _react.PropTypes.number.isRequired
  }),

  seed: _react.PropTypes.shape({
    displayName: _react.PropTypes.string.isRequired,
    rank: _react.PropTypes.number.isRequired,
    sourceGame: lazyFunction(function () {
      return GameShape;
    }),
    sourcePool: _react.PropTypes.object
  }),

  team: _react.PropTypes.shape({
    id: ID_TYPE,
    name: _react.PropTypes.string.isRequired
  })
});

GameShape = _react.PropTypes.shape({
  id: ID_TYPE,
  // the game name
  name: _react.PropTypes.string.isRequired,
  // optional: the label for the game within the bracket, e.g. Gold Finals, Silver Semi-Finals
  bracketLabel: _react.PropTypes.string,
  // the unix timestamp of the game-will be transformed to a human-readable time using momentjs
  scheduled: _react.PropTypes.number,
  // where the game is played
  court: _react.PropTypes.shape({
    name: _react.PropTypes.string.isRequired,
    venue: _react.PropTypes.shape({
      name: _react.PropTypes.string.isRequired
    }).isRequired
  }),
  // only two sides are supported-home and visitor
  sides: _react.PropTypes.shape((_PropTypes$shape = {}, _defineProperty(_PropTypes$shape, HOME, SideShape), _defineProperty(_PropTypes$shape, VISITOR, SideShape), _PropTypes$shape)).isRequired
});

exports.default = GameShape;