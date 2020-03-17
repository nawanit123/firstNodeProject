const express = require("express");
const router = express.Router();
const Campground = require("../models/campground"),
      middleware =require("../middleware");

//RETRIEVE INDEX-campgrounds page
router.get("/", (req, res) => {
  //Get all campgrounds from DB
  Campground.find({}, (err, allCampgrounds) => {
    if (err) {
      req.flash("error","Cannot find Campground!!!!");
    } else {
      res.render("campgrounds/index", {
        campgrounds: allCampgrounds
      });
    }
  });
  // res.render(`campgrounds`,{campgrounds:campgrounds});
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
      res.redirect(`/campgrounds/${updatedCampground.id}`);
    
  } catch (error) {
    console.log(err);
    res.redirect("/campgrounds");
  }
});

//Delete/destroy Campground
router.delete("/:id",middleware.checkCampgroundOwnership,async(req,res)=>{
  try {
    let foundCampground = await Campground.findById(req.params.id);
    await foundCampground.remove();
    res.redirect("/campgrounds");
  } catch (error) {
    console.log(error);
    res.redirect("/campgrounds");
  }
});
module.exports = router;
