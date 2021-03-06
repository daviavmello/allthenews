let express = require("express");
let mongoose = require("mongoose");
let exphbs = require("express-handlebars");

var PORT = process.env.PORT || 3000;

// Initialize Express
let app = express();

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.engine("handlebars", exphbs({ layout: "main" }));
app.set("view engine", "handlebars");

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://user:password1@ds127644.mlab.com:27644/heroku_n6c2rpls";

// Connect to the Mongo DB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

require("./routes/routes.js")(app);

app.listen(PORT, function () {
    console.log("App running on port 3000!");
});