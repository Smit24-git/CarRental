$(function () {
    //when form is getting submitted
    $("form").submit(function () {
        if ($("#admin").is(":checked")) { //admin login
            alert("Admin login is not implemented yet!!!")
        } else {
            //get value from username text
            var uid = $("#username").val();
            //get value from password text
            var password = $("#password").val();
            //get all users
            var allUsers = getUsers();
            //if theres no users registered yet!
            if (allUsers == null) {
                alert("User not found");
            } else {
                //console the user to see how many users are there
                console.log(allUsers);
                //setting flags
                var isIDFound = false;
                var isPasswordCorrected = false;
                allUsers.forEach(function (value) {//function for each users
                    //compare username with users
                    if (uid.trim().toLowerCase() == value.uid.trim().toLowerCase()) {
                        isIDFound = true;
                        //compare input password with user password
                        if (password == value.upass) {
                            isPasswordCorrected = true;
                            localStorage["login"] = JSON.stringify(value);
                        }
                    }
                });
                //if both found
                if (isIDFound && isPasswordCorrected) {
                    alert("Welcome...")


                    return true;
                } else {
                    
                    alert("Username Or Password Incorrect.")
                }
            }

        }

        return false;
    });
    $(".loginWindow").animate({marginTop:"5%"},1000);//animate the login window when documet gets ready
    
});
//returns all users stored in localstorage
function getUsers() {
    var allUsers = localStorage.users;
    if (allUsers == null || allUsers == undefined || allUsers == "[]")
        return null;
    return JSON.parse(allUsers);
}
