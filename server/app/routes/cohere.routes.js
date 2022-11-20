module.exports = app => {
    const cohere = require("../controllers/cohere.controller.js");

    let router = require("express").Router();

    // Get
    router.get("/:id", cohere.labelAccount)

    app.use('/api/cohere', router);
};