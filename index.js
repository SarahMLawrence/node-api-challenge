const express = require('express');
const server = express();
const port = 4000;

const welcomeRouter = require('./welcome/welcome-router');
const actionRouter = require('./actions/actionRouter');

server.use(express.json());
server.use(welcomeRouter);
server.use(actionRouter);

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

module.exports = server;