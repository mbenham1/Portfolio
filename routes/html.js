var path = require("path");

module.exports = function(app) {

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/businesscard.html"));
  });

  app.get("/businesscard", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/businesscard.html"));
  });

  app.get("/portfolio", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/portfolio.html"));
  });

};
