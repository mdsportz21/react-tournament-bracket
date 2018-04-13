'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = winningPathLength;

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function winningPathLength(game) {
  var visited = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (visited[game.id]) {
    return 0;
  }
  visited[game.id] = true;

  return 1 + (_underscore2.default.keys(game.sides).length > 0 ? Math.max.apply(Math, _underscore2.default.map(game.sides, function (_ref) {
    var seed = _ref.seed;
    return seed != null && seed.sourceGame != null && seed.rank == 1 ? winningPathLength(seed.sourceGame, visited) : 0;
  })) : 0);
};