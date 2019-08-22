const request = require("supertest");

const db = require("../data/dbConfig.js");

const server = require("./server.js");

describe("server", () => {
  beforeEach(async () => {
    await db("ogs").truncate();
  });

  describe("GET /", () => {
    it("returns 200 OK", () => {
      return request(server)
        .get("/")
        .then(res => {
          expect(res.status).toBe(200);
        });
    });

    it("returns JSON", () => {
      return request(server)
        .get("/")
        .then(res => {
          expect(res.type).toMatch(res.json);
        });
    });
  });

  describe("GET /ogs", () => {
    it("should return an array", () => {
      return request(server)
        .get("/ogs")
        .then(res => {
          expect(Array.isArray(res.body)).toBe(true);
        });
    });
  });

  describe("POST /ogs", () => {
    it("should insert an og into the db", () => {
      return request(server)
        .post("/ogs")
        .send({
          name: "Steve Jobs"
        })
        .then(res => {
          expect(res.body.length).toBe(1);
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
