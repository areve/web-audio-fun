const express = require('express')
const socket = require('socket.io')
const rtcMultiConnectionServer = require('rtcmulticonnection-server')

const PORT = process.env.PORT || 5000
const rtcConfig = {}

const app = new express()
app.use(express.static(__dirname + '/dist/'))
rtcMultiConnectionServer.beforeHttpListen(app, rtcConfig)
const server = app.listen(PORT, () => {
    rtcMultiConnectionServer.afterHttpListen(server, rtcConfig)
})

const io = socket(server)
io.on("connection", socket => {
    rtcMultiConnectionServer.addSocket(socket, rtcConfig)
})
