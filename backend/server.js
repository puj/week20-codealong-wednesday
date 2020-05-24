import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt-nodejs";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/auth";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

/*
BACK
- SQL Injection for mongo
- bcrypt and access token
- try/catch in the backend
- Print error message from catch
FRONT
- Fetch to login
- Access Token in the frontend
- Github in groups
*/

const User = mongoose.model("User", {
  name: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex"),
  },
});

//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

const authenticateUser = async (req, res, next) => {
  next();
};

// Create user  - sign up
app.post("/users", async (req, res) => {});

// Secure endpoint, user needs to be logged in to access this.
app.get("/users/:id", authenticateUser);
app.get("/users/:id", (req, res) => {});

// login user
app.post("/sessions", async (req, res) => {});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
