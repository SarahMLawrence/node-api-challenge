const express = require("express");
const logger = require("./middleware/logger");
const cors = require("cors");
const welcomeRouter = require("./welcome/welcome-router");
const actionRouter = require("./actions/actionRouter");
const projectRouter = require("./actions/projectRouter");
const server = express();
const port = process.env.PORT || 4000

server.use(express.json()); 
server.use(cors());
server.use(logger());
server.use(welcomeRouter);
server.use(actionRouter);
server.use(projectRouter);

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = server;
