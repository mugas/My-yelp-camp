var express = require('express');
var app = express();
var bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

  var campgrounds = [
            {name: "Salmon Creek", image: "https://www.campsitephotos.com/photo/camp/37823/feature_Bullards_Beach_State_Park-f2.jpg"},
            {name: "Mountain Crazy", image: "https://www.campsitephotos.com/photo/camp/65199/feature_Maplewood_State_Park-f2.jpg"},
            {name: "Barragem Alqueva", image: "https://www.campsitephotos.com/photo/camp/26374/feature_Chippokes-f3.jpg"},
            {name: "Salmon Creek", image: "https://www.campsitephotos.com/photo/camp/37823/feature_Bullards_Beach_State_Park-f2.jpg"},
            {name: "Mountain Crazy", image: "https://www.campsitephotos.com/photo/camp/65199/feature_Maplewood_State_Park-f2.jpg"},
            {name: "Barragem Alqueva", image: "https://www.campsitephotos.com/photo/camp/26374/feature_Chippokes-f3.jpg"},
            {name: "Salmon Creek", image: "https://www.campsitephotos.com/photo/camp/37823/feature_Bullards_Beach_State_Park-f2.jpg"},
            {name: "Mountain Crazy", image: "https://www.campsitephotos.com/photo/camp/65199/feature_Maplewood_State_Park-f2.jpg"},
            {name: "Barragem Alqueva", image: "https://www.campsitephotos.com/photo/camp/26374/feature_Chippokes-f3.jpg"},
        ];

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    
        
        res.render("campgrounds", {campgrounds:campgrounds});
});

app.post("/campgrounds", function(req, res){
   
   //get data from form and add to campground array
   var name = req.body.name;
   var image = req.body.image;
   var newCampground = {name: name, image: image}
   campgrounds.push(newCampground);
   
   //redirect to campground page
   res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req,res){
   res.render("new.ejs"); 
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCampServer has Started!")
})