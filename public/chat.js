// Make connection
var socket = io.connect('http://localhost:4000');

// Query DOM
var message = document.getElementById('message');
var handle = document.getElementById('handle');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');

// Emit events

message.addEventListener('keyup', function(event){
	if(event.keyCode === 13)
	{
		event.preventDefault();
		btn.click();
	}
});


btn.addEventListener('click', function(){
	socket.emit('chat', {
		message: message.value,
		handle: handle.value
	});
});


message.addEventListener('keypress', function(){
	socket.emit('typing', handle.value);
});


// Listen for events
socket.on('chat', function(data){
	feedback.innerHTML = '';
	output.innerHTML += '<p><strong>' + data.handle + ':</strong>' + data.message + '</p';
});

socket.on('typing', function(data){
	feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
	setTimeout(function(){
		feedback.innerHTML = '';
	}, 1000);
	
})
	


