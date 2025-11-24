import request from "supertest";
import app from "../server.js";

describe("GET /api/health", () => {
  it("debe responder ok", async () => {
    const res = await request(app).get("/api/health");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("status");
  });
});
