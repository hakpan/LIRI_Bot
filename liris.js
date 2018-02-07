require("dotenv").config();
//create a variable that will call on the keys file
var keys = require('./keys.js');

//npm twitter
var Twitter = require('twitter');

//npm Spotify 
var spotify = require('spotify');
 
//------------------------------------------------
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
//------------------------------------------------
//create function that will have Spotify data

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
//-------------------------------------------------
//create a function that will call on the function getTweets when we enter it into node
var command = function(caseData, functionData) {
	switch(caseData) {
		case 'my-tweets' :
			getTweets();
			break;
		case 'spotify-this-song' :
			getSpotify();
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

















