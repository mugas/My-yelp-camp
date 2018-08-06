var express = require("express");
var router = express.Router();
var Campground = require("../models/campground")

router.get("/", function(req, res){
        
        //Get campground from db
        Campground.find({}, function(err,allCampgrounds){
           if(err){
               console.log(err);
           } else {
              res.render("campgrounds/index", {campgrounds:allCampgrounds, currentUser: req.user});
           }
        });
        
        
});

router.post("/", function(req, res){
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

router.get("/new",  function(req,res){
   res.render("campgrounds/new"); 
});

//Show- shows more info about one campground
router.get("/:id", function(req,res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err){
           console.log(err);
       } else {
           console.log(foundCampground);
           //render show template with that campground
           res.render("campgrounds/show", {campground:foundCampground});
       }
    });
    
})

module.exports = router;
