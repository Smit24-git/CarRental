var isCar = false; //checks car is on road or not
var isEngineStart = false; // if engine is started-true else false
var speed; //store car's speed
var starttime, stoptime, timepassed, timetaken; // all variables to store timeline so that start stop resume and finish conditions can be stored
var isRunning = false; //checks if care is running or not
var kidOnRoad = false; //true if kid shows on road
var carPassed = false; //car crosses the kid's postion or not
var passed = true; //result
var kidGone = false; //kid is still on the road or not
$(document).ready(function () { //on ready
    var kidPositionLeft = 300 + parseInt(Math.random() * ($(".frm").width() - 400)); //randomize kid's position
    console.log(kidPositionLeft);
    $("#kid").css("left", kidPositionLeft + "px") //set position

    var v = setInterval(checkKid, 100) //after every 0.1 seconds, condition on kid will be checked (Very attemptive Instructor)
    function checkKid() {
        carPos = $("#car").css("left").slice(0, $("#car").css("left").length - 2); //gets car's position
        console.log(carPos);
        //checks if kid is on the road or not and car is near the kid or not 
        //if car is near the kid.. kid will appear on the road
        if (carPos >= kidPositionLeft - 300 && kidOnRoad == false && carPassed == false && !kidGone) {
            $("#kid").show(); //show the kid
            kidOnRoad = true;
            console.log("In Range");
            //after 3 seconds, kid will be disappeared
            setTimeout(function () {
                $("#kid").hide(); //hide the kid
                kidOnRoad = false;
                kidGone = true;
                clearInterval(v); //clear interval stops the iterations
            }, 3000);
        }
        //when kid is on the road and car is not passed
        if (kidOnRoad == true && carPassed == false) {
            //if position of car and kid collied
            if (carPos > kidPositionLeft - 120 && carPassed == false && kidOnRoad == true) {
                alert("You Met an accident");
                kidOnRoad = false;
                carPassed = true;
                console.log("K" + kidPositionLeft)
                console.log("C" + carPos)
                console.log("accident");
                passed = false;
                clearInterval(v); //clear interval stops the iterations
            }

        }
    }
    //shows the car
    $("#show").on("click", function () {
        if(localStorage["login"]==null){//if user is not logged in.. to run the game he ill have to logged himself first
            alert("Login First!");
            return;
        }
        $("#car").show();//displays the car
        $(this).css("backgroundColor","green");//change the color of button
        $(this).css("color","white");//text color to be changed
        $(this).attr("disabled","disabled");//disabled the button
        $("#fade").show(1000);//show the next button
        $("#car").fadeTo(0, 0.7);//fade the car to .7
        isCar = true;//flag the car object

    });
    //expand the size of car
    $("#car").mouseenter(function () {
        $(this).animate({
            height: '150px',
            width: '250px'
        });
    });
    //reset the size of car
    $("#car").mouseleave(function () {
        $(this).animate({
            height: '100px',
            width: '200px'
        });
    });
    //start the engine.. fade to 100%
    $("#fade").on("click", function () {
        if (!isCar) {//if car is not selected prompt to get the car first
            alert("Please Get The Car First!")
            return;
        }
        $("#car").fadeTo(1000, 1);//fade car to 1
        $(this).css("backgroundColor","green");//set background color of the fade button to green
        $(this).css("color","white");//set text color to white
        $(this).attr("disabled","disabled");// dosabled the button
        $("#run").show(1000);//show the next button
        isEngineStart = true;//engine start flag to true

    });
    //drive
    $("#run").click(function () {
        
//        speed = $("#secs").val() //speed
        
        
        if (!isEngineStart) { //engine must running
            alert("Start the car first...")
            return;
        }
        var loop=false;
        do{//loops untill desired input is given
            loop=false;
            speed = prompt("Please Enter Speed!(4-15)");
            if(isNaN(speed)){//if entered value is not a number then ask them to input again
                alert("Not a number");
                loop=true;
            }
            if (speed != null && (speed < 4 || speed > 15)){ //checks for valid speed
                alert("Speed Must be between 4 and 15");
                loop=true;
            //return;
            }
        }while(loop);
        //if speed is not specified(when user choose to cancel the input prompt), stop the execution and return the function
        if(speed==null)
            return;
        $(this).css("backgroundColor","green");//change bacground color of the button to green
        $(this).css("color","white");//set text color to white
        $(this).attr("disabled","disabled");//disabled to button 
        if (isRunning) { //car is already running
            alert("car is already running")
            return;
        }
        $("#stop").show(1000) //show button
        $("#restart").show(1000) //show button
        starttime = jQuery.now(); //get current time and store it into a start time
        var car = $("#car"); //car img

        isRunning = true;
        //animate the car from left to right direction 
        car.animate({
            left: $(".frm").width() - car.width()
        }, speed * 1000, function () {
            alert("You've reached your destination!!!")
            timetaken = (jQuery.now() - starttime) * 0.001; //count
            alert("Time Taken:" + timetaken); //prompt
            $("#flip").show(1000); //shows board
            $(".ctrls").hide(1000);
            $("#retake").show(1000);
        });
    });
    $("#stop").click(function () { //on stop click

        if (!isRunning) { //if car is already stopped
            alert("car is already stopped")
            return;
        }
        stoptime = jQuery.now(); //stop time
        console.log(starttime)
        console.log(stoptime)
        timepassed = (stoptime - starttime) * 0.001; //count time passed till now

        var car = $("#car");
        //var speed=$("#secs").val()
        car.stop() //stop the animation
        isRunning = false;

    });
    $("#restart").click(function () { //restart the car

        if (isRunning) { //car is already running
            alert("car is already running")
            return;
        }
        var car = $("#car");
        //var speed=$("#secs").val()

        let distance = $("#car").css("left").slice(0, $("#car").css("left").length - 2); //get distance travelled
        let remainingDistance = $(".frm").width() - distance; //distance remained
        let final = remainingDistance * timepassed / distance; //time required(Not accurate)
        let fullDistance = $(".frm").width(); //total distance
        console.log("--")
        console.log(distance);
        console.log(remainingDistance);
        console.log(final);

        var actualTimeLine = distance * speed / fullDistance; //actual time spend if car is not getting stopped
        console.log("Actual TIme:" + actualTimeLine)
        isRunning = true;
        //starts the animation again.. but from the previous postion, not from the begining
        car.animate({
            left: $(".frm").width() - car.width()
        }, (speed - actualTimeLine) * 1000, function () {
            alert("You've reached your destination!!!");
            timetaken = (jQuery.now() - starttime) * 0.001;
            alert("Time Taken:" + timetaken);
            $("#flip").show();
            $(".ctrls").hide();
            $("#retake").show();
        });

    });
    //shows passed or failed text with slide down animation
    $("#flip").click(function () {
        $("#panel").slideDown(5000);
        if (passed) {
            $("#panel").text("PASSED");
            $("#panel").css("color", "#7FFF00");
            var users=getUsers();
            var currentUser=JSON.parse(localStorage["login"]);
            
            for(var i=0;i< users.length;i++){
                if(users[i].uid==currentUser.uid){
                    users[i].ueligible=true;
                    localStorage["login"]=JSON.stringify(users[i]);
                    break;
                }
            }
            localStorage["users"]=JSON.stringify(users);
            console.log(localStorage.users);
            
        } else {
            $("#panel").text("FAILED");
            $("#panel").css("color", "RED");
            var users=getUsers();
            var currentUser=JSON.parse(localStorage["login"]);
            for(var i=0;i< users.length;i++){
                if(users[i].uid==currentUser.uid){
                    users[i].ueligible=false;
                    localStorage["login"]=JSON.stringify(users[i]);
                    console.log("here");
                    break;
                }
            }
            localStorage["users"]=JSON.stringify(users);
            console.log(localStorage.users);
        }
        
    });
    if(localStorage["login"]!=null){
        const currentUser=JSON.parse(localStorage.login);
        if(currentUser.ueligible){
            $("#userText").text("You have already passed the exam! You can still take the test but if you'll fail this time you won't be eligible to rent a car untill you pass the exam again!");
        }
    }
//    $(".main").fadeIn(2000);
});
function getUsers() {
    var allUsers = localStorage.users;
    if (allUsers == null || allUsers == undefined || allUsers == "[]")
        return null;
    return JSON.parse(allUsers);
}