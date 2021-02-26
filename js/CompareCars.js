let selectedIndex = 0;
var selectionOne;
var selectionTwo;
var divCars = document.getElementsByClassName("carlist");
console.log(localStorage.cars);
var jsonCars = JSON.parse(localStorage.cars);
//setting value in the html objects for each cars
jsonCars.forEach(setValue);

function setValue(car, index, array) {
    console.log(car.name);
    //creating dom objects
    var divCar = document.createElement("div");
    var cardata = document.createElement("div");
    var imgbx = document.createElement("div");
    var img = document.createElement("img");
    var carname = document.createElement("label")
    var table = document.createElement("table");
    var h3 = document.createElement("h3");
    var span = document.createElement("span");
    var sub = document.createElement("sub");
    //array for table's rows headers and data
    var tr = [],
        th = [],
        td = [];
    //creating table
    for (var i = 0; i < 5; i++) {
        tr[i] = document.createElement("tr");
        th[i] = document.createElement("th");
        td[i] = document.createElement("td");
        tr[i].appendChild(th[i]);
        tr[i].appendChild(td[i]);
        table.appendChild(tr[i]);

    }

    //adding class to have css applied in it
    divCar.className = "car";
    cardata.className = "car-data";
    imgbx.className = "image-box";

    img.setAttribute("src", car.img);

    carname.textContent = car.name;

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

    span.textContent = car.rent + "$";
    sub.textContent = " per hour";
    h3.appendChild(span);
    h3.appendChild(sub);

    divCar.appendChild(carname);
    imgbx.appendChild(img);
    cardata.appendChild(imgbx);
    cardata.appendChild(table);
    cardata.appendChild(h3);
    divCar.appendChild(cardata);
    //click method for div car
    divCar.onclick = function () {//on click the data will be transfer to compare window divs and comparing of cars will algo will be applied
        //selected car data will be stored in this array
        var selectedCarData = [];
        //                alert("clicked!!!");
        //                alert($(this).children().length);
        selectedCarData.push($(this).find("label")[0].innerHTML); //car name
        selectedCarData.push($(this).children("div.car-data").find("img")[0].src);
        const innerTable = $(this).children("div.car-data").children("table");
        const innerRows = innerTable.children("tr");

        var inntd = innerRows.find("td");

        
        for (var value of inntd) {
            //                    console.log(value.innerHTML);
            selectedCarData.push(value.innerHTML);
        }
        //                console.log($(this).children("div.car-data").find("span")[0].innerHTML);
        selectedCarData.push($(this).children("div.car-data").find("span")[0].innerHTML);
        console.log(selectedCarData);
        var locc,locc2;
        //if selected index is 0 then selected car will be placed into first div of compare car else place into second div
        if (selectedIndex == 0) {
            selectionOne = $(this);
            //first div of compare car divs
            locc = $(this).parent().siblings("div.compareWindow").children("div.compareCar:first").children();
            //second div of compare car divs
            locc2 = $(this).parent().siblings("div.compareWindow").children("div.compareCar:last").children();
            
            selectedIndex++;
        } else {
            
            selectionTwo = $(this);
            //second div of compare car divs
            locc = $(this).parent().siblings("div.compareWindow").children("div.compareCar:last").children();
            //first div of compare car divs
            locc2 = $(this).parent().siblings("div.compareWindow").children("div.compareCar:first").children();

            selectedIndex = 0;
        }
        console.log(locc);
        //after fading out the function will be called to set values n compare 2 cars
        locc.fadeOut(2000,function(){
            //set text of h3 the name of car
            locc.first().find("h3").text(selectedCarData[0]);
            //set image resource
            locc[1].src = selectedCarData[1];
            //table
            var compareTable = locc.last();
            console.log(compareTable);
            let ir = compareTable.children();
            console.log(ir);
            var inntd = ir.find("td");

            var k = 2;
            for (var value of inntd) {//table tds to set value
                console.log(value.innerHTML);
                value.innerHTML = selectedCarData[k];
                k++;

                value.classList.remove("green");
                value.classList.remove("red");
            }
            var compareTable2 = locc2.last();//table of another compare div
            console.log(compareTable2);
            let ir2 = compareTable2.children();
            console.log(ir2);
            var inntd2 = ir2.find("td");
            //set values of cars
            var mil1=inntd[0].innerHTML.replace("kmpl",'').trim();
            var mil2=inntd2[0].innerHTML.replace("kmpl",'').trim();

            var en1=inntd[1].innerHTML.replace("cc",'').trim();
            var en2=inntd2[1].innerHTML.replace("cc",'').trim();

            var bhp1=inntd[2].innerHTML.trim();
            var bhp2=inntd2[2].innerHTML.trim();

            var tra1=inntd[3].innerHTML.trim();
            var tra2=inntd2[3].innerHTML.trim();

            var s1=inntd[4].innerHTML.trim();
            var s2=inntd2[4].innerHTML.trim();

            var r1=inntd[5].innerHTML.replace("$",'').trim();
            var r2=inntd2[5].innerHTML.replace("$",'').trim();
            
            //comparing cars values and set colors of it accordingly
            inntd2.each(function(){
                this.classList.remove("green");
            this.classList.remove("red");
            })
            if(Number(mil1)<Number(mil2)){
                inntd2[0].classList.add("green");
                inntd[0].classList.add("red");
            }else if(Number(mil1)>Number(mil2)){
                inntd2[0].classList.add("red");
                inntd[0].classList.add("green");
            }
            if(Number(en1)<Number(en2)){
                inntd2[1].classList.add("green");
                inntd[1].classList.add("red");
            }else if (Number(en1)>Number(en2)){
                inntd2[1].classList.add("red");
                inntd[1].classList.add("green");
            }
            if(Number(bhp1)<Number(bhp2)){
                inntd2[2].classList.add("green");
                inntd[2].classList.add("red");
            }else if(Number(bhp1)>Number(bhp2)){
                inntd2[2].classList.add("red");
                inntd[2].classList.add("green");
            }
            if(tra1!=tra2){
                if(tra1=="Manual"){
                    inntd2[3].classList.add("green");
                    inntd[3].classList.add("red");
                }else if(tra2=="Manual"){
                    inntd2[3].classList.add("red");
                    inntd[3].classList.add("green");

                }
            }
            if(Number(s1)<Number(s2)){
                inntd2[4].classList.add("green");
                inntd[4].classList.add("red");
            }else if(Number(s1)>Number(s2)){
                inntd2[4].classList.add("red");
                inntd[4].classList.add("green");
            }
            if(Number(r1)<Number(r2)){
                inntd2[5].classList.add("red");
                inntd[5].classList.add("green");
            }else if(Number(r1)>Number(r2)){
                inntd2[5].classList.add("green");
                inntd[5].classList.add("red");
            }
            console.log(mil1);

        });
        //fade in after fading out
        locc.fadeIn(2000);
        
    }
    
    document.getElementsByClassName("carList")[0].appendChild(divCar);

}
