require('dotenv').config()
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const fetch = require("node-fetch");

let base = "https://api.trello.com/1/boards/"
let id = "5c34bb631dba821293620ef1"
let option = "/lists?"
let key = `key=${process.env.TRELLO_KEY}&`
let token = `token=${process.env.TRELLO_TOKEN}`

let url = base + id + option + key + token

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  console.log('Client Connect')
  fetch(url)
    .then(response => response.json())
    .then((data) => {
      data.forEach(item => {
        io.emit('lists', item.name)
      });
    }).catch(e => {
      console.log(e);
   });
   socket.on('test', (data2) => {
    console.log(data2);
   });
});

http.listen(80, function(){
  console.log('listening on *:80');
});