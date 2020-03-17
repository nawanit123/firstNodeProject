const express = require("express");
const router  = express.Router({ mergeParams: true });
const Campground = require("../models/campground"),
       Comment   = require("../models/comment"),
       middleware =require("../middleware");

//===================================||
//    Comments Route                 ||
//===================================||
//comments new
router.get("/new", middleware.isLoggedIn, async (req, res) => {
  try {
    let campground = await Campground.findById(req.params.id);
    res.render("comments/new", { campground: campground });
  } catch (err) {
    console.log(err);
  }
});
//comments post
router.post("/", middleware.isLoggedIn, async (req, res) => {
  try {
    let campground = await Campground.findById(req.params.id);
    let comment = await Comment.create(req.body.comment);
    //add username and id to comments
    comment.author.id = req.user._id;
    comment.author.username = req.user.username;
    //comment save
    comment.save();
    campground.comments.push(comment);
    campground.save();
    req.flash("success","Successfully wrote comment!");
    res.redirect(`/campgrounds/${campground._id}`);
  } catch (err) {
    req.flash("error","Oops Something went wrong!");
    console.log(err);
  }
});

//Comments Edit
router.get("/:comment_id/edit",middleware.checkCommentOwnership,async(req,res)=>{
  try {
    let foundComment=await Comment.findById(req.params.comment_id);
    res.render("comments/edit",{
      campground_id:req.params.id,
      comment:foundComment
    });
  } catch (error) {
    req.flash("error","Oops Something went wrong!!!");
    res.redirect("back");
  }
});

//Comment Update
router.put("/:comment_id",middleware.checkCommentOwnership,async(req,res)=>{
  try {
    let foundComment=await Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment);
    req.flash("success","Comment Successfully Updated");
    res.redirect(`/campgrounds/${req.params.id}`);
  } catch (error) {
    req.flash("error","Oops Something went wrong!!!");
    res.redirect("back");
  }
});

//Comment Destroy/Delete
router.delete("/:comment_id",middleware.checkCommentOwnership,async(req,res)=>{
  try {
    await Comment.findByIdAndRemove(req.params.comment_id);
    req.flash("error","Commment Successfully deleted");
    res.redirect(`/campgrounds/${req.params.id}`);
  } catch (error) {
      req.flash("error","Oops Something went wrong!!!");
      res.redirect("back");
  }
});

module.exports = router;
