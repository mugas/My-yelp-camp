var moongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data =[
      {
        name : "Camp on Fire",
        image : "https://www.campsitephotos.com/photo/camp/4751/Joshua_Tree_National_Park_Indian_Cove_005.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      },
      {
        name : "Camp on water",
        image : "https://www.campsitephotos.com/photo/camp/26705/Hopeville_Pond_002.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      },    
      {
        name : "Camp on field",
        image : "https://www.campsitephotos.com/photo/camp/15802/Boulder_Basin_017.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
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
