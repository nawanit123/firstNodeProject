const express=require("express"),
        router=express.Router(),
        passport=require("passport"),
        User=require("../models/user"),
        middleware =require("../middleware");

///Root route
router.get("/",(req,res)=>{
    res.render(`landing`);
});

//===========================
//  Auth Routes
//===========================
//Show register form
router.get("/register",(req,res)=>{
    res.render("register");
});

//Handle SignUp logic
router.post("/register",async(req,res)=>{
    try{
        let user= new User({username:req.body.username});
        await User.register(user,req.body.password);
        await passport.authenticate("local")(req,res,()=>{
            req.flash("success","Welcome to YelpCamp "+req.user.username);
            res.redirect("/campgrounds");
        })        
    }catch(err){
        console.log(err);
        req.flash("error",err.message);
         res.redirect("/register");
    }
});

//Log In form route!
router.get("/login",(req,res)=>{
    res.render("login");
});
//Log In logic handling
router.post("/login",async(req,res)=>{
    try {
       await passport.authenticate("local")(req,res,()=>
        {
            let uName=req.user.username;
            req.flash("success","Welcome to YelpCamp "+uName.charAt(0).toUpperCase()+uName.slice(1));
            res.redirect("/campgrounds");
        });  
    } catch (error) {
        req.flash("error",error.message);
        res.redirect("/register");
    }
});


//log out route
router.get("/logout",(req,res)=>{
    req.logout();
    req.flash("success","Loggin You Out!!");
    res.redirect("/campgrounds");
});

module.exports=router;

