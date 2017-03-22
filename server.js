"use strict";

let app = require('express')();

let http = require('http').Server(app);
let io = require('socket.io')(http);

app.get('/',(req,res)=>{

    res.sendFile(__dirname+'/index.html');
});


io.on('connection',(socket)=>{

    console.log('New User Connected');

    socket.broadcast.emit('hi');

    //connection is closed by that particular user only,thats why 'disconnect' event is include in this.

    socket.on('disconnect',()=>{

        console.log("User Disconnects");
    });

    //this event will be transfered to that particular socket only.

    socket.on('chat message',(msg)=>{

       console.log('message : '+msg);

       io.emit('chat message',msg);
    });
});

//to send an event to everyone
io.emit('some event',{"message":"hello to all"});


http.listen(3000,()=>{
   console.log('Listening on localhost:3000/'); 
});