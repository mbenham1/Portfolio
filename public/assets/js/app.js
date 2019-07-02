$(document).ready(function () {

    var name = $("#name");
    var email = $("#email");
    var message = $("#message")
    getPalindromes();
    $("#bad-palindrome").hide();

    $("#submit-form").on("click", function (event) {

        event.preventDefault();

        if (!name.val().trim() || !email.val().trim() || !message.val()) {
            $("#response").text("Please fill out all fields").css({ color: "red" });
            return;
        }

        var newFriend = {

            // name: name,
            // email: email,
            // message: message
            name: $("#name").val(),
            email: $("#email").val(),
            message: $("#message").val()

        };

        submitFriend(newFriend);

    })

    function submitFriend(friend) {

        $.post("/api/friends", friend, function () {
            const first = friend.name.split(" ");
            const firstName = first[0];

            $("#response").text("Thanks, " + firstName).css({ color: "green" });
            $("#name").val("");
            $("#email").val("");
            $("#message").val("");

        });
    }

    $("#check").on("click", function (event) {
        event.preventDefault();
        var input = $("#original").val();
        var regEx = /[^A-Za-z]/g;
        if (!input || regEx.test(input)) {
            $("#confirm").text("Invalid entry").css({ color: "red" });
        } else {
            palindrome(input);
        }
    })

    function palindrome(string) {
        

        var date = new Date();
        date = moment(date).format("MMMM Do YYYY, h:mm:ss a");
        var original = string.toLowerCase();
        var reverse = original.split('').reverse().join('');
        if (reverse === original) {
            $("#confirm").text("YES, " + original + " is a palindrome!").css({ color: "green" });

            var newPalindrome = {
                palindrome: original,
                date: date
            };

            // let unique = [...new Set(original.slice(''))];

            // if (unique.length < 2) {
            //     // $("#bad-palindrome").show();
            //     $("#bad-palindrome").text("  Albeit, not a very complex one...")
            // } else {
            //     $("#bad-palindrome").text(" ");
            // }
            
            $.post("/api/palindromes", newPalindrome, function (data) {
                // console.log(data);
                // $("#longest").text(data).css({color: "navy"});
                // $("#hide").show();
            })

            // newestPalindrome();
            getPalindromes();
        } else {
            $("#confirm").text("NOPE, " + original + " is not a palindrome!").css({ color: "red" });
            $("#bad-palindrome").hide(" ");
        }

        let unique = [...new Set(original.slice(''))];

        if (unique.length < 2) {
            $("#bad-palindrome").show();
            $("#bad-palindrome").text("  Albeit, not a very complex one...")
        } else {
            $("#bad-palindrome").text(" ");
        }

    };

    // function newestPalindrome() {
    //     $.get("/api/palindromes", function (data) {
    //         $("#most-recent").prepend("'" + data[data.length-1].palindrome + "' ");
    //     })
    // }

    function getPalindromes() {

        $.get("/api/top", function(top) {
            var date = new Date();   
            date = moment(date).format("MMMM Do YYYY, h:mm:ss a");
            console.log(date);
            $("#longest").text(top).css({color: "navy"})
            $("#created-on").text(date).css({color: "navy"})
        })

        $.get("/api/palindromes", function (data) {
            $("#most-recent").empty();

            if (data.length < 5) {
                $("#most-recent").text("");
            } else {
                for (var i = (data.length - 5); i < data.length; i++) {
                    $("#most-recent").prepend("'" + data[i].palindrome + "' ");
                }
            }

        })
    }

    // function clearPalindromes(event) {

    //     event.preventDefault();
    //     $.ajax({ url: "/api/clear", method: "POST" }).then(function() {
    //       $("#confirm").empty();
    //       $("#most-recent").empty();
    //       $("#longest").empty();
    //     });
    //   }
    
    //   $("#clear").on("click", clearPalindromes);

})


