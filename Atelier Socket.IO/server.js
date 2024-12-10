const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

// Importing Chat Router and Chat Service
const chatRouter = require('./routes/chatRouter');
const initializeChat = require('./services/chatService');

// Initializing Express and Socket.io Server 
const app = express();
const server = createServer(app);
const io = new Server(server);

// Initiliazing Twig and views path
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'twig');
app.use(express.static(join(__dirname, 'views'))); // Serve static files

// Initializing Home Route
app.get('/', (req, res) => {
	res.send("Access Chat <a href='/chat'>here</a>")
});

// Initializing Chat Route and Chat Service (Socket)
initializeChat(io);
app.use('/chat', chatRouter);

app.use(express.static(join(__dirname, 'public'))); // Serve static files

server.listen(3000, () => {
  console.log('*Server running at http://localhost:3000\n *Chat Running at http://localhost:3000/chat');
});