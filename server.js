var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('login', ['login']);
var bodyParser = require('body-parser');
var md5 = require('MD5');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.post('/login', function (req, res) {

	var username = req.body.user;
	var password = md5(req.body.pass+"bearthcattelecom");

	db.login.findOne({username: username, password: password}, function (err, doc) {
		if(username == "admin" && password == md5("adminbearthcattelecom")) {
			res.send("Logged in as ADMIN");
		}else{
			if(doc){
				res.send("Login Successfully");
			}else{
				res.send("Login Failed");
			}
		}
	});
});

app.post('/checkUsername', function (req, res) {

	var username = req.body.username;

	if(req.body.user == ""){
		res.send("Username cannot be blank");
	}else{
		db.login.findOne({username: username}, function (err, doc) {
			if(doc){
				res.send("Username is already exist");
			}else{
				res.send("You can use this Username")
			}
		});
	}
});

app.post('/register', function (req, res) {
	
	var password = md5(req.body.password+"bearthcattelecom");

	console.log(password);

	db.login.insert({username: req.body.username, password: password}, function (err, doc) {
		res.json(doc);
	});
});

app.get('/admin', function (req, res) {

	db.login.find({}, function (err, doc) {
		res.json(doc);
	});
});

app.delete('/admin/:id', function (req, res) {
	var id = req.params.id;
	console.log(id);
	db.login.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
		res.json(doc);
	});
});

app.get('/admin/:id', function (req, res) {
	var id = req.params.id;
	console.log(id);
	db.login.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
		res.json(doc);
	});
});

app.put('/admin/:id', function (req, res) {
	var id = req.params.id;
	console.log(req.body.username);
	db.login.findAndModify({query: {_id: mongojs.ObjectId(id)},
		update: {$set: {username: req.body.username, password: md5(req.body.password+"bearthcattelecom")}},
		new: true}, function (err, doc) {
			res.json(doc);
		});
});

app.listen(3000);
console.log("Server running on port 3000");