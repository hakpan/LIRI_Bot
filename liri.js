require("dotenv").config();
//create a variable that will call on the keys file
var keys = require('./keys.js');

//npm twitter
var Twitter = require('twitter');

//npm Spotify 
var spotify = require('spotify');

//npm omdb
var request = require("request");
 
//--------------------Tweets---------------------
//Create a function that will hold tweets so it doesn't run automatically
var getTweets = function() {
	var client = new Twitter(keys.twitter);
	 
	var params = {screen_name: 'VoleElif'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	    //console.log(tweets);
	    //create a for loop to get and display the tweet attributes, created at and the text
	    for(var i=0; i<tweets.length; i++) {
	    	console.log(tweets[i].created_at);
	    	console.log(' ');
	    	console.log(tweets[i].text);
	    }
	  }
	});
}
//--------------------Spotify--------------------
//create function that will have Spotify data
//my keys are not connecting. They should be calling the 
//keys below with spotify.search it matches the var at the top
//and then there is the var keys at top that links to the
//keys page, which links to the .env page, but it's not working

var getArtistNames = function(artist) {
	return artist.name;
} 

var getSpotify = function(songName) {
	//var clientSpotify = new spotify(keys.spotify);

	spotify.search({ type: 'track', query: songName }, function(err, data) {
	    if ( err ) {
	        console.log('Error occurred: ' + err);
	        return;
	    }
	 
	    var songs = data.tracks.items;
	    for(var i=0; i<songs.length; i++) {
	    	console.log(i);
	    	console.log('artist(s): ' + songs[i].artists.map(getArtistNames));
	    	console.log('song name: ' + songs[i].name);
	    	console.log('preview song: ' + songs[i].preview_url);
	    	console.log('album: ' + songs[i].album.name);
	    	console.log('-----------------------------');
	    }
	});
}
//---------------------ombd-------------------
//create function that gets omdb database so we can search movies
// Then run a request to the OMDB API with the movie specified
var getMovie = function(movieName) {
	request("http://www.omdbapi.com/?t=" + movieName + " &y=&plot=short&apikey=trilogy", function(error, response, body) {

	  // If the request is successful (i.e. if the response status code is 200)
	  if (!error && response.statusCode === 200) {

	    // Parse the body of the site and recover just the imdbRating
	    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
	    console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
	  }
	});
}


//-------------------------------------------------
//create a functions that will call on the function tweets, spotify, and ombd functions
var command = function(caseData, functionData) {
	switch(caseData) {
		case 'my-tweets' :
			getTweets();
			break;
		case 'spotify-this-song' :
			getSpotify();
			break;
		case 'movie-this' :
			getMovie();
			break;
		//if you don't use case will default to this text
		default:
		console.log('LIRI does not know that');
	}
}

//function that processes the argument of the command function
var runThis = function(argOne, argTwo) {
	command(argOne, argTwo);
};

//pass the arguments from user argv 2 is the command, argv 3 specific of argv 2
runThis(process.argv[2], process.argv[3]);

















