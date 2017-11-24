const numberInput = document.getElementById('number'),
      textInput = document.getElementById('message'),
      button = document.getElementById('button'),
      response = document.querySelector('.response');

button.addEventListener('click', send, false);

const socket = io();
// You're catching data from the app.js emit
socket.on('smsStatus', function(data){
    response.innerHTML = '<h5>Text message delivered to ' + data.number + '</h5>';
})

function send() {
    const number = numberInput.value.replace(/\D/g, '');
    const text = textInput.value;

    fetch('/', {
        method: 'post',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({number: number, text: text})
    })
    .then(function(res){
        console.log(res);
    })
    .catch(function(err){
        console.log(err);
    });
}
