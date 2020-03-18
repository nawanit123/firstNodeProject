const express   = require("express"),
  app           = express(),
  mongoose      = require("mongoose"),
  Comment       =   require("./models/comment"),
  Campground    =   require("./models/campground"),
  User          = require("./models/user"),
  passport      = require("passport"),
  LocalStrategy = require("passport-local"),
  methodOverride = require("method-override"),
  seedDB = require("./seedDb"),
  flash         =   require("connect-flash"),
  port = 3000;
//requiring routes
const campgroundRoutes = require("./routes/campgrounds"),
         commentRoutes = require("./routes/comments"),
          indexRoutes  = require("./routes/index");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
// mongoose.connect("mongodb://localhost:27017/yelp_camp");
mongoose.connect("mongodb+srv://Nawanit:password101@cluster0-wrjc7.mongodb.net/test");
//
app.use(
  require("express-session")({
    secret: "Rusty is a cute dog",
    resave: false,
    saveUninitialized: false
  })
);
// seedDB();//seed the database.

app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({extended:true}));
app.use(express.json({ strict: true }));
app.set("view engine", "ejs");
//moment JS
app.locals.moment = require('moment');
//Passport Configuration
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(flash());
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error       = req.flash("error");
  res.locals.success     = req.flash("success");
  next();
});



app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(port,console.log(`YelpCamp Running at Port:  ${port}!`));
