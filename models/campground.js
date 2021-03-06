const mongoose=require("mongoose");
const Comment=require("./comment");

//Schema Set-up
const campgroundSchema = new mongoose.Schema({
    name:{
          type:String,
   },
    image:{
            type:String,
   },
    price:{
            type:String,
   },
    description:{
                  type:String,
    },
    createdAt: { type: Date, default: Date.now },
    author:{
       id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
       },
       username:String
    },
    comments: [
        {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Comment"
        }
     ]
});
//Campground pre-hook
campgroundSchema.pre("remove",async function(){
   await Comment.deleteMany({
      _id:{
         $in:this.comments
      }
   });
});

module.exports = mongoose.model("Campground",campgroundSchema);