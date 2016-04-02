// Build a full stack MVP of a website where I should be able to put in a 
// twitter username and get back that person's last
//  25 tweets. You need to start this assignment from scratch. 

// Client side:
// -I need an input field for a twitter username, 
// which should notify your server
// -An area to display the resulted tweets
// -If you get extra time, use Angular to 
// make it look more presentable

// Server side:
// Given the inputted username, interact with the twitter api to get the
//  last 25 tweets (hint: there are node modules out there that will help you get this information),
//   send that information back to your client

// When are you finished, email la.communcation@makersquare.com your 
// completed assignment. Please note that this is graded, and if you are not finished,
//  turn in what you have by 5:30pm. Late assignments will not be accepted. 

var http = require('http');
var express = require('express');
var Twitter = require('twitter');
var bodyParser = require('body-parser');
var fs = require('fs');
app = express();
var client = new Twitter({
  consumer_key: 'eQ77LVDSNFIjlbrhzgynyuuOB',
  consumer_secret: 'NKZs0UvXuXkjR7Unoy5q2egQJpqkpM9GuGDY65QaNqI743yEAm',
  access_token_key: '716329063028097024-f3lP8Lz3PuIgZTHg9QgeXhtyCmNChxa',
  access_token_secret: 'ZkCkRBatSLg91CYqflgsPSbbzYH8ZPvz872jHrMAzhWRw',
});

console.log(__dirname);
app.use(bodyParser.urlencoded({extended: false}));
app.use('/client', express.static(__dirname + '/../client'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());

// app.get('/', function(req, res){
//   res.send("Hello World");
// });

app.get('/', function(req, res){
	fs.readFile(__dirname + '/../client/index.html', 'utf8', function(err, data){
		if(err){
			console.log ('ITS ERRORING', err);
		}

			res.send(data);
	})

})

app.post('/', function(req, res){

	var watermelon = req.body.user;
	client.get('https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name='+ req.body.user +'&count=25', function(error, tweets, response){
  if(error) throw error;
  console.log(tweets);  // The favorites. 
 	res.send(tweets);  // Raw response object. 
});
})
app.listen('3000');
console.log("IM LISTENING");




// Consumer Key (API Key)	eQ77LVDSNFIjlbrhzgynyuuOB
// Consumer Secret (API Secret)	NKZs0UvXuXkjR7Unoy5q2egQJpqkpM9GuGDY65QaNqI743yEAm

// Owner	ericso030393
// Owner ID	716329063028097024

// Access Token	716329063028097024-f3lP8Lz3PuIgZTHg9QgeXhtyCmNChxa
// Access Token Secret	ZkCkRBatSLg91CYqflgsPSbbzYH8ZPvz872jHrMAzhWRw
