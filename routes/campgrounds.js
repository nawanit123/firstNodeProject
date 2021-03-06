const express = require("express");
const router = express.Router();
const Campground = require("../models/campground"),
      middleware =require("../middleware");

//RETRIEVE INDEX-campgrounds page
router.get("/", async(req, res) => {
  if (req.query.search) {
    try {
      const regex = new RegExp(escapeRegex(req.query.search), 'gi');
      let allCampgrounds = await Campground.find({name:regex});
      if(allCampgrounds.length<1){
        throw "No Campgrounds match that query, Try again!";
      }
      res.render("campgrounds/index",{campgrounds:allCampgrounds});
    } catch (error) {
      req.flash("error",error);
      res.redirect("/campgrounds");
    }
  } else {
    //Get all campgrounds from DB
    Campground.find({}, (err, allCampgrounds) => {
      if (err) {
        req.flash("error","Cannot find Campground!!!!");
        req.redirect("back");
      } else {
        res.render("campgrounds/index", {
          campgrounds: allCampgrounds,
        });
      }
    });
  }
  
});

//NEW Campground form
router.get("/new", middleware.isLoggedIn, (req, res) => {
  res.render("campgrounds/new");
});

//CREATE - Adding new Campground logic
router.post("/", middleware.isLoggedIn, (req, res) => {
  const name = req.body.name;
  const price = req.body.price;
  const image = req.body.image;
  const description = req.body.description;
  const author = {
    id: req.user._id,
    username: req.user.username
  };
  const newCampgrounds = {
    name: name,
    price:price,
    image: image,
    description: description,
    author: author
  };
  // Create a new campground
  Campground.create(newCampgrounds, (err, newlyCreated) => {
    if (err) {
      console.log(err);
    } else {
      req.flash("success","Successfully created Campgrond!!");
      res.redirect("/campgrounds");
    }
  });
});

//SHOW a campground
router.get("/:id", (req, res) => {
  Campground.findById(req.params.id)
    .populate("comments")
    .exec((err, foundCampground) => {
      if (err) {
        console.log(err);
      } else {
        res.render("campgrounds/show", { campground: foundCampground });
      }
    });
});

//Edit Campground
router.get("/:id/edit",middleware.checkCampgroundOwnership,async(req,res)=>{
  
      let foundCampground=await Campground.findById(req.params.id);
        res.render("campgrounds/edit",{campground:foundCampground});

});

//Update Campground
router.put("/:id",middleware.checkCampgroundOwnership,async(req,res)=>{
  try {
      let updatedCampground = await Campground.findByIdAndUpdate(req.params.id,req.body.campground);
      req.flash("success","Successfully Edited Campground");
      res.redirect(`/campgrounds/${updatedCampground.id}`);
    
  } catch (error) {
    req.flash("error",error);
    res.redirect("/campgrounds");
  }
});

//Delete/destroy Campground
router.delete("/:id",middleware.checkCampgroundOwnership,async(req,res)=>{
  try {
    let foundCampground = await Campground.findById(req.params.id);
    await foundCampground.remove();
    req.flash("error","Successfully deleted Campground!");
    res.redirect("/campgrounds");
  } catch (error) {
    req.flash("error",error);
    res.redirect("/campgrounds");
  }
});
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
module.exports = router;
