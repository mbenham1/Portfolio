var db = require("../models");

module.exports = function(app) {

  var palindromes = [
    // {
    //   palindrome: "racecar"
    // }
  ];

  app.get("/api/friends", function(req, res) {
      
    db.User.findAll({}).then(function(list) {
      res.json(list);
    });

  });

  app.get("/api/palindromes", function(req, res) {

    res.json(palindromes);

  })

  app.post("/api/friends", function(req, res) {

    db.User.create(req.body).then(function(newFriend) {
      res.json(newFriend);
    });

  });

  app.post("/api/palindromes", function(req, res) {

    palindromes.push(req.body);
    res.end();

  })

}