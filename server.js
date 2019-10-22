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

mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb://user:password1@ds137498.mlab.com:37498/heroku_4168v2ff",

{
    useMongoClient: true
}
);

app.listen(3000, function () {
    console.log("App running on port 3000!");
});