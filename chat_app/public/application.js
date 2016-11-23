var name = prompt('What\'s your name?');

var socket = io();

socket.on('connect', function() {
  console.log('successfully connected to the server ');
  socket.emit('username', name);
  $('#user-name').text(name);
});

socket.once('init', function(data) {
  addUsers(data.online);
  addMessages(data.msgs);
});

socket.on('username', function(name) {
  addUsers([name]);
});

socket.on('chat message', function(msg) {
  addMessages([msg]);
});

socket.on('user_disconnect', function(username) {
  addMessages([username + ' has left the chat']);
  removeUser(username);
});

// ----- JQuery Code ------

function addUsers(users) {
  users.forEach(function(user) {
    $('#users-container').append($('<li>').text(user));
  });
}

function removeUser(user) {
  var user_list = $('#users-container li');
  var users = user_list.map(function() { return $(this).text(); }).get();
  var index = users.indexOf(user);
  user_list.eq(index).remove();
}

function addMessages(msgs) {
    msgs.forEach(function(msg) {
      $('#message-container').append($('<li>').text(msg));
    });
}

$('form').submit(function(){
    var msg = $('#msg').val();
    if (msg) {
      socket.emit('chat message', (name + ': ' + msg)) ;
      $('#msg').val('');
    }
    return false;
});