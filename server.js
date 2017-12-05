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
 res.sendFile(path.join(__dirname, "/app/public/survey.html"));
  console.log("this is working")

});

app.post('/send/serrvey', function(req, res){
	var userSum = Object.values(req.body).reduce((acumulator, currentValue)=>{
		return parseInt(acumulator) + parseInt(currentValue); 
	});

	var frindsSums = friends.map((friend)=>{
		return friend['scores'].reduce((acumulator, currentValue)=>{
			return acumulator + currentValue; 
		});
	})

	var count = 0; 
	var differences = frindsSums.map((sum)=>{
		var differences = Math.abs(sum - userSum)
		var output = {};
		output[differences] = count++; 
		return output; 
	}).sort((a, b)=>{
		return parseInt(Object.keys(a)[0]) - parseInt(Object.keys(b)[0])
	}); 

	var friendIndex = Object.values(differences[0])[0]; 
	// console.log(friends[friendIndex]); 
	res.setHeader('Content-Type', 'application/json');
	res.send(friends[friendIndex])
});


app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});