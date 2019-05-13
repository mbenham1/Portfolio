$(document).ready(function () {

    var name = $("#name");
    var email = $("#email");
    var message = $("#message")
    getPalindromes();

    $("#submit-form").on("click", function(event) {

        event.preventDefault();

        if (!name.val().trim() || !email.val().trim() || !message.val()) {
            $("#response").text("Please fill out all fields").css({color: "red"});
            return;
        }

        var newFriend = {

            name: name,
            email: email,
            message: message
            // name: $("#name").val(),
            // email: $("#email").val(),
            // message: $("#message").val()

        };
        
        submitFriend(newFriend);

    })

    function submitFriend(friend) {

        $.post("/api/friends", friend, function () {

            $("#response").text("Thanks, " + friend.name).css({color: "green"});
            $("#name").val("");
            $("#email").val("");
            $("#message").val("");

        });
      }

    $("#check").on("click", function (event) {
        event.preventDefault();
        var input = $("#original").val();
        var regEx = /[^A-Za-z]/g;
        input = input.replace(regEx, '');
        if (!input || regEx === false) {
            $("#confirm").text("Invalid entry").css({ color: "red"});
        } else {
            palindrome(input);
        }
    })

    function palindrome(string) {

        var original = string.toLowerCase();
        var reverse = original.split('').reverse().join('');
        if (reverse === original) {
            $("#confirm").text("YES, " + original + " is a palindrome!").css({ color: "green" });

            var newPalindrome = {
                palindrome: original
            };

            $.post("/api/palindromes", newPalindrome, function (data) {
                // console.log(data);
            })

            // newestPalindrome();
            getPalindromes();
        } else {
            $("#confirm").text("NOPE, " + original + " is not a palindrome!").css({ color: "red" });
        }

    };

    // function newestPalindrome() {
    //     $.get("/api/palindromes", function (data) {
    //         $("#most-recent").prepend("'" + data[data.length-1].palindrome + "' ");
    //     })
    // }

    function getPalindromes() {
    
        $.get("/api/palindromes", function (data) {
                $("#most-recent").empty();

                for (var i=(data.length-5); i < data.length ; i++){
                $("#most-recent").prepend("'" + data[i].palindrome + "' ");
        }
        })
    }

})


