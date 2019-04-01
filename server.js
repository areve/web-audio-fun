const express = require("express");
const socket = require("socket.io");
const bodyParser = require('body-parser');

const rtcMultiConnectionServer = require("rtcmulticonnection-server");

const PORT = process.env.PORT || 5000;
const rtcConfig = {};

const app = new express();
var textParser = bodyParser.text({ type: 'text/plain' })

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
app.post(/^\/api\/log/, textParser, (req, res) => {
  //if(!globalSocket) return
  console.log('log', req.body)
  io.emit('log', req.body);
  res.send('ok')
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

