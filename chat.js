const chatDisplay = document.querySelector('.chat-display');
const chatInput = document.querySelector('.chat-input input');
const chatButton = document.querySelector('.chat-input button');
const clearHistoryButton = document.querySelector('.clear-history-button');

function sendMessage() {
  const message = chatInput.value;
  if (message.trim() !== '') {
    const newMessage = document.createElement('div');
    newMessage.classList.add('message', 'message-sent');
    const newMessageBubble = document.createElement('div');
    newMessageBubble.classList.add('message-bubble');
    newMessageBubble.textContent = message;
    newMessage.appendChild(newMessageBubble);
    chatDisplay.appendChild(newMessage);
    chatInput.value = '';
  }
}

function clearHistory() {
  chatDisplay.innerHTML = '';
}

chatButton.addEventListener('click', sendMessage);

chatInput.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    sendMessage();
  }
});

clearHistoryButton.addEventListener('click', clearHistory);

