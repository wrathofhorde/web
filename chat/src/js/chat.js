'use strict';

const eventString = 'chatting';
const socket = io();

const nickname = document.querySelector('#nickname');
const chatlist = document.querySelector('.chat-list');
const chatInput = document.querySelector('.chat-input');
const sendButton = document.querySelector('.send-button');

sendButton.addEventListener('click', e => {
  const param = {
    name: nickname.value,
    msg: chatInput.value
  };
  socket.emit(eventString, param);
});


socket.on(eventString, (data) => {
  const {name, msg} = data;
  // console.log(`${name}: ${msg}`);
  const li = document.createElement('li');
  li.innerText = `${name}님: ${msg}`;
  chatlist.appendChild(li);
});