// The server index.js
import "dotenv/config";
import session from "express-session";
import mongoose from "mongoose"; // Chap. 6
import express from "express";
import Hello from "./Hello.js"; // import Hello from Hello.js
import Lab5 from "./Lab5/index.js";
import UserRoutes from "./Kambaz/Users/routes.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModulesRoutes from "./Kambaz/Modules/routes.js";
import AssignmentsRoutes from "./Kambaz/Assignments/routes.js";
import cors from "cors";

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz"
mongoose.connect(CONNECTION_STRING)  // Connects to kambaz database
.then(() => console.log("Connected to MongoDB!"))
    .catch((error) => console.error("Connection error:", error));
    
// ------ Express setup ------
const app = express();
// The deployed frontend URL is read directly from the environment variable
const CLIENT_URL = process.env.CLIENT_URL;

app.use(
  cors({
    credentials: true,
    // origin: function(origin, callback) {
      origin: CLIENT_URL,
  })
);
    //   [
    //     process.env.CLIENT_URL,
    // 'https://kambaz-next-js-main.vercel.app',
    // 'https://kambaz-next-js-main-git-main-ellapitts-projects.vercel.app',
    // 'https://kambaz-next-js-main2-git-a6-ellapitts-projects.vercel.app',
    // 'http://localhost:3000',
    // 'http://localhost:3001',
    // 'http://localhost:3002',
    // 'http://127.0.0.1:3000',
    // 'http://127.0.0.1:3001',
    // 'http://127.0.0.1:3002'
    //   ];

      // Allow any Vercel preview deployment
//       const vercelPattern = /^https:\/\/kambaz-next-js-main2.*\.vercel\.app$/;
      
//       if (!origin || allowedOrigins.includes(origin) || vercelPattern.test(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error('Not allowed by CORS'));
//       }
//     }
//   })
// );

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
UserRoutes(app); // DAOs now read from MongoDB directly
CourseRoutes(app);
ModulesRoutes(app);
AssignmentsRoutes(app);
app.listen(process.env.PORT || 4000);
