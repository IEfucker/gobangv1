"use strict";
cc._RF.push(module, '46c4ehGTgFM0oBTqKLdpT/t', 'initSocket');
// scripts/initSocket.js

'use strict';

// var io = require('./socket.io')
// console.log(io, window.io)
// io = io || window.io

function initSocket(game) {
  var log = console.log;

  var socket = window.io('ws://localhost:7001', {
    // 实际使用中可以在这里传递参数
    query: {
      room: 'demo',
      userId: 'client_' + Math.random()
    },

    transports: ['websocket']
  });

  // log(socket)

  socket.on('connect', function () {
    var id = socket.id;

    log('#connect,', id, socket);

    // 监听自身 id 以实现 p2p 通讯
    socket.on(id, function (msg) {
      log('#receive,', msg);
    });
  });

  // 接收在线用户信息
  socket.on('online', function (msg) {
    log('#online ', msg);
    // action = 'join' || 'leave'
    game.node.emit(msg.action, {
      players: msg.players,
      userId: msg.userId,
      users: msg.clients
    });
  });

  // 系统事件
  socket.on('disconnect', function (msg) {
    log('#disconnect', msg);
  });

  socket.on('disconnecting', function () {
    log('#disconnecting');
  });

  socket.on('error', function () {
    log('#error');
  });

  socket.on('message', function (msg) {
    log('#message', msg);
  });

  game.socket = socket;
}
module.exports = initSocket;

cc._RF.pop();