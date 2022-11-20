module.exports = app => {
    const tweets = require("../controllers/tweets.controller.js");

    let router = require("express").Router();

    // Get
    router.get("/:id", tweets.getTwitterUserTags)

    app.use('/api/tweets/', router);
};