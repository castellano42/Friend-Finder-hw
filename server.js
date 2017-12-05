var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var friends = require("./app/data/friends");
var fs = require('fs');
var app = express();
var PORT = process.env.PORT || 3000;;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/home.html"));
  console.log("this is working")

});

app.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, "/app/public/survey.html"));
  console.log("this is working")
});

app.post('/send/serrvey', function(req, res){
	console.log(req.body);

	var userSum = Object.values(req.body).reduce((acumulator, currentValue)=>{
		return parseInt(acumulator) + parseInt(currentValue); 
	});

	var frindsSums = friends.map((friend)=>{
		return friend['scores'].reduce((acumulator, currentValue)=>{
			return acumulator + currentValue; 
		});
	})

	var differences = frindsSums.map((sum)=>{
		return Math.abs(sum - userSum);
	}).sort(); 

	console.log(differences);


	res.send("Hello :)")
});


app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});