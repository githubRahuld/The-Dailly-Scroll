import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

const app = express();

dotenv.config({ path: "./.env" });

// cors configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true, 
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], 
  allowedHeaders: ["Content-Type", "Authorization"], 
};

// Apply CORS to all routes
app.use(cors(corsOptions));

// Ensure preflight (OPTIONS) requests also use the same CORS settings
app.options("*", cors(corsOptions));

app.use(express.json({ limit: "16kb" }));

app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"));

app.use(cookieParser());

app.use(fileUpload());

//import routes
import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";

app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);

export { app };
