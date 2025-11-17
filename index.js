// The server index.js
import "dotenv/config";
import session from "express-session";
import express from "express";
import Hello from "./Hello.js"; // import Hello from Hello.js
import Lab5 from "./Lab5/index.js";
import UserRoutes from "./Kambaz/Users/routes.js";
import db from "./Kambaz/Database/index.js";
import cors from "cors";

const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL || "http://localhost:3000",
  })
);

const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
};
if (process.env.SERVER_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.SERVER_URL,
  };
}
app.use(session(sessionOptions));
app.use(express.json());

// Routes loaded
Hello(app); // pass app reference to Hello
Lab5(app);
UserRoutes(app, db); // Passes reference to daabase to each route.

app.listen(process.env.PORT || 4000);
