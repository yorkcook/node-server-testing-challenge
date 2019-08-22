const express = require("express");

const Ogs = require("../ogs/ogsModel.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ message: "It is working!!" });
});

module.exports = server;
