const express = require("express");
const path = require("path");
const logger = require("morgan");
const cors = require("cors");

const app = express();

//middleware

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client")));
  const productionApp = require("./routes/api/production_app");
  app.use("/.*/", productionApp);
}

//routes
const posts = require("./routes/api/posts");
const api_landing = require("./routes/api/default_landing_api");
app.use("/api/posts", posts);
app.use("/api", api_landing);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // next(createError(404));
  res.json({ message: "error" });
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  console.log(err);
  res.status(err.status || 500);
  res.render("error");
});

console.log(process.env.NODE_ENV);

module.exports = app;
