const express = require('express');
const router = require('./Router/router')


const server = express();
server.use(express.json());

server.use("/", router)



server.use((err, req, res, next) => {
    res.status(500).json({ message: 'Error', err })
  })

module.exports = server;