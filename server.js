var express = require('express');
var app = express();

app.get('/grades', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('server listening on port 3000!');
});