require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const pageController = require("./controllers/pageController");
const articles = require("./routes/articles");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//Set Express template engine and static serving
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

//Set routes

//Home
app.get("/", pageController.renderHome());

//For articles
app.use("/articles", articles);

//Search result page
app.get("/search", pageController.renderSearchResults());

//404 page
app.get("/*", pageController.render404Page());

//Send mail
app.post("/", pageController.postMail());
const port = process.env.PORT || 9000;

app.listen(port, () => console.log("Server is started on Port : ", port));
