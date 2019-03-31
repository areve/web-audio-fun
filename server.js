const express = require("express");
const socket = require("socket.io");
const rtcMultiConnectionServer = require("rtcmulticonnection-server");

const PORT = process.env.PORT || 5000;
const rtcConfig = {};

const app = new express();
app.get(/^\/api\/ptt\/on/, (req, res) => {
  //if(!globalSocket) return
  console.log('ptt on')
  io.emit('news', { 'ptt': 'on' });
  res.send('ptt on')
})
app.get(/^\/api\/ptt\/off/, (req, res) => {
  //if(!globalSocket) return
  console.log('ptt off')
  io.emit('news', { 'ptt': 'off' });
  res.send('ptt off')
})
app.use(express.static(__dirname + "/dist/"));
rtcMultiConnectionServer.beforeHttpListen(app, rtcConfig);
const server = app.listen(PORT, () => {
  rtcMultiConnectionServer.afterHttpListen(server, rtcConfig);
})

const io = socket(server);
io.on("connection", socket => {
  rtcMultiConnectionServer.addSocket(socket, rtcConfig);
})

