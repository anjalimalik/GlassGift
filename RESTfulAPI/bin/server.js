/*
 *  Server/Rest API is hosted here, ready my dude?
 */
var express = require('express'),
    app = express(),
    port = process.env.PORT || 44844;
const ip = "127.0.0.1";

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);