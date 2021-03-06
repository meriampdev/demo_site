var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var search = require('./routes/search');
var details = require('./routes/details');

var app = express();

// var db = require('./db'); 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set("port", 3000);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api/users', users);
app.use('/api/search', search);
app.use('/api/details', details);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var http = require('http');
var server = http.createServer();
var socket_io = require('socket.io');
server.listen(3003);
var io = socket_io();
io.attach(server);

io.on('connection', function(socket){
  console.log("Socket connected: " + socket.id);
  var clients = Object.keys(io.sockets.sockets)
  socket.on('action', (action) => {
    if (action.type === 'server/login') {
      let data = Object.assign({}, action.data)
      data.socket_id = socket.id
      // socket.set(socket.id, action.data)
      io[socket.id] = data
      var online_users = []
      clients.map((id)=>{
        let data = io[id]
        if (data && id !== socket.id) {
          online_users.push(data)
        }
      })

      socket.emit('action', {type: 'login', data: data})
      data.online_users = online_users
      socket.emit('action', {type: 'join', data: online_users})
      socket.broadcast.emit('action', {type: 'join', data: data})

    } else if (action.type === 'server/pm') {
      let date = new Date();
      let time = date.getTime();
      let message_data = Object.assign({}, action.data)
      message_data.socket_id = socket.id
      message_data.time = time
      io.sockets.in(action.data.user_data.room).emit('action', {type:'personal_message', data: message_data});

    } else if (action.type === 'server/hello'){
      let date = new Date();
      let time = date.getTime();
      let message_data = Object.assign({}, action.data)
      message_data.socket_id = socket.id
      message_data.time = time
      io.emit('action', {type:'message', data: message_data});
      
    } else if (action.type == 'server/CreateRoom') {
      //join the registered user 
      socket.join(action.data.data.room);
      const client_socket = io.sockets.sockets[action.data.data.to]
      client_socket.join(action.data.data.room);

      //notify the client
      io.sockets.in(action.data.data.room).emit('action', {type: 'private_room_created', data: action.data.data});
    }
  });

  socket.on('disconnect', function(data){
    console.log('user disconnected', data);
  });
});

// client.login().then(() =>
//   db.collection('persons').updateOne({owner_id: client.authedId()}, {$set:{number:42}}, {upsert:true})
// ).then(() =>
//   db.collection('persons').find({owner_id: client.authedId()})
// ).then(docs => {
//   console.log("Found docs", docs)
//   console.log("[MongoDB Stitch] Connected to Stitch")
// }).catch(err => {
//   console.error(err)
// });
// const stitch = require("mongodb-stitch")
// const client = new stitch.StitchClient('app1-pioid');
// const db = client.service('mongodb', 'mongodb-atlas').db('db_start');

// client.login().then(()=>{
//   db.collection('persons').find({owner_id: client.authedId()}).then((found)=>{
//     console.log('found', found)
//   })
// })

// client.login().then(() =>
//   db.collection('persons').updateOne({owner_id: client.authedId(), 'id': 'xxx1'}, {$set:{number:42}}, {upsert:true})
// ).then(() =>
//   db.collection('persons').find({owner_id: client.authedId()})
// ).then(docs => {
//   console.log("Found docs", docs)
//   console.log("[MongoDB Stitch] Connected to Stitch")
// }).catch(err => {
//   console.error(err)
// });

module.exports = app;
