(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/modules/role.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '2f0b67HMA1CwrRtOH4Yu9xA', 'role', __filename);
// scripts/modules/role.js

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  black: 1,
  white: -1,
  empty: 0,
  reverse: function reverse(r) {
    return -r;
  }
};
module.exports = exports["default"];

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
        //# sourceMappingURL=role.js.map
        