import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import rateLimiter from "express-rate-limit";

dotenv.config();

const port = process.env.PORT || 5000;

connectDB();

const app = express();
const limiter = rateLimiter({ windowMs: 5 * 60 * 1000, max: 10 });
//Maximum 15 requests in 5 minutes
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes); // Include the event routes

app.get("/", (req, res) => res.send("API running"));

app.use(notFound);
app.use(errorHandler);
app.listen(port, () => console.log(`Server started on port ${port}`));
