"use strict"
$(function () {
    //form submit event
    $("form").submit(function () {
        //exception handling
        try {
            //password text field
            var pass = $("#pass");
            //retype password text field
            var repass = $("#repass")
            //alert("submitting");
            //checks password is it same or not
            if (!checkPassword(pass.val(), repass.val())) {
                alert("Password does not match");
                return false

            } else {
                //userReg will return user with details which user provided in the registration page
                var user = userReg();
                //print user details in string form in console
                console.log(JSON.stringify(user));
                //                        localStorage.removeItem("users");
                //                        console.log(localStorage.users);
                //localhost users will be checked.. if there are not users registered before then this user would be the first one.
                if (localStorage.users == null || localStorage.users == undefined || localStorage.users == "[]") {
                    //create an array of users
                    var users = [];
                    //push the current user object
                    users.push(user);
                    //console.log(users);
                    //stores into users key in json string form
                    localStorage["users"] = JSON.stringify(users);
                    alert("You Have Successfully Signed up!!!");
                    return true;
                } else {//if localstorage already have some users registered.. then new user details have to appended
                        
                    console.log("else");
                    //                            console.log(localStorage.users);
                    //ger all users in string form
                    var allUsers = localStorage.users;
                    //converts into object
                    allUsers = JSON.parse(allUsers);
                    var userFound = false;
                    //checks if user is registering with same id used previously
                    allUsers.forEach(function (v, v1) {

                        if (checkEmailUsed(v.uid, user.uid)) {//checks email id is same or not
                            userFound = true;
                        }
                    })
                    //if user found, can not get registered
                    if (userFound) {
                        alert("This Email is already registered");
                    } else {//new user
                        allUsers.push(user);//push new user to existing users
                        //                            console.log("all user "+JSON.stringify(allUsers));
                        //store users in string form
                        localStorage.users = JSON.stringify(allUsers);
                        
                        alert("You Have Successfully Signed up!!!");
                        return true;
                    }


                }
                return false;
            }
        } catch (err) {
            console.log(err);
        }
        return false;
    });
    $(".signupWindow").animate({marginTop:"5%"},1200);
});
//this method will check password and retype password text are return true if both are same. but if they are not match, it will return false
var checkPassword = (pass, retype) => pass == retype;
//this method will check email ids in case sensitive mode.
var checkEmailUsed = (v, uid) => v.toLowerCase() == uid.toLowerCase();
//generate an object of user and returns it
function userReg() {
    //get value from textboxes and saves into object
    var user = {
        uname: $("#username").val(),
        uid: $("#email").val(),
        upin: $("#pin").val(),
        ucity: $("#city").val(),
        umobile: $("#phno").val(),
        upass: $("#pass").val(),
        ueligible: false

    }
    //return created object...
    return user;
}
