import request from "supertest";
import app from "../server.js";

describe("User Routes", () => {
  let authToken; // Stores the authentication token for authenticated requests
  let createdUserId; // Stores the ID of the user created for testing

  afterAll(async () => {
    // Clean up created user after all tests complete
    await request(app).delete(`/api/users/${createdUserId}`);
  });

  describe("POST /api/users/auth", () => {
    it("should authenticate user and return status 201 with token", async () => {
      const userData = {
        email: "johndoe@example.com",
        password: "password123",
      };

      const response = await request(app)
        .post("/api/users/auth")
        .send(userData);

      expect(response.statusCode).toBe(201);
      expect(response.body._id).toBeTruthy();
      expect(response.body.email).toBe(userData.email);
      expect(response.header["set-cookie"]).toBeTruthy();

      // Store the authentication token for future authenticated requests
      authToken = response.header["set-cookie"][0].split(";")[0].split("=")[1];
    });

    it("should return status 400 if email or password is invalid", async () => {
      const userData = {
        email: "invalid@example.com",
        password: "invalidpassword",
      };

      const response = await request(app)
        .post("/api/users/auth")
        .send(userData);

      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe("Invalid email or password");
    });
  });

  describe("POST /api/users", () => {
    it("should create a new user and return status 201", async () => {
      const userData = {
        name: "John Doe",
        email: "johndoe@example.com",
        password: "password123",
      };

      const response = await request(app).post("/api/users").send(userData);

      expect(response.statusCode).toBe(201);
      expect(response.body._id).toBeTruthy();
      expect(response.body.name).toBe(userData.name);
      expect(response.body.email).toBe(userData.email);

      // Store the created user ID for cleanup after all tests complete
      createdUserId = response.body._id;
    });

    it("should return status 400 if required fields are missing", async () => {
      const userData = {
        email: "johndoe@example.com",
        password: "password123",
      };

      const response = await request(app).post("/api/users").send(userData);

      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBeTruthy();
    });

    it("should return status 400 if user already exists", async () => {
      const userData = {
        name: "John Doe",
        email: "johndoe@example.com",
        password: "password123",
      };

      const response = await request(app).post("/api/users").send(userData);

      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe("User already exists");
    });
  });

  describe("POST /api/users/logout", () => {
    it("should clear the authentication cookie and return status 200", async () => {
      const response = await request(app).post("/api/users/logout");

      expect(response.statusCode).toBe(200);
      expect(response.header["set-cookie"]).toBeTruthy();
      expect(response.header["set-cookie"][0].split(";")[0]).toBe("jwt=");
    });
  });

  describe("GET /api/users/profile", () => {
    it("should fetch user profile and return status 200", async () => {
      const response = await request(app)
        .get("/api/users/profile")
        .set("Cookie", `jwt=${authToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body._id).toBeTruthy();
      expect(response.body.name).toBeTruthy();
      expect(response.body.email).toBeTruthy();
    });

    it("should return status 401 if user is not authenticated", async () => {
      const response = await request(app).get("/api/users/profile");

      expect(response.statusCode).toBe(401);
      expect(response.body.error).toBe("Not authorized, token failed");
    });
  });

  describe("PUT /api/users/profile", () => {
    it("should update user profile and return status 200", async () => {
      const updatedData = {
        name: "Updated Name",
        email: "updatedemail@example.com",
        password: "newpassword123",
      };

      const response = await request(app)
        .put("/api/users/profile")
        .send(updatedData)
        .set("Cookie", `jwt=${authToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body._id).toBeTruthy();
      expect(response.body.name).toBe(updatedData.name);
      expect(response.body.email).toBe(updatedData.email);
    });

    it("should return status 401 if user is not authenticated", async () => {
      const updatedData = {
        name: "Updated Name",
        email: "updatedemail@example.com",
        password: "newpassword123",
      };

      const response = await request(app)
        .put("/api/users/profile")
        .send(updatedData);

      expect(response.statusCode).toBe(401);
      expect(response.body.error).toBe("Not authorized, token failed");
    });

    it("should return status 400 if invalid data is provided", async () => {
      const updatedData = {
        email: "updatedemail@example.com",
        password: "newpassword123",
      };

      const response = await request(app)
        .put("/api/users/profile")
        .send(updatedData)
        .set("Cookie", `jwt=${authToken}`);

      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBeTruthy();
    });
  });
});
