var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
require('dotenv').config()
const fetch = require("node-fetch");

let base = "https://api.trello.com/1/boards/"
let id = "5c34bb631dba821293620ef1"
let option = "/lists?"
let key = `key=${process.env.TRELLO_KEY}&`
let token = `token=${process.env.TRELLO_TOKEN}`

let url = base + id + option + key + token

function callApi() {
  fetch(url)
    .then(response => response.json())
    .then((data) => {
      data.forEach(item => {
        io.emit('lists', "test")
      });
    }).catch(e => {
      console.log(e);
   });
}



module.exports.callApi = callApi;