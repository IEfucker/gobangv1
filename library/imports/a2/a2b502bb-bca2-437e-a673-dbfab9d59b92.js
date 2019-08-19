"use strict";
cc._RF.push(module, 'a2b50K7vKJDfqZz2/q51ZuS', 'Game');
// scripts/Game.js

'use strict';

// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

var initSocket = require('./initSocket');

cc.Class({
  extends: cc.Component,

  properties: {
    // foo: {
    //     // ATTRIBUTES:
    //     default: null,        // The default value will be used only when the component attaching
    //                           // to a node for the first time
    //     type: cc.SpriteFrame, // optional, default is typeof default
    //     serializable: true,   // optional, default is true
    // },
    // bar: {
    //     get () {
    //         return this._bar;
    //     },
    //     set (value) {
    //         this._bar = value;
    //     }
    // },

    // board引用
    board: {
      default: null,
      type: cc.Node
    },
    // 前两个player
    // 暂时约定player[0]为黑棋，player[1]为白棋，之后添加角色分配以及交换等机制
    players: [],
    audiences: [],
    userId: null,
    // 区分player和audience
    isPlayer: false,
    isOffline: false,
    // 轮次，和turn对应，1代表黑棋，-1代表白棋
    currentRole: null,
    winner: null,
    winArray: null
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad: function onLoad() {
    var _this = this;

    // board中注册game引用
    this.board.getComponent('Board').game = this;

    // socket relevant event bind
    // user加入
    this.node.on('join', function (_ref) {
      var userId = _ref.userId,
          isPlayer = _ref.isPlayer,
          players = _ref.players;

      _this.addUser(userId, players, isPlayer);
    });

    // user离开
    this.node.on('leave', function (_ref2) {
      var userId = _ref2.userId,
          players = _ref2.players,
          isPlayer = _ref2.isPlayer;

      _this.removeUser(userId, players, isPlayer);
    });

    // socket init
    initSocket(this);

    // this.socket is available
    this.socket.on('message', function (msg) {
      _this.board.getComponent('Board').updateStepInfo(msg.data.payload);
    });
  },
  start: function start() {},


  // update (dt) {},

  // 如果player暂时离开，再次加入需要恢复角色
  addUser: function addUser(userId, players, isPlayer) {
    this.players = players;

    // 如果已经注册了userId，return
    if (this.userId) return;

    // 新user注册userId
    this.userId = userId;
    if (isPlayer) {
      // add player
      this.isPlayer = true;
      // add role
      // 需要调整, ui允许用户选择和变更role
      this.currentRole = this.players.indexOf(userId) === 0 ? 1 : -1;
    } else {
      // add audience
      return this.audiences.push(userId);
    }
    // console.log(this.currentRole)
  },

  // 如果player暂时离开，角色空留，待下次进入
  removeUser: function removeUser(userId, players, isPlayer) {
    this.players = players;
    if (isPlayer) {
      this.isOffline = true;
    } else {
      this.audiences.splice(this.audiences.indexOf(userId), 1);
    }
    console.log(this.players);
  },
  hasWined: function hasWined(role, winArray) {
    this.winner = role;
    this.winArray = winArray;
  },
  hasWinnber: function hasWinnber() {
    return this.winner !== null;
  }
});

cc._RF.pop();