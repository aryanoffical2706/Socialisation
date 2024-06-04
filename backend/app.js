const express = require("express");
require('dotenv').config();
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
let count = 0;
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({ path: "backend/config/config.env" });
}

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const post = require("./route/Post");
const user = require('./route/User');

const corsOptions = {
    origin: ["http://localhost:3000","https://networking-r5gi.vercel.app", "https://aryan-frontend-app.vercel.app"], // Specify your frontend URL
    credentials: true,
};

app.use(cors(corsOptions));

app.use("/api/v1", post);
app.use("/api/v1", user);
app.get("/api/v1/test", (req, res) => {
    count++;
    return res.send(`backend call number ${count}`)
});


module.exports = app;
