//Import key files
var keys = require("./keys.js");

//twitter npm package
var twitter = require("twitter");

//import spotify npm package
var spotify = require("spotify");

//import request npm package
var request = require("request");

//import FS package for read/write
var fs = require("fs");




//FUNCTIONS



//add to log.txt file
var getArtistNames = function(artist){
	return artist.name;
}

//run a spotify search
var getSpotify = function(tuneName){
	if(tuneName == undefined){
		tuneName = "Say my name, Say my name??? please put in me name again";
	}

	spotify.search({
		type: "track",
		query: tuneName
	}, 
//error-first callback: enable a balanced, non-blocking flow of asynchronous control across modules and applications
/*The first argument of the callback is reserved for an error object. 
If an error occurred, it will be returned by the first err argument.


The second argument of the callback is reserved for any successful response data. 
If no error occurred, err will be set to null and any successful data will be returned in the second argument.
*/
	function(err,data){
		if (err){
			console.log("Error occured:" + err);
			return;
		}

		var tune = data.tracks.items;

		for(var i = 0; i < tune.length; i++){
			//song number
			console.log(i);
			console.log("artist/s: " + tune[i].artists.map(getArtistNames));
			console.log("song's name: " + tune[i].name);
			console.log("preview of name: " + tune[i].preview_url);
			console.log("album: " + tune[i].album.name);
		}
	});
};

//Twitter search setup

var getTweet = function(){
	var user = new Twitter(keys.twitterKeys);

	var params = {
		screen_name:"bbc"
	};
	client.get("statuses/user_timeline", params, function(error, tweet, response){
		if(!error){
			for (var i = 0; i < tweet.length; i++) {
				console.log(tweet[i].created_at);
				console.log(" " + tweet[i].text);
				}
			}
	})

	//Movie search setup
var getMovie = function(movieName) {

  if (movieName == undefined) {
    movieName = "Empty";
  }

  var urlLink = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&r=json";


//http://www.w3schools.com/js/js_json_http.asp info on request setup

  request(urlLink, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var jsonData = JSON.parse(body);

      console.log("Title: " + jsonData.Title);
      console.log("Year: " + jsonData.Year);
      console.log("Rated: " + jsonData.Rated);
      console.log("IMDB Rating: " + jsonData.imdbRating);
      console.log("Country: " + jsonData.Country);
      console.log("Language: " + jsonData.Language);
      console.log("Plot: " + jsonData.Plot);
      console.log("Actors: " + jsonData.Actors);
      console.log("Rotten Tomatoes Rating: " + jsonData.tomatoRating);
      console.log("Rotton Tomatoes URL: " + jsonData.tomatoURL);
    }
  });
};



// running a command based on text file https://nodejs.org/api/fs.html
var letsGo = function() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    console.log(data);

    var dataArr = data.split(",");

    if (dataArr.length === 2) {
      pick(dataArr[0], dataArr[1]);
    } 
    else if (dataArr.length === 1) {
      pick(dataArr[0]);
    }

  });
};

// Function for determining which command is executed
var select = function(caseData, functionData) {
  switch (caseData) {
    case "my-tweets":
      getTweets();
      break;
    case "spotify-this-song":
      getSpotify(functionData);
      break;
    case "movie-this":
      getMovie(functionData);
      break;
    case "do-what-it-says":
      letsGo();
      break;
    default:
      console.log("fail.....try again");
  }
};

// Function which takes in command line arguments and executes correct function accordigly
var runThis = function(argOne, argTwo) {
  select(argOne, argTwo);
};

runThis( process.argv[2], process.argv[3]);