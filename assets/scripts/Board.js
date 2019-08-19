// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const win = require('./modules/win')
cc.Class({
  extends: cc.Component,

  properties: {
    // 标记当前轮次，和currentRole对应，1代表黑棋，-1代表白棋
    turn: 1,
    // 标记操作时间戳，用于过滤
    timestamp: null,
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
    // 用于计算落子坐标
    // colWidth = originColWidth * ratio
    colWidth: 47.1,
    boardMap: null
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad () {
    // https://docs.cocos.com/creator/manual/zh/scripting/internal-events.html#%E8%A7%A6%E6%91%B8%E4%BA%8B%E4%BB%B6%E7%B1%BB%E5%9E%8B%E5%92%8C%E4%BA%8B%E4%BB%B6%E5%AF%B9%E8%B1%A1
    // touchend默认在桌面端也会触发，方便开发调试
    this.node.on(cc.Node.EventType.TOUCH_END, this.dropChessByUser.bind(this))
  },

  start () {
    this.turn = 1
    this.boardMap = this.getInitBoardMap()
  },

  getInitBoardMap () {
    const board = []
    for (let i = 0; i < 15; i++) {
      const row = []
      for (let j = 0; j < 15; j++) {
        row.push(0)
      }
      board.push(row)
    }
    return board
  },
  // update (dt) {},

  // 相对棋盘中心坐标，v2
  getPointPos (e) {
    return this.node.convertToNodeSpaceAR(e.getLocation())
  },

  //   return [i, j]
  getMapIndex (v2) {
    const colWidth = this.colWidth
    let { x, y } = v2
    x = x / colWidth
    y = y / colWidth
    // 此时x，y是相对中心点索引坐标
    // 中心相对左上角坐标[7, 7]
    x += 7
    y = 7 - y
    return [x, y]
  },

  // 获取落子坐标
  getDropPos (v2) {
    const colWidth = this.colWidth
    let { x, y } = v2
    x = Math.round(x / colWidth) * colWidth
    y = Math.round(y / colWidth) * colWidth
    // console.log(Math.round(x / colWidth), Math.round(y / colWidth))
    return cc.v2(x, y)
  },

  // 默认使用currentRole
  getChessByRole (role) {
    // console.log(this.game.currentRole)
    role = role || this.game.currentRole
    const chess = role === 1 ? this.blackChess : this.whiteChess
    return chess
  },

  takeTurns () {
    this.turn = -this.turn
  },

  dropChessByUser (e) {
    let v2 = this.getPointPos(e)
    v2 = this.getDropPos(v2)
    // 如果
    // 已经产生赢家，
    // 不是下棋方，
    // 落子点已有棋子，
    // return
    if (this.game.hasWinnber() || this.turn !== this.game.currentRole || !this.isPointAvailable(v2)) return
    this.dropChessByInfo(v2)

    this.timestamp = new Date().getTime()
    const stepInfo = {
      role: this.game.currentRole,
      position: v2,
      timestamp: this.timestamp
    }
    this.game.socket.send(stepInfo)
  },

  updateStepInfo (info) {
    // 自己发出的消息，不再更新
    if (this.timestamp === info.timestamp) return
    const role = info.role
    const v2 = info.position
    if (!this.isPointAvailable(v2)) return
    this.dropChessByInfo(v2, role)
  },

  isPointAvailable (v2) {
    const [i, j] = this.getMapIndex(v2)
    if (this.boardMap[i][j] !== 0) return false
    return true
  },

  // 画棋并跟新turn
  dropChessByInfo (v2, role) {
    role = role || this.game.currentRole
    const chess = this.getChessByRole(role)
    var newChess = cc.instantiate(chess)
    this.node.addChild(newChess)
    newChess.setPosition(v2)
    // 更新boardMap
    this.updateBoardMap(v2, role)

    // 轮换
    this.takeTurns()

    // 验证是否赢了，返回五子坐标
    const winArray = win(this.boardMap, v2, role)
    if (winArray) {
      console.log('win by %O and the winning array is %O', role, winArray)
      this.game.hasWined(role, winArray)
    }
  },
  updateBoardMap (v2, role) {
    const p = this.getMapIndex(v2)
    this.boardMap[p[0]][p[1]] = role
    // console.log(this.boardMap)
  }

})
