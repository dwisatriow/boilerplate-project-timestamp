// server.js
// where your node app starts

// init project
require("dotenv").config();
var express = require("express");
var app = express();

// port config
const port = process.env.PORT || 3000;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// request logger
app.use(function (req, res, next) {
  var log = req.method + " " + req.path + " - " + req.ip;
  console.log(log);
  next();
});

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// api endpoint return current time in json
app.get("/api", function (req, res) {
  const now = new Date();
  const unixTime = now.valueOf();
  const utcTime = now.toUTCString();

  res.json({
    unix: unixTime,
    utc: utcTime,
  });
});

// timestamp endpoint return parsed timestamp from unix to utc, or vice versa
app.get("/api/:timestamp", function (req, res) {
  const { timestamp } = req.params;
  let date;
  if (isNaN(timestamp)) {
    date = new Date(timestamp);
  } else {
    date = new Date(Number(timestamp));
  }

  if (isNaN(date.valueOf())) {
    res.json({
      error: "Invalid Date",
    });
  } else {
    const unixTime = date.valueOf();
    const utcTime = date.toUTCString();
    res.json({
      unix: unixTime,
      utc: utcTime,
    });
  }
});

// listen for requests :)
var listener = app.listen(port, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
