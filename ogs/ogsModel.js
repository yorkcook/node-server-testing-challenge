const db = require("../data/dbConfig.js");

module.exports = {
  insertOg,
  deleteOg,
  getAllOgs
};

function insertOg(og) {
  return db("ogs").insert(og);
}

function deleteOg(id) {
  return db("ogs")
    .where({ id })
    .del();
}

function getAllOgs() {
  return db("ogs");
}
