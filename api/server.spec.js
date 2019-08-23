const request = require("supertest");

const db = require("../data/dbConfig.js");

const server = require("./server.js");

describe("GET /", () => {
  it("returns 200 OK", () => {
    return request(server)
      .get("/")
      .then(res => {
        expect(res.status).toBe(200);
      });
  });
});

describe("POST /ogs", () => {
  beforeEach(async () => {
    it("should insert an og into the db", () => {
      return request(server)
        .post("/ogs")
        .send({
          name: "Steve Jobs"
        })
        .then(res => {
          expect(res.body.status).toBe(201);
        });
    });

    it("should insert more than one OG", async () => {
      await request(server)
        .post("/ogs")
        .send([
          {
            name: "Brad Pitt"
          },
          {
            name: "Ron Paul"
          },
          {
            name: "Derek Jeter"
          }
        ]);

      const ogs = await db("ogs");
      expect(ogs).toHaveLength(3);
    });
  });
});

describe("DELETE /ogs", () => {
  it("successful delete OG by ID", () => {
    return request(server)
      .delete("/ogs/1")
      .then(res => {
        expect(res.status).toBe(201);
      });
  });
});
