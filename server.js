let express = require("express");
let mongoose = require("mongoose");
let exphbs = require("express-handlebars");

var PORT = process.env.PORT || 3000;

// Initialize Express
let app = express();

app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.engine("handlebars", exphbs({ layout: "main" }));
app.set("view engine", "handlebars");

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/allthenews-scrapper";

// Connect to the Mongo DB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

require("./routes/routes.js")(app);

app.listen(3000, function () {
    console.log("App running on port 3000!");
});