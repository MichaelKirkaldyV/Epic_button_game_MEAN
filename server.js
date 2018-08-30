var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require('body-parser');


app.use(express.static(path.join(__dirname + "./static")));
app.use(bodyParser.urlencoded({extended : true}));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

var server = app.listen(8000, function() {
	console.log("listening on port 8000");
});

app.get('/', function(req, res) {
    res.render('index');
})

const io = require('socket.io').listen(server);
var counter = 0;
io.sockets.on("connection", function(socket){
	 //Button press
	 //3
	 socket.on("epic_button_press", function(data){
      counter++;
      //emit the counter back to client side. 
      //4
      socket.emit("counter", counter);
    })

	  //Reset press
	  //6
	  socket.on("reset_button_press", function(data){
      counter = 0;
      //emit data to client
      //7
      socket.emit("reset", counter);
    })

})

