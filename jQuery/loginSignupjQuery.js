//checks users is logged in or not if logged in then hide login and sign up button and show the log out button and name of the logged in user
$(document).ready(function () {
    userCheck();//checks users is logged in or not.. perform action accordingly
    $("#logout").click(function () {
        localStorage.removeItem("login");//remove login from localstorage
        userCheck();//checked it again...
    });

    $(".heading header").animate({fontSize:"2.5vw"},2000);//animate header value(carsworld.com) by increasing size
});

function userCheck() {
    //if user is logged in then set the name and hide login and sign up button
    if (localStorage["login"] != null) {
        console.log(localStorage["login"]);
        var currUser = JSON.parse(localStorage["login"]);
        $(".login-button").text(currUser.uname);
        $("#login").hide();
        $("#signup").hide();
    } else {//else hide the logout button
        console.log("User not found");
        $("#logout").hide();
    }
}
