const { Server } = require('socket.io')

let ioServer = null

const initSocketServer = (httpServer) => {
	ioServer = new Server(httpServer)
}

const getIoServer = () => ioServer

module.exports = { initSocketServer, getIoServer }