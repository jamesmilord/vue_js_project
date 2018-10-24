const express = require("express");
const path = require("path");
const router = express.Router();
const fs = require("fs");

router.get("/", (req, res) => {
  fs.readFile(path.resolve(__dirname, "../../client/index.html"), function(
    err,
    data
  ) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    res.end();
  });
});
module.exports = router;
