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
        blackChess:{
            default: null,
            type: cc.Prefab
        },
        whiteChess:{
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

    onLoad () {
        this.node.on(cc.Node.EventType.MOUSE_UP, this.dropChess.bind(this));
        this.node.on(cc.Node.EventType.TOUCH_END, this.dropChess.bind(this));
    },

    start () {

    },

    // update (dt) {},

    // 相对棋盘中心坐标，v2
    getPointPos(e){
        return this.node.convertToNodeSpaceAR(e.getLocation())
    },

    // 获取落子坐标
    getDropPos(v2){
        const colWidth = this.colWidth
        let {x, y} = v2
        x = Math.round(x / colWidth) * colWidth
        y = Math.round(y / colWidth) * colWidth
        return cc.v2(x, y)
    },

    dropChess(e){
        let v2 = this.getPointPos(e)
        v2 = this.getDropPos(v2)
        // console.log(v2)
        var newChess = cc.instantiate(this.blackChess)
        this.node.addChild(newChess)
        newChess.setPosition(v2)
    }
});
