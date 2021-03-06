$(document).ready(function () {

    // let portfolio = [
    //     {
    //         title: "React Clicky Game",
    //         image: "./assets/img/images/clicky-game.png",
    //         link: "https://mbenham1.github.io/React-Clicky-Game/",
    //         github: "https://github.com/mbenham1/React-Clicky-Game"
    //     },
    //     {
    //         title: "Cheeriongoose",
    //         image: "./assets/img/images/cheeriongoose.png",
    //         link: "http://radiant-castle-95960.herokuapp.com/",
    //         github: "https://github.com/mbenham1/Cheeriongoose"
    //     }
    // ]

    // portfolio.forEach(function(item){

    //     $(".portfolio-items").prepend(`
    //     <li>
    //         <a href="${item.link}" target="_blank">
    //                 <span class="cover" style="background: url(${item.image}) center; background-size: cover;">
    //                      <img style="height: 200px; width: 200px" src="${item.image}" alt="${item.title}">
    //                 </span>
    //         </a>
    //         <h4 id="heading">${item.title}</h2>
    //         <a style="color: white" class="view-in-github" href="${item.github}" target="_blank"><ins class="fab fa-github"></ins> view in github</a>
    //     </li>
    // `);

    // })

    var count;

    let windowHeight = $(window).height();

    // if(windowHeight < 650) { windowHeight = 650; }

    $(".wrapper, .wrapper-1").height(windowHeight);

    $('a').not('a[id=no-blank]').attr('target','_blank');

    new Typed('.message', {
        strings: ["Welcome^1200", "Bienvenidos^1200", "Wilkommen^1200", "Bienvenue^1200", "欢迎^1200", "Добро пожаловать^1200"],
        typeSpeed: 50,
        backSpeed: 10,
        cursorChar: '|',
        loop: true
    });

    new Typed('.technologies', {
        strings: ["HTML^1200", "CSS^1200", "Bootstrap^1200", "Javascript^1200", "jQuery^1200", "Node^1200", "Express^1200", "MySQL^1200", "Sequelize^1200", "MongoDB^1200", "Mongoose^1200", "Heroku^1200", "React^1200", "AWS Amplify^1200"],
        typeSpeed: 50,
        backSpeed: 0,
        cursorChar: '|',
        loop: true
    });

    $('.nav-link').on("click", function () {
        $('.nav-link').removeClass('active');
        $(this).addClass('active');
    });

    $(".scrollTo").on("click",function(e){
        e.preventDefault();
        var target = $(this).attr('data-target');
        var pos = $('#'+target).offset().top;
      
      $('html, body').animate({ scrollTop: pos }, 200);
          return false;
    });

    $(window).scroll(function () {
        onScrollHandle();
    });
    
    function onScrollHandle() {
        //Get current scroll position
        var currentScrollPos = $(document).scrollTop() + 2;
        //Iterate through all node
        $('#navbarResponsive > ul > li > a.scrollTo').each(function () {
            var curLink = $(this);
            var refElem = $(curLink.attr('href'));
            //Compare the value of current position and the every section position in each scroll
            if (refElem.position().top <= currentScrollPos && refElem.position().top + refElem.height() > currentScrollPos) {
                //Remove class active in all nav
                $('#navbarResponsive > ul > li > a').removeClass("active");
                //Add class active
                curLink.parent().addClass("active").css({'border-bottom': '3px solid gold'});
            }
            else {
                curLink.parent().removeClass("active").css({border: 'none'});
            }
        });
    }

    // $(window).resize(function() {
    //     windowHeight = $(window).height();
    //     if(windowHeight < 650) { windowHeight = 650; }
    //     $(".wrapper, .wrapper-1").height(windowHeight);
    // });

    // $(window).scroll(function () {
    //     var s = $(window).scrollTop(),
    //           d = $(document).height(),
    //           c = $(window).height();
    //           scrollPercent = (s / (d-c)) * 100;
    //           var position = scrollPercent;
      
    //      $(".bar").attr('value', position);
      
    //   });

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
        sendMail(newFriend);

    })

    function sendMail(sub) {
        // console.log(sub);
        window.open(`mailto:michaelbenham89@gmail.com?subject=Hello, Michael!&body=Nice site!%0D%0A%0D%0A${sub.name}`);
    }

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
        var regEx = /[^A-Za-z ]/g;
        if (!input.replace(/\s/g, '').length) {
            $("#confirm").text('Entry only contains whitespace').css({ color: "black" });
            $("#bad-palindrome").text("");
            clearInterval(count);
            return
        }
        if (!input || regEx.test(input)) {
            $("#confirm").text("Invalid entry").css({ color: "red" });
            $("#bad-palindrome").text(" ");
            clearInterval(count);
            return 
        } else {
            palindrome(input);
        }
    })

    function palindrome(string) {

        clearInterval(count);
        count = setInterval(function(){
            $("#confirm").text(" ");
            $("#bad-palindrome").text(" ");
        }, 3000)

        var date = new Date();
        date = moment(date).format("MMMM Do YYYY, h:mm:ss a");
        var original = string.toLowerCase().replace(/\s/g, '');
        var reverse = original.split('').reverse().join('');
        if (reverse === original) {
            $("#confirm").text("YES, " + string + " is a palindrome!").css({ color: "green" });
            var newPalindrome = {
                palindrome: string,
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
                // console.log("Sent");
            })

            getPalindromes();
        } else {
            $("#confirm").text("NOPE, " + string + " is not a palindrome!").css({ color: "red" });
            $("#bad-palindrome").text(" ");
        }

    };

    // function newestPalindrome() {
    //     $.get("/api/palindromes", function (data) {
    //         $("#most-recent").prepend("'" + data[data.length-1].palindrome + "' ");
    //     })
    // }

    function getPalindromes() {

        $.get("/api/top", function (data) {
            // console.log(data);
            $("#longest").text(data.palindrome).css({ color: "navy" })
            $("#created-on").text(data.date).css({ color: "navy" })
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

    $(".carousel-influence").on("click", function (event) {
        const whom = $(this).attr("data-id");
        // console.log(whom);
        wikipediaPreview(whom);
    })

    function wikipediaPreview(influence) {
        const queryUrl = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${influence}&limit=3&format=json&origin=*`
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function (response) {
            $(".test").fadeIn(0);
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
            $("#remove").on("click", function (event) {
                $(".test").fadeOut(1000);
            })
        
        })
    }

})


