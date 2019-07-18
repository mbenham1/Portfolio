var db = require("../models");
var checkWord = require('check-word');
words = checkWord('en');

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

    console.log(words.check(req.body.palindrome));
    palindromes.push(req.body);
    sorted.push(req.body.palindrome);
    sorted = sorted.sort((a, b) => b.length - a.length);
    res.send("Received");
    let unique = [...new Set(sorted[0].slice(''))];
    if (unique.length > 2) {
      var longest = sorted[0];
      var index = palindromes.map(function(i) { return i.palindrome; }).indexOf(longest);
      console.log(index);
      if (words.check(longest) === true) {
      top.push({
        palindrome: longest,
        date: palindromes[index].date
      });
    }
      // res.send(longest);
      // console.log(top)
    } else {
      // res.json(longest);
    }

  })

  app.get("/api/c1eara11", function(req, res) {

    palindromes = [];
    top = [];

    res.json({ ok: true });

  });

}