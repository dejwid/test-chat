const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const ws = require('ws');
require('dotenv').config();

const jwtSecret = 'asdf;ljasdf;ljasdfl;jasl;dfjalksdjf';
const app = express();
app.use(express.json());
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL,
}));

app.post('/login', async (req, res) => {
  const {username} = req.body;
  const token = await jwt.sign({username}, jwtSecret);
  res.cookie('token', token).json('ok');
});

const server = app.listen(process.env.PORT);

const wss = new ws.WebSocketServer({server});
wss.on('connection', client => {
  client.on('message', (message,isBinary) => {
    [...wss.clients].filter(c => c !== client).forEach(c => c.send(isBinary ? message.toString() : message));
  });
});

