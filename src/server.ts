import express from "express";
import path from "path";
import router from "./router";
import morgan from "morgan";
import cors from "cors";
import { protect } from "./modules/auth";
import { createNewUser, signin } from "./handlers/user";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("static"));

app.get("/", (req, res) => {
  res.status(200);
  res.sendFile(path.resolve("pages/index.html"));
});

// JWT protect middleware
app.use("/api", protect, router);

// Public routes
app.post("/user", createNewUser);
app.post("/signin", signin);

// Error handling
app.use((err, req, res, next) => {
  if (err.type === "auth") {
    res.status(401);
    res.json({ message: "Unathorized" });
  } else if (err.type === "input") {
    res.status(400);
    res.json({ message: "Invalid input" });
  } else {
    res.status(500);
    res.json({ message: "Ooops, thats on us" });
  }
});

export default app;
