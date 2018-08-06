var express = require('express'),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    seedDB = require("./seeds")
    
mongoose.connect("mongodb://localhost/yelp_camp_v4");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");  
    
seedDB();


app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
        //Get campground from db
        
        Campground.find({}, function(err,allCampgrounds){
           if(err){
               console.log(err);
           } else {
              res.render("campgrounds/index", {campgrounds:allCampgrounds});
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
   res.render("campgrounds/new"); 
});

//Show- shows more info about one campground
app.get("/campgrounds/:id", function(req,res){
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

//====================================
// COMMENT ROUTES
//====================================

app.get("/campgrounds/:id/comments/new", function(req,res){
    //find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
    }
})
});

app.post("/campgrounds/:id/comments", function(req, res){
    //lookout campground using ID
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/camppgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
    //create a new comment
    //connect new comment to campground
    //redirect campground showpage
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCampServer has Started!");
})