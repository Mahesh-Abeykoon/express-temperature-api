const express = require("express");
const https = require("https");

const bodyParser = require("body-parser");

const app = express();
var port = 5002;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req, res){
    res.sendFile(__dirname + "/index.html")
    
})

app.post("/", function(req, res){
    
    const city = req.body.cityName;
    const apiKey = "104bd1d6662e615d5091b5f85fe6e4f8";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid="+apiKey;

    https.get(url, function(resp){
        console.log(resp); 

        resp.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
    
            res.write("Weather is currently "+ weatherDescription)
            res.write(". The temparture in " +city+ "is "+temp);
            res.write("<img src=" + imageURL + ">");
            res.send();
        })
    })
})


app.listen(port, function(){
    console.log("Server is Running on port: "+ port );
})







// const express = require("express");
// const https = require("https");

// const app = express();
// var port = 5002;


// app.get("/",function(req, res){

//     const query = "London";
//     const apiKey = "104bd1d6662e615d5091b5f85fe6e4f8";
//     const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units=metric&appid="+apiKey;
    
//     https.get(url, function(resp){
//         console.log(resp); 

//         resp.on("data", function(data){
//             const weatherData = JSON.parse(data);
//             const temp = weatherData.main.temp
//             const weatherDescription = weatherData.weather[0].description
//             const icon = weatherData.weather[0].icon
//             const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
       
//             res.write("<h2>Weather is currently "+ weatherDescription + "</h2>")
//             res.write("<h1>The temparture is "+temp+"hb</h1>");
//             res.write("<img src=" + imageURL + ">");
//             res.write(imageURL)
//             res.send();

//                  // const myObj = {
//             //     name: "Mahesh",
//             //     age: 26,
//             //     gender: "Male"
//             // }
//             // console.log(JSON.stringify(myObj))
//         })
//     })

// })


// app.listen(port, function(){
//     console.log("Server is Running on port: "+ port );
// })