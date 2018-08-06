var moongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data =[
      {
        name : "Camp on Fire",
        image : "https://www.campsitephotos.com/photo/camp/4751/Joshua_Tree_National_Park_Indian_Cove_005.jpg",
        description: "bla bla bla"
      },
      {
        name : "Camp on water",
        image : "https://www.campsitephotos.com/photo/camp/26705/Hopeville_Pond_002.jpg",
        description: "ble ble ble"
      },    
      {
        name : "Camp on field",
        image : "https://www.campsitephotos.com/photo/camp/15802/Boulder_Basin_017.jpg",
        description: "bli bli bli"
      }
      
    ]


function seedDB(){
    //Remove all Campgrounds
Campground.remove({}, function(err){
    if(err){
        console.log(err);
    }
    console.log("remove campgrounds"); 
    

    
    // add a few Campgrounds
  
    data.forEach(function(seed){
        Campground.create(seed, function(err, campground){
            if(err){
                console.log(err)
            } else {
                console.log("added a Campground");
                //create a comment
                Comment.create(
                    {text:" No internet but good",
                    author:"Homer"
                    
                }, function (err, comment){
                    if(err){
                    console.log(err);
                    } else {
                    campground.comments.push(comment._id);
                    campground.save();
                    console.log("Create New Comment");
                    }
                });
            }
        });
     
    });
  
  });    
  
  
}

module.exports = seedDB;
