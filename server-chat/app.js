var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/chatsdb', {useNewUrlParser: true, useUnifiedTopology: true});


var indexRouter = require('./routes/index');
var chatsRouter = require('./routes/chats');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/chats', chatsRouter);

module.exports = app;
