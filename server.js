var path = require('path');
var express = require('express');
var app = express();

var mongoApiUrlObj = {
	MONGO_API_URL: process.env.MONGO_API_URL
};

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, '/static')));

app.get('/api/MONGO_API_URL', function (req, res){
	res.json(mongoApiUrlObj);
});

app.get('/static/*', function (req, res) {
	res.sendFile(__dirname + req.url);
});
app.get('/*', function (req, res) {
	res.sendFile( __dirname + '/static/app.html');
});

app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});
