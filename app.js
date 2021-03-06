const express = require('express');
var app = express();
const path = require('path');
const port = process.env.PORT||5000;
const http = require('http').Server(app);
var io = require('socket.io')(http);

const url = require('url');

app.use(express.static('public'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', function (req, res){
    res.render('index', {
        videoname: req.query.v
    });
})
http.listen(port, () => console.log(`Listening on ${ port }`))

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
    socket.on('play', function(msg){
        console.log(msg);
        socket.broadcast.emit('returnplay', 'the server is broadcasting "play"');
    })
    socket.on('pause', function(msg){
        console.log(msg);
        socket.broadcast.emit('returnpause', 'the server is broadcasting "pause"');
    })
    socket.on('seek', function(pos){
        console.log(pos);
        socket.broadcast.emit('returnseek', pos);
    })
    socket.on('newlink', function(url){
        console.log(url);
        socket.broadcast.emit('returnlink', url);
    })
});