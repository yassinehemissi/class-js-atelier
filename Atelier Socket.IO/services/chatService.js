const db = require('../database/database');

// Initialize messages array to store messages
const messages = []

const getMessagesFromDatabase = async (Chat) => {
	const messagesDb = await Chat.findAll()
	messagesDb.forEach((message) => {
		messages.push({ message: message.message, user: message.sender, name: message.sender });
	})

}

const handleSocketConnection = (io, Chat) => (socket) => {

	const handleClientName = (name) => {
		socket.emit('server-messages', messages);
		io.emit('user-connected', name);
	}
	socket.on('client-name', handleClientName)


	const handleClientMessage = async ({ message, name }) => {
		const messageObject = { message, sender: name, createAt: new Date() }
		await Chat.create(messageObject);
		messages.push(messageObject);
		io.emit('server-message', { ...messageObject, user: name });
		io.emit('server-notification', `${name} sent a message and got saved`);
	}
	socket.on('client-message', handleClientMessage)

}

const initializeChat = async (io) => {
	const { Chat } = await db();
	await getMessagesFromDatabase(Chat)
	io.on('connection', handleSocketConnection(io, Chat));
}

module.exports = initializeChat;

