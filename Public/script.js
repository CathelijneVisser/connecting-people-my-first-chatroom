let ioServer = io()
let nameForm = document.querySelector('.name-form')
let nameInput = document.querySelector('.name-input')
let section = document.querySelector('section')
let messages = document.querySelector('dl')
let form = document.querySelector('.message-form')
let messageInput = document.querySelector('.message-input')


nameForm.addEventListener('submit', (event) => {
    event.preventDefault()
    if (nameInput.value.length > 0) {
        let name = nameInput.value || client.id
        ioServer.emit('user', name)
        nameForm.remove()
        section.style.display = "block"
    }
})

form.addEventListener('submit', (event) => {
    event.preventDefault()
    if (messageInput.value) {
        let message = messageInput.value
        ioServer.emit('message', message)
        messageInput.value = ''
    }
})

ioServer.on('user', (name) => {
    addUser(name)
})

ioServer.on('message', (data) => {
    addMessage(data.name, data.message)
    console.log(data.name, data.message)
})

ioServer.on('disconnect', (name) => {
    removerUser(name)
})

function addUser(name) {
    messages.appendChild(Object.assign(document.createElement('dt'), { textContent: `user ${name} has connected` }))
    messages.scrollTop = messages.scrollHeight
}

function addMessage(name, message) {
    console.log(name, message)
    messages.appendChild(Object.assign(document.createElement('dt'), { textContent: name }))
    messages.appendChild(Object.assign(document.createElement('dd'), { textContent: message }))
    messages.scrollTop = messages.scrollHeight
}

function removerUser(name) {
    messages.appendChild(Object.assign(document.createElement('dt'), { textContent: `user ${name} has disconnected` }))
    messages.scrollTop = messages.scrollHeight
}