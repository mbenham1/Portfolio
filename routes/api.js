var db = require("../models");

module.exports = function(app) {

  var palindromes = [
    // {
    //   palindrome: "racecar"
    // }
  ];
  var sorted = [];
  var top = [];

  app.get("/api/friends", function(req, res) {
      
    db.User.findAll({}).then(function(list) {
      res.json(list);
    });

  });

  app.get("/api/palindromes", function(req, res) {

    res.json(palindromes);

  })

  app.get("/api/top", function (req, res) {

    res.json(top[top.length-1]);
    // res.json(top);

  })

  app.post("/api/friends", function(req, res) {

    db.User.create(req.body).then(function(newFriend) {
      res.json(newFriend);
    });

  });

  app.post("/api/palindromes", function(req, res) {

    palindromes.push(req.body);
    sorted.push(req.body.palindrome);
    sorted = sorted.sort((a, b) => b.length - a.length);
    res.send("Received")
    // var longest = sorted[0];
    let unique = [...new Set(sorted[0].slice(''))];
    // console.log(unique);
    if (unique.length > 3) {
      var longest = sorted[0];
      top.push({
        palindrome: longest,
        date: req.body.date
      });
      // res.send(longest);
      // console.log(top)
    } else {
      // res.json(longest);
    }
    // console.log(sorted[0]);
    // const longest = palindromes.sort(function (a, b) { return b.length - a.length })[0];
    // console.log(longest);

    // res.json(longest);
    // res.end();

  })

  // app.post("/api/clear", function(req, res) {

  //   palindromes.length = 0;
  //   top.length = 0;

  //   res.json({ ok: true });
  // });

}