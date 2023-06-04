import request from "supertest";
import app from "../server.js";

describe("User Routes", () => {
  describe("POST /api/users", () => {
    it("should register a new user and return status 201", async () => {
      const userData = {
        name: "Test User",
        email: "testuser@example.com",
        password: "password123",
      };

      const response = await request(app).post("/api/users").send(userData);

      expect(response.statusCode).toBe(201);
      expect(response.body._id).toBeTruthy();
      expect(response.body.name).toBe(userData.name);
      expect(response.body.email).toBe(userData.email);
    });

    it("should return status 400 if user registration data is invalid", async () => {
      const userData = {
        name: "Test User",
        email: "testuser", // Invalid email format
        password: "password123",
      };

      const response = await request(app).post("/api/users").send(userData);

      expect(response.statusCode).toBe(400);
    });
  });

  describe("POST /api/users/login", () => {
    it("should login a registered user and return status 201 with token", async () => {
      const userData = {
        email: "testuser@example.com",
        password: "password123",
      };

      const response = await request(app)
        .post("/api/users/login")
        .send(userData);

      expect(response.statusCode).toBe(201);
      expect(response.body._id).toBeTruthy();
      expect(response.body.email).toBe(userData.email);
      expect(response.header["set-cookie"]).toBeTruthy();
    });

    it("should return status 400 if login credentials are invalid", async () => {
      const userData = {
        email: "testuser@example.com",
        password: "invalidpassword", // Invalid password
      };

      const response = await request(app)
        .post("/api/users/login")
        .send(userData);

      expect(response.statusCode).toBe(400);
    });
  });
});
