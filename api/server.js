const express = require("express");

const Ogs = require("../ogs/ogsModel.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ message: "It is working!!" });
});

server.get("/ogs", (req, res) => {
  Ogs.getAllOgs()
    .then(ogs => {
      res.status(200).json(ogs);
    })
    .catch(error => {
      res.status(500).json({ message: "You aint no OG!" });
    });
});

server.post("/ogs", (req, res) => {
  const og = req.body;
  Ogs.insertOg(og)
    .then(og => {
      res.status(200).json(og);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "You don't belong cause you aint no OG!!" });
    });
});

server.delete("/ogs/:id", (req, res) => {
  const id = req.params.id;
  Ogs.deleteOg(id)
    .then(deleted => {
      res.status(200).json(deleted);
    })
    .catch(error => {
      res.status(500).json({ message: "That OG can not be deleted." });
    });
});

module.exports = server;
