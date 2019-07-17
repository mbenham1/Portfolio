$(document).ready(function () {
    $(".test").hide();

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
            $("#bad-palindrome").text(" ");
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

            let unique = [...new Set(original.slice(''))];

            if (unique.length < 2) {
                $("#bad-palindrome").show();
                $("#bad-palindrome").text("  (though not a very complex one...)")
            } else {
                $("#bad-palindrome").text(" ");
            }
            
            $.post("/api/palindromes", newPalindrome, function (data) {
                console.log("Sent");
                // $("#longest").text(data).css({color: "navy"});
                // $("#hide").show();
            })

            // newestPalindrome();
            getPalindromes();
        } else {
            $("#confirm").text("NOPE, " + original + " is not a palindrome!").css({ color: "red" });
            $("#bad-palindrome").text(" ");
        }

    };

    // function newestPalindrome() {
    //     $.get("/api/palindromes", function (data) {
    //         $("#most-recent").prepend("'" + data[data.length-1].palindrome + "' ");
    //     })
    // }

    function getPalindromes() {

        $.get("/api/top", function(data) {
            console.log(data);
            $("#longest").text(data.palindrome).css({color: "navy"})
            $("#created-on").text(data.date).css({color: "navy"})
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

    $(".carousel-influence").on("click", function(event) {
        const whom = $(this).attr("data-id");
        console.log(whom);
        wikipediaPreview(whom);
    })

    function wikipediaPreview(influence) {
        const queryUrl = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${influence}&limit=3&format=json&origin=*`
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function (response) {
            $(".test").show("slow");
            const responseTitle = response[1][0];
            const responseText = response[2][0];
            const responseLink = response[3][0];
            $("#link").attr("href", responseLink);
            $("#wiki-name").text(responseTitle);
            $("#wiki-text").text(responseText);
            $("#wiki-link").text(responseLink);
            // console.log(response[1][0]);
            // console.log(response[2][0]);
            // console.log(response[3][0]);
            $("body").on("click", function(event){
                $(".test").hide("slow");
            })
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


