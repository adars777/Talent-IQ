import express from "express";
import path from "path";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import { serve } from "inngest/express";
import cors from "cors";
import { inngest } from "./lib/inngest.js";
import { functions } from "./lib/inngest.js";
import { clerkMiddleware } from "@clerk/express";
import { protectRoute } from "./middleware/protectRoute.js";
import chatRoutes from "./routes/chatRoutes.js"

const app = express();
const __dirname = path.resolve();

// /middlewares
app.use(express.json());

// Credentials:true meaning? =>server allows a browser to include cookies on request
app.use(cors({ origin: ENV.CLIENT_URL, Credentials: true }));
app.use(clerkMiddleware()); // this will add auth field to request object : req.auth()

app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("api/chat", chatRoutes )

app.get("/health", (req, res) => {
  res.status(200).json({ msg: "api is up and running..." });
});

app.get("/books", (req, res) => {
  res.status(200).json({ msg: "this is the book endpoint..." });
});

// when you pass an array of middleware to express, it automatically flattens and executes them sequentially, one by one.
app.get("/video-calls", protectRoute, (req, res) => {
  res.status(200).json({
    message: "video call endpoint",
  });
});

// make our app ready for development
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

const startserver = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => {
      console.log("server is running on PORT: ", ENV.PORT);
    });
  } catch (error) {
    console.error("Error starting the server ❌ ", error);
  }
};

startserver();
