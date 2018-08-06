var express = require('express'),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    seeDB = require("./seeds")
    
    
    
seeDB();
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");




//SCHEMA SETUP

var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);


// Campground.create(
//     {
//         name: "Mountain Crazy",
//         image: "https://www.campsitephotos.com/photo/camp/65199/feature_Maplewood_State_Park-f2.jpg",
//         description: "This is a huge granite hill, no bathrooms."
//     }, function(err, campground){
//         if(err){
//             console.log(err)
//         } else {
//             console.log("Newly Created Campground: ");
//             console.log(campground);
//         }
    
        
//     });

//   var campgrounds = [
//             {name: "Salmon Creek", image: "https://www.campsitephotos.com/photo/camp/37823/feature_Bullards_Beach_State_Park-f2.jpg"},
//             {name: "Mountain Crazy", image: "https://www.campsitephotos.com/photo/camp/65199/feature_Maplewood_State_Park-f2.jpg"},
//             {name: "Barragem Alqueva", image: "https://www.campsitephotos.com/photo/camp/26374/feature_Chippokes-f3.jpg"},
//             {name: "Salmon Creek", image: "https://www.campsitephotos.com/photo/camp/37823/feature_Bullards_Beach_State_Park-f2.jpg"},
//             {name: "Mountain Crazy", image: "https://www.campsitephotos.com/photo/camp/65199/feature_Maplewood_State_Park-f2.jpg"},
//             {name: "Barragem Alqueva", image: "https://www.campsitephotos.com/photo/camp/26374/feature_Chippokes-f3.jpg"},
//             {name: "Salmon Creek", image: "https://www.campsitephotos.com/photo/camp/37823/feature_Bullards_Beach_State_Park-f2.jpg"},
//             {name: "Mountain Crazy", image: "https://www.campsitephotos.com/photo/camp/65199/feature_Maplewood_State_Park-f2.jpg"},
//             {name: "Barragem Alqueva", image: "https://www.campsitephotos.com/photo/camp/26374/feature_Chippokes-f3.jpg"},
//         ];

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
        //Get campground from db
        
        Campground.find({}, function(err,allCampgrounds){
           if(err){
               console.log(err);
           } else {
              res.render("index", {campgrounds:allCampgrounds});
           }
        });
        
        
});

app.post("/campgrounds", function(req, res){
   console.log(req.body);
   //get data from form and add to campground array
   var name = req.body.name;
   var image = req.body.image;
   var desc = req.body.description;
   var newCampground = {name: name, image: image, description: desc}
    //Create new campground and save to Database
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
   
});

//NEW - Show form to create new campground

app.get("/campgrounds/new", function(req,res){
   res.render("new.ejs"); 
});

//Show- shows more info about one campground
app.get("/campgrounds/:id", function(req,res){
    //find the campground with provided ID
    Campground.findById(req.params.id, function(err, foundCampground){
       if(err){
           console.log(err);
       } else {
           //render show template with that campground
           res.render("show", {campground:foundCampground});
       }
    });
    
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCampServer has Started!")
})