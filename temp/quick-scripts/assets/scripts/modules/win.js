(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/modules/win.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '1e06cZWGn1Lb7MO0JHLI19L', 'win', __filename);
// scripts/modules/win.js

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _role = require('./role.js');

var _role2 = _interopRequireDefault(_role);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isFive = function isFive(board, p, role) {
  var len = board.length;
  var count = 1;

  var reset = function reset() {
    count = 1;
  };

  for (var _i = p[1] + 1; true; _i++) {
    if (_i >= len) break;
    var _t = board[p[0]][_i];
    if (_t !== role) break;
    count++;
  }

  for (var _i2 = p[1] - 1; true; _i2--) {
    if (_i2 < 0) break;
    var _t2 = board[p[0]][_i2];
    if (_t2 !== role) break;
    count++;
  }

  if (count >= 5) return 1;

  // 纵向
  reset();

  for (var i = p[0] + 1; true; i++) {
    if (i >= len) {
      break;
    }
    var t = board[i][p[1]];
    if (t !== role) break;
    count++;
  }

  for (var _i3 = p[0] - 1; true; _i3--) {
    if (_i3 < 0) {
      break;
    }
    var _t3 = board[_i3][p[1]];
    if (_t3 !== role) break;
    count++;
  }

  if (count >= 5) return 2;
  // \\
  reset();

  for (var _i4 = 1; true; _i4++) {
    var x = p[0] + _i4;var y = p[1] + _i4;
    if (x >= len || y >= len) {
      break;
    }
    var _t4 = board[x][y];
    if (_t4 !== role) break;

    count++;
  }

  for (var _i5 = 1; true; _i5++) {
    var _x = p[0] - _i5;var _y = p[1] - _i5;
    if (_x < 0 || _y < 0) {
      break;
    }
    var _t5 = board[_x][_y];
    if (_t5 !== role) break;
    count++;
  }

  if (count >= 5) return 3;

  // \/
  reset();

  for (var _i6 = 1; true; _i6++) {
    var _x2 = p[0] + _i6;var _y2 = p[1] - _i6;
    if (_x2 < 0 || _y2 < 0 || _x2 >= len || _y2 >= len) {
      break;
    }
    var _t6 = board[_x2][_y2];
    if (_t6 !== role) break;
    count++;
  }

  for (var _i7 = 1; true; _i7++) {
    var _x3 = p[0] - _i7;var _y3 = p[1] + _i7;
    if (_x3 < 0 || _y3 < 0 || _x3 >= len || _y3 >= len) {
      break;
    }
    var _t7 = board[_x3][_y3];
    if (_t7 !== role) break;
    count++;
  }

  if (count >= 5) return 4;

  return 0;
}; /* eslint-disable no-constant-condition */


var w = function w(board) {
  var p;var d = 0;
  for (var i = 0; i < board.length && !d; i++) {
    for (var j = 0; j < board[i].length && !d; j++) {
      var t = board[i][j];
      p = [i, j];
      if (t !== _role2.default.empty) {
        d = isFive(board, [i, j], t);
        if (d) break;
      }
    }
  }

  if (!d) return false;
  if (d === 1) {
    return [p, [p[0], p[1] + 1], [p[0], p[1] + 2], [p[0], p[1] + 3], [p[0], p[1] + 4]];
  }
  if (d === 2) {
    return [p, [p[0] + 1, p[1]], [p[0] + 2, p[1]], [p[0] + 3, p[1]], [p[0] + 4, p[1]]];
  }
  if (d === 3) {
    return [p, [p[0] + 1, p[1] + 1], [p[0] + 2, p[1] + 2], [p[0] + 3, p[1] + 3], [p[0] + 4, p[1] + 4]];
  }
  if (d === 4) {
    return [p, [p[0] + 1, p[1] - 1], [p[0] + 2, p[1] - 2], [p[0] + 3, p[1] - 3], [p[0] + 4, p[1] - 4]];
  }
};

exports.default = w;
module.exports = exports['default'];

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=win.js.map
        