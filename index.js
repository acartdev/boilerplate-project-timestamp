// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});
function parseInput(param) {
  try {
    if (/^\d+$/.test(param)) {
      return new Date(+param);
    }
    return new Date(param);
  } catch (error) {
    throw new Error("Invalid Date");
  }
}
// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date", (req, res) => {
  try {
    const date = req.params?.date;
    let dateConvert = new Date();
    if (date) {
      dateConvert = parseInput(date);
    }
    const unix = dateConvert.getTime();
    const utc = dateConvert.toUTCString();
    if (isNaN(unix) || utc === "Invalid Date") {
      throw new Error("Invalid Date");
    }
    res.json({ unix, utc });
  } catch (error) {
    res.json({ error: "Invalid Date" });
  }
});
app.get("/api", (req, res) => {
  try {
    let dateConvert = new Date();
    const unix = dateConvert.getTime();
    const utc = dateConvert.toUTCString();
    res.json({ unix, utc });
  } catch (error) {
    res.json({ error: "Invalid Date" });
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
