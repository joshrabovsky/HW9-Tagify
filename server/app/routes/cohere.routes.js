module.exports = app => {
    const cohere = require("../controllers/cohere.controller.js");

    let router = require("express").Router();

    // Get
    router.get("/:id", cohere.labelAccount)
    router.get("/", (req, res) => {
        return res.send("This went through")
    })

    app.use('/api/cohere', router);
};