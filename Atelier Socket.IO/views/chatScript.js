
const socket = io();

const messageContainer = document.getElementById('messages');
const messageInput = document.getElementById('message');
const nameInput = document.getElementById('name');

let name = '';

const setClientName = () => {
	const nameContainer = document.getElementById('client_name');
	name = nameInput.value;
	socket.emit('client-name', name);
	nameContainer.style.display = 'none';
}

const sendMessage = () => {
	const message = document.getElementById('message').value;
	socket.emit('client-message', { message, name });
	document.getElementById('message').value = '';
}

const sendMessageOnEnter = (e) => {
	if (e.key === 'Enter') {
		sendMessage();
	}
}
document.querySelector('#message').addEventListener('keyup', sendMessageOnEnter);

const addUserNameToMessage = (message) => {
	const span_name = document.createElement('span');
	span_name.classList.add('client_message_name');
	span_name.style = 'font-weight: bold;font-size:10px;';
	span_name.innerHTML = message.user;
	return span_name;
}

const addMessageContent = (message) => {
	const p = document.createElement('p');
	p.classList.add('message-content');
	p.innerHTML = message.message;
	return p;
}

const addMessage = (message) => {
	const div = document.createElement('div');
	if (message.user === name)
		div.classList.add('message-orange');
	else
		div.classList.add('message-blue');

	const messageContent = addMessageContent(message);
	const nameLabel = addUserNameToMessage(message);
	div.appendChild(nameLabel);
	div.appendChild(messageContent);
	messageContainer.appendChild(div);
}

const addAllMessages = (messages) => {
	for (let i = 0; i < messages.length; i++) {
		const message = messages[i];
		addMessage(message);
	}
}

const showNotification = (message) => {
	const notification = document.createElement('div');
	notification.classList.add('notification');
	notification.innerHTML = message;
	messageContainer.appendChild(notification);
	setTimeout(() => {
		notification.remove();
	}, 3000);
}
socket.on('server-notification', showNotification)	


socket.on('server-messages', addAllMessages)
socket.on('server-message', (message) => addMessage(message))
socket.on('user-connected', (name) =>
	messageContainer.innerHTML += `<div class='user_connected'>${name} connected</div>`
)
