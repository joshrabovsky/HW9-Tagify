const express = require("express");
const cors = require("cors");
const fs = require("fs");
const https = require("https");

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

require("./app/routes/twitter.routes.js")(app);
require("./app/routes/cohere.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;

https.createServer(
  {
    key: fs.readFileSync("server.key"),
    cert: fs.readFileSync("server.cert"),
  },
  app
).listen(PORT, function () {console.log(`Server is running on port ${PORT}.`)});