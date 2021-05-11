/*************/
/* Set up the static file server */
let static = require('node-static');

/* Set up the http file library */
let http = require('http');

/* Assume that we are running on Heroku */
let port = process.env.PORT;
let directory = __dirname + '/public';

/* If we arern't on Heroku, then we need to adjust our port and directory */
if ((typeof port == 'undefined') || ( port === null)){
	port = 8080;
	directory = './public';

}

/* Set up our static file web server to deliver files from the filesytem */
let file = new static.Server(directory);

let app = http.createServer(
	function(request, response){
         request.addListener( 'end',
         	function() {
         		file.serve(request, response);
         	}
	    ).resume();
	}   
).listen(port);
console.log('The server is running');