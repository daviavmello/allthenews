let express = require("express");
let mongoose = require("mongoose");
let exphbs = require("express-handlebars");

// Initialize Express
let app = express();
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.engine("handlebars", exphbs({ layout: "main" }));
app.set("view engine", "handlebars");

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://user:password1@ds137498.mlab.com:37498/heroku_4168v2ff";

// Connect to the Mongo DB
mongoose.connect(MONGODB_URI);
require("./routes/routes.js")(app);

app.listen(3000, function () {
    console.log("App running on port 3000!");
});