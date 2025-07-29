const socket = io();
const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');
const mainContainer = document.getElementById('app');

let userName;

socket.on('message', ({ author, content }) => addMessage(author, content))
socket.on('userJoined', (user) => addMessage('Chat Bot', `${user} has joined the conversation`))
socket.on('userLeft', (user) => addMessage('Chat Bot', `${user} has left the conversation`))

loginForm.addEventListener('submit', (e) => login(e))
addMessageForm.addEventListener('submit', sendMessage)

function login(e) {
    e.preventDefault()
    if (userNameInput.value === '') {
        alert('Field is empty')
    } else {
        userName = userNameInput.value;
        loginForm.classList.remove('show')
        messagesSection.classList.add('show')
        socket.emit('user', userName)
    }
}

function sendMessage(e) {
    e.preventDefault()
    const messageContent = messageContentInput.value

    if (messageContent === '') {
        alert('Message is empty')
    } else {
        addMessage(userName, messageContent)
        socket.emit('message', { author: userName, content: messageContent })
        messageContentInput.value = ''
    }
}

function addMessage(author, content) {
    const message = document.createElement('li')
    const header = document.createElement('h3')
    header.classList.add('message_author');
    header.textContent = author === userName ? 'You' : author;

    const messageContent = document.createElement('div')
    messageContent.classList.add('message__content')
    messageContent.textContent = content

    message.appendChild(header)
    message.appendChild(messageContent)

    message.classList.add('message', 'message--received')
    if (author === userName) message.classList.add('message--self')
    if (author === 'Chat Bot') messageContent.classList.add('message--bot')

    messagesList.appendChild(message);
}
