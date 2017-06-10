// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
const viewRouter = require("./routes/views.routes.js")
const apiRouter = require("./routes/api.routes.js")

// Create Instance of Express
var app = express();
// Sets an initial port. We'll use this later in our listener
const PORT = process.env.PORT || 8080;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("./public"));

// -------------------------------------------------

const localDb = "mongodb://localhost/nyt-search"
// MongoDB Configuration configuration (Change this URL to your own DB)
mongoose.connect("mongodb://heroku_cl1lc33h:5eh3grsa0u1vloiprkn0i8cq1t@ds121192.mlab.com:21192/heroku_cl1lc33h");
var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// -------------------------------------------------

app.use("/api", apiRouter)
app.use("/", viewRouter)

// -------------------------------------------------

// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
