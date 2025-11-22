// The server index.js
import "dotenv/config";
import session from "express-session";
import express from "express";
import Hello from "./Hello.js"; // import Hello from Hello.js
import Lab5 from "./Lab5/index.js";
import UserRoutes from "./Kambaz/Users/routes.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModulesRoutes from "./Kambaz/Modules/routes.js";
import AssignmentsRoutes from "./Kambaz/Assignments/routes.js";
import db from "./Kambaz/Database/index.js";
import cors from "cors";

const app = express();
app.use(
  cors({
    credentials: true,
    origin: function(origin, callback) {
      const allowedOrigins = [
        process.env.CLIENT_URL,
    'https://kambaz-next-js-main.vercel.app',
    'https://kambaz-next-js-main-git-main-ellapitts-projects.vercel.app',
    'http://localhost:3000'
      ];

      // Allow any Vercel preview deployment
      const vercelPattern = /^https:\/\/kambaz-next-js-main2.*\.vercel\.app$/;
      
      if (!origin || allowedOrigins.includes(origin) || vercelPattern.test(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
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
CourseRoutes(app, db);
ModulesRoutes(app, db);
AssignmentsRoutes(app, db);
app.listen(process.env.PORT || 4000);
