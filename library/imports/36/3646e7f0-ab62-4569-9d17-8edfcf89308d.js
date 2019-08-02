"use strict";
cc._RF.push(module, '3646efwq2JFaZ0Xjt/PiTCN', 'Board');
// scripts/Board.js

"use strict";

// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        blackChess: {
            default: null,
            type: cc.Prefab
        },
        whiteChess: {
            default: null,
            type: cc.Prefab
        },
        // 素材宽535，视窗宽720，ration = 720 / 535
        // ratio: 1.3458,
        // 素材单元格宽35
        // originColWidth: 35,
        // colWidth = originColWidth * ratio
        colWidth: 47.1
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.node.on(cc.Node.EventType.MOUSE_UP, this.dropChess.bind(this));
        this.node.on(cc.Node.EventType.TOUCH_END, this.dropChess.bind(this));
    },
    start: function start() {},


    // update (dt) {},

    // 相对棋盘中心坐标，v2
    getPointPos: function getPointPos(e) {
        return this.node.convertToNodeSpaceAR(e.getLocation());
    },


    // 获取落子坐标
    getDropPos: function getDropPos(v2) {
        var colWidth = this.colWidth;
        var x = v2.x,
            y = v2.y;

        x = Math.round(x / colWidth) * colWidth;
        y = Math.round(y / colWidth) * colWidth;
        return cc.v2(x, y);
    },
    dropChess: function dropChess(e) {
        var v2 = this.getPointPos(e);
        v2 = this.getDropPos(v2);
        // console.log(v2)
        var newChess = cc.instantiate(this.blackChess);
        this.node.addChild(newChess);
        newChess.setPosition(v2);
    }
});

cc._RF.pop();