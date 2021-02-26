var divCars=document.getElementsByClassName("carlist");
        console.log(localStorage.cars);
        var jsonCars=JSON.parse(localStorage.cars);
        jsonCars.sort(function(a, b){
          var x = a.name.toLowerCase();
          var y = b.name.toLowerCase();
          if (x < y) {return -1;}
          if (x > y) {return 1;}
          return 0;
        });
        jsonCars.forEach(setValue);
        
        
        function setValue(car,index,array){
            console.log(car.name);
            var divCar=document.createElement("div");
            var cardata=document.createElement("div");
            var imgbx=document.createElement("div");
            var img=document.createElement("img");
            var carname=document.createElement("header")
            var table=document.createElement("table");
            var h3=document.createElement("h3");
            var span=document.createElement("span");
            var sub=document.createElement("sub");
            
            var tr=[],th=[],td=[];
            for (var i=0;i<5;i++){
                tr[i]=document.createElement("tr");
                th[i]=document.createElement("th");
                td[i]=document.createElement("td");
                tr[i].appendChild(th[i]);tr[i].appendChild(td[i]);
                table.appendChild(tr[i]);
                
            }
            
            
            divCar.className="car";
            cardata.className="car-data";
            imgbx.className="image-box";
            
            img.setAttribute("src",car.img);
            carname.textContent=car.name;
            
            th[0].textContent="Milage(upto):";
            td[0].textContent=car.milage+" kmpl";
            
            th[1].textContent="Engine(upto):";
            td[1].textContent=car.engine+" cc";
            
            th[2].textContent="BHP:";
            td[2].textContent=car.bhp;
            
            th[3].textContent="Transmission:";
            td[3].textContent=car.transmission;
            
            th[4].textContent="Seats:";
            td[4].textContent=car.seats;
            
            span.textContent=car.rent+"$";
            sub.textContent=" per hour";
            h3.appendChild(span);
            h3.appendChild(sub);
            
            divCar.appendChild(carname);
            imgbx.appendChild(img);
            cardata.appendChild(imgbx);
            cardata.appendChild(table);
            cardata.appendChild(h3);
            divCar.appendChild(cardata);
            
            divCar.setAttribute("style","display:none")
            document.getElementsByClassName("cars")[0].appendChild(divCar);
            
        
        }