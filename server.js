var path = require('path');
var express = require('express');
var app = express();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, '/static')));

app.get('/static/*', function (req, res) {
	res.sendFile(__dirname + req.url);
});
app.get('/*', function (req, res) {
	res.sendFile( __dirname + '/static/app.html');
});

app.listen(80, function () {
	console.log('Example app listening on port 80!');
});
