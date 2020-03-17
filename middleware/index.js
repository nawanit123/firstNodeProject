const Campground = require("../models/campground"),
      Comment    = require("../models/comment");


//All the middlewares
const middlewareObj = {};

middlewareObj.checkCampgroundOwnership = async function(req,res,next){
    try {
      if(req.isAuthenticated()){
        let foundCampground=await Campground.findById(req.params.id);
        if(foundCampground.author.id.equals(req.user._id)){
          next();
        }else{
          req.flash("error","You are not authorized to do that!");
          res.redirect("back");
        }
      }else{
         req.flash("error","You need to be logged in to do that!");
          res.redirect(`..`);
      }
  
    } catch (error) {
        req.flash("error",error.message);
        res.redirect("back");
      }
  }

middlewareObj.isLoggedIn = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error","You need to be logged in to do that");
  res.redirect("/login");
}

middlewareObj.checkCommentOwnership = async function(req,res,next){
    try {
      if(req.isAuthenticated()){
        let foundComment=await Comment.findById(req.params.comment_id);
        if(foundComment.author.id.equals(req.user._id)){
          next();
        }else{
          req.flash("error","Oops You are not authorized to do that!!!");
          res.redirect("back");
        }
      }else{
        req.flash("error","You need to be logged in to do that!");
        res.redirect("back");
      }
  
    } catch (error) {
      req.flash("error","Oops Something went wrong!!!");
      res.redirect("back");
  }
}

module.exports = middlewareObj;