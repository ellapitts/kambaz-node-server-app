// The server index.js 

import express from "express";
import Hello from "./Hello.js"; // import Hello from Hello.js
import Lab5 from "./Lab5/index.js";
import cors from "cors";

const app = express();
app.use(cors());
const PORT = 4000;
app.use(express.json());
Lab5(app);
Hello(app) // pass app reference to Hello
app.listen(process.env.PORT || PORT);