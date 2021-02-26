//if localstorage does not have cars information then and only then add cars information into it
if(localStorage.car==null || localStorage.car== undefined || localStorage.car=="[]"){
    //array of cars which will hold object of car
    var cars = []
    //assigning object in car index 0
    cars[0] = {
        name: "Maruti Swift",
        milage: 21.21,
        engine: 1197,
        bhp: 81.8,
        transmission: "Manual/Automatic",
        seats: 5,
        img: "../images/cars/swift_maruti.webp",
        rent: 15,
        status: "Available"
    }
    //assigning object in car index 1
     cars[1] = {
        name: "Chevrolet Impala",
        milage: 21.21,
        engine: 1197,
        bhp: 81.8,
        transmission: "Manual/Automatic",
        seats: 5,
        img: "../images/cars/impala.webp",
        rent: 17,
        status: "Available"
    }
    //assigning object in car index 2
    cars[2] = {
        name: "Lincoln MKZ",
        milage: 21.21,
        engine: 1197,
        bhp: 81.8,
        transmission: "Manual/Automatic",
        seats: 5,
        img: "../images/cars/Lincoln.jpg",
        rent: 22,
        status: "Available"
    }
    //assigning object in car index 3
     cars[3] = {
        name: "Chrysler 300",
        milage: 21.21,
        engine: 1197,
        bhp: 81.8,
        transmission: "Manual/Automatic",
        seats: 5,
        img: "../images/cars/Chrysler.jpg",
        rent: 40,
        status: "Available"
    }
    //assigning object in car index 4
     cars[4] = {
        name: "Dodge Charger",
        milage: 21.21,
        engine: 1197,
        bhp: 81.8,
        transmission: "Manual/Automatic",
        seats: 5,
        img: "../images/cars/DodgeCharger.jpg",
        rent: 25,
        status: "Available"
    }
    //assigning object in car index 5
    cars[5] = {
        name: "Buick LaCrosse",
        milage: 21.21,
        engine: 1197,
        bhp: 81.8,
        transmission: "Manual/Automatic",
        seats: 5,
        img: "../images/cars/BuickLaCrosse.jpg",
        rent: 20,
        status: "Available"
    }
    
            
    //assigning object in car index 6      
    cars[6] = {
        name: "Audi A6",
        milage: 20,
        engine: 1300,
        bhp: 85.8,
        transmission: "Automatic",
        seats: 5,
        img: "../images/cars/AudiA6.jpg",
        rent: 19,
        status: "Booked"
    }
    //assigning object in car index 7
    cars[7] = {
        name: "Kia Cadenza",
        milage: 15,
        engine: 1200,
        bhp: 90.8,
        transmission: "Manual/Automatic",
        seats: 5,
        img: "../images/cars/kia-cadenza.jpg",
        rent: 22,
        status: "Available"
    }
    //cars is in array form so it needs to be converted to string format in order to store in local storage
    //json.stringfy will convert object into string and then it will be stored as value of the key car in localstorage
    localStorage.cars = JSON.stringify(cars);
}
