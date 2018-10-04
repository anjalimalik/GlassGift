/*
 *  Server/Rest API is hosted here, ready my dude?
 */
const express = require('express');
const app = express();
const port = process.env.PORT || 44844;

app.listen(port);
console.log('Server started on port ' + port);