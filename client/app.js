const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

let userName;

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
    }
}

function sendMessage(e) {
    e.preventDefault()

    if (messageContentInput.value === '') {
        alert('Message is empty')
    } else {
        addMessage(userName, messageContentInput.value)
        messageContentInput.value = ''
    }
}

function addMessage(author, content) {
    const message = document.createElement('li')
    const header = document.createElement('h3')
    header.classList.add('message_author');
    header.textContent = author === userName ? 'You' : author;

    const messageContent = document.createElement('div')
    messageContent.classList.add('message_content')
    messageContent.textContent = content

    message.appendChild(header)
    message.appendChild(messageContent)

    message.classList.add('message', 'message-received')
    if (author === userName) message.classList.add('message-self')

    messagesList.appendChild(message);
}