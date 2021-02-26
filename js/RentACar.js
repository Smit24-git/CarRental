"use strict"
setData(getData());
showCars();
//fade in to all car divs 
function showCars(){
    $(".car").fadeIn(1000);
}  
//sort all cars according to selection user made
function sorting(sel) {
    var selectedIndex = sel.selectedIndex;
    if(selectedIndex==0){
        var e = document.getElementsByClassName("cars")[0]
        var child = e.lastElementChild;
        while (child) { //iterate through all child
            e.removeChild(child); //remove childs
            child = e.lastElementChild; //points to last element(if any)
        }
        setData(getData());
    }
    if (selectedIndex == 1) {
        var jsonCars = getData();
        jsonCars.sort(function (a, b) {//sort by name of car
            var x = a.name.toLowerCase();
            var y = b.name.toLowerCase();
            if (x < y) {
                return -1;
            }
            if (x > y) {
                return 1;
            }
            return 0;
        });
        var e = document.getElementsByClassName("cars")[0]
        var child = e.lastElementChild;
        while (child) { //iterate through all child
            e.removeChild(child); //remove childs
            child = e.lastElementChild; //points to last element(if any)
        }
        setData(jsonCars)
    } else if (selectedIndex == 2) {
        var jsonCars = getData();
        jsonCars.sort(function (a, b) {//sort by name
            var x = a.name.toLowerCase();
            var y = b.name.toLowerCase();
            if (x < y) {
                return 1;
            }
            if (x > y) {
                return -1;
            }
            return 0;
        });
        var e = document.getElementsByClassName("cars")[0]
        var child = e.lastElementChild;
        while (child) { //iterate through all child
            e.removeChild(child); //remove childs
            child = e.lastElementChild; //points to last element(if any)
        }
        setData(jsonCars)
    } else if (selectedIndex == 3) {//sort by price
        var jsonCars = getData();
        jsonCars.sort(function (a, b) {
            var x = a.rent;
            var y = b.rent;
            if (x < y) {
                return -1;
            }
            if (x > y) {
                return 1;
            }
            return 0;
        });
        var e = document.getElementsByClassName("cars")[0]
        var child = e.lastElementChild;
        while (child) { //iterate through all child
            e.removeChild(child); //remove childs
            child = e.lastElementChild; //points to last element(if any)
        }
        setData(jsonCars)
    } else if (selectedIndex == 4) {
        var jsonCars = getData();
        jsonCars.sort(function (a, b) {//sort by price
            var x = a.rent;
            var y = b.rent;
            if (x < y) {
                return 1;
            }
            if (x > y) {
                return -1;
            }
            return 0;
        });
        var e = document.getElementsByClassName("cars")[0]
        var child = e.lastElementChild;
        while (child) { //iterate through all child
            e.removeChild(child); //remove childs
            child = e.lastElementChild; //points to last element(if any)
        }
        setData(jsonCars)
    }
    showCars();
}

function getData() {
    var divCars = document.getElementsByClassName("cars");

    console.log(localStorage.cars);
    return JSON.parse(localStorage.cars);

}
//create car divs with the help of jsonCars parameter
function setData(jsonCars) {

    jsonCars.forEach(setValue);//setvaue for each car

    function setValue(car, index, array) {
        console.log(car.name);
        var divCar = document.createElement("div");
        var img = document.createElement("img");
        var h3 = document.createElement("h3")
        var table1 = document.createElement("table");
        var table2 = document.createElement("table");
        var tr = [],
            th = [],
            td = [];
        var button = document.createElement("button");
        for (var i = 0; i < 6; i++) {
            tr[i] = document.createElement("tr");
            th[i] = document.createElement("th");
            td[i] = document.createElement("td");
            tr[i].appendChild(th[i]);
            tr[i].appendChild(td[i]);
            if (i < 3) {
                table1.appendChild(tr[i]);
            } else {
                table2.appendChild(tr[i]);
            }
        }


        divCar.className = "car";

        img.setAttribute("src", car.img);

        h3.textContent = car.name;

        th[0].textContent = "Milage(upto):";
        td[0].textContent = car.milage + " kmpl";

        th[1].textContent = "Engine(upto):";
        td[1].textContent = car.engine + " cc";

        th[2].textContent = "BHP:";
        td[2].textContent = car.bhp;

        th[3].textContent = "Transmission:";
        td[3].textContent = car.transmission;

        th[4].textContent = "Seats:";
        td[4].textContent = car.seats;

        th[5].textContent = "Status:";
        td[5].textContent = car.status;
        if (car.status == "Available") {
            td[5].className = "green";
        } else if (car.status = "Booked") {
            td[5].className = "red";
        }
        button.textContent = car.rent + "$";
        button.value = car.status;
        button.onclick = function () {
            //                    alert(this.value);
            
            if(localStorage["login"]==null){
                alert("Please Login First In Order to Rent Car")
                return;
            }
            if (this.value == "Booked") {
                alert("Car is not available.");
                return;
            }
            let currUser=JSON.parse(localStorage["login"]);
            if(!currUser.ueligible){
                alert("Please Pass the driving test first!!");
                return;
            }
            document.getElementById("nav").classList.add("blur");
            document.getElementById("Wrapper").classList.add("blur");
            //                    document.getElementsByClassName("custom")[0].style.display="inherit";
            $(".custom").show(1000);
            document.getElementById("nav").style.pointerEvents = "none";
            document.getElementById("Wrapper").style.pointerEvents = "none";
            $(".custom h2").text($(this).siblings()[1].innerHTML);
            $(".custom img").attr('src', $(this).siblings()[0].src);


        }
        divCar.appendChild(img);
        divCar.appendChild(h3);
        divCar.appendChild(table1);
        divCar.appendChild(table2);
        divCar.appendChild(button);
        
        document.getElementsByClassName("cars")[0].appendChild(divCar);
        

    }
}
//hide custom div
function hideCustom() {

    document.getElementById("nav").classList.remove("blur");
    document.getElementById("Wrapper").classList.remove("blur");
    $(".custom").hide(1000);

    //                    document.getElementsByClassName("custom")[0].style.display="none";
    document.getElementById("Wrapper").style.pointerEvents = "inherit";
    document.getElementById("nav").style.pointerEvents = "inherit";
}
//confirm button of custom layout click
function confirm() {
    alert("Your request for rent this car has been sent... You'll be notifty shortly...");
    hideCustom();
}


