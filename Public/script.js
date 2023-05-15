let ioServer = io()
let messages = document.querySelector('section ul')
let input = document.querySelector('input')
let form = document.querySelector('form')

form.addEventListener('submit', (event) => {
    event.preventDefault()

    if (input.value) {
        ioServer.emit('message', input.value)

        input.value = ''
    }
})

ioServer.on('message', (message) => {
    addMessage(message)
})

function addMessage(message) {
  messages.appendChild(Object.assign(document.createElement('li'), { textContent: message }))
  messages.scrollTop = messages.scrollHeight
}