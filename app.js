const express = require('express')
const {Server} = require('socket.io')
const app = express()
const http = require('http')

const expressServer = http.createServer(app)
const io = new Server(expressServer)

io.on('connection', function (socket) {
    socket.join('chat-room')
    let userNum = io.sockets.adapter.rooms.get('chat-room').size
    socket.on('chat', function (chatMsg) {
        io.sockets.in('chat-room').emit('chat_sent', chatMsg + "+" + userNum)
    })
})

app.get('/', async (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

const port = process.env.PORT || 5000
const startConnection = () => {
    expressServer.listen(port, () => console.log(`Server running on port ${port}`))
}
startConnection()
