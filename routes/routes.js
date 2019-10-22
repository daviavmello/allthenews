let axios = require("axios");
let cheerio = require("cheerio");
let db = require("../models");


module.exports = function (app) {

    app.get("/scrape", function (req, res) {
        axios.get("https://www.nytimes.com/section/world").then(function (response) {
            var $ = cheerio.load(response.data);
            $("article").each(function (i, element) {
                let result = {};
                result.title = $(element).children().children("h2").text();
                result.link = $(element).find("a").attr("href");
                result.snip = $(element).children().children("p").text();


                db.Article.create(result)
                    .then(dbArticle => {
                        console.log(dbArticle)
                    })
                    .catch(err => {
                        console.log(err);
                    });
            });
            res.send("Scrape Complete");
        })
    });

    app.get("/", function (req, res) {
        db.Article.find({}, function (err, data) {
            let hbsObject = {
                articles: data
            };
            res.render("index", hbsObject);
        })
    });

    app.get("/saved", function (req, res) {
        db.Article.find({}, function (err, data) {
            let hbsObject = {
                articles: data
            };
            console.log(data)
            res.render("saved", hbsObject);
        });

    });

    app.get("/articles", function (req, res) {
        db.Article.find({}, function (error, data) {
            console.log(data)
            res.json(data);
        });
    });

    app.get("/comments", function (req, res) {
        db.Note.find({}, function (error, data) {
            console.log(data)
            res.json(data);
        });
    });

    app.get("/drop", function (req, res) {
        db.Article.deleteMany({}, function (err, del) {
        });

        db.Note.deleteMany({}, function (err, del) {
        });
        console.log("Delete")
        res.send("Collection Dropped")
    });

    app.put("/saved/:id", function (req, res) {
        db.Article.findByIdAndUpdate({ _id: req.params.id }, {
            $set: { saved: true }
        }).then(function (data) {
            res.json(data);
        });
    });

    app.delete("/delete-Article/:id", function (req, res) {
        db.Article.findByIdAndUpdate({ _id: req.params.id },
            {
                $set: { saved: false }
            }).then(function (data) {
                res.json(data);
            });
    });

    app.post("/notes", function (req, res) {
        console.log(req.body);
        db.Note.create(req.body)
            .then(function (dbComment) {
                return db.Article.findOneAndUpdate({ _id: req.params.id },
                { $push: { comment: dbComment._id }}, { new: true });
            })
            .then(function (dbArticle) {
                res.json(dbArticle);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.get("/articles/:id", function (req, res) {
        db.Article.findOne({ _id: req.params.id })
            .populate("comment")
            .then(function (dbArticle) {
                res.json(dbArticle);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    app.delete("/delete-comment/:id", function (req, res) {
        db.Note.findByIdAndRemove(req.params.id, (err, comment) => {
            if (err) return res.status(500).send(err);
            return res.status(200).send();
        });

    });
};