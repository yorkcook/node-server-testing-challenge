exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries and resets ids
  return knex("ogs")
    .truncate()
    .then(function() {
      return knex("ogs").insert([
        { name: "York" },
        { name: "Nate" },
        { name: "Clark" }
      ]);
    });
};
