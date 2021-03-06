const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');

//db setup
mongoose.connect('mongodb://localhost/auth')

//app setup
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*', limit: '10mb' }));
router(app);

//server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
