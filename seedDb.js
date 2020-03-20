const mongoose=require("mongoose"),
    Campground=require("./models/campground"),
    Comment =require("./models/comment");

const seeds=[
    {name:"Rasol",
        image:"http://source.unsplash.com/y8Ngwq34_Ak",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem in cum alias perferendis rerum! Mollitia voluptatum ut sunt soluta ab dolores assumenda laboriosam, quis optio maiores nulla reprehenderit quam velit quidem et molestias, illum eius autem magni suscipit aut modi, ipsum veniam a. Eveniet nemo magni sint ad! Magni, quaerat?" 
    },
    {name:"Kasol",
        image:"http://source.unsplash.com/0AV7XLABuZk",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem in cum alias perferendis rerum! Mollitia voluptatum ut sunt soluta ab dolores assumenda laboriosam, quis optio maiores nulla reprehenderit quam velit quidem et molestias, illum eius autem magni suscipit aut modi, ipsum veniam a. Eveniet nemo magni sint ad! Magni, quaerat?" 
    },
    {name:"Munnar",
        image:"http://source.unsplash.com/re2LZOB2XvY",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem in cum alias perferendis rerum! Mollitia voluptatum ut sunt soluta ab dolores assumenda laboriosam, quis optio maiores nulla reprehenderit quam velit quidem et molestias, illum eius autem magni suscipit aut modi, ipsum veniam a. Eveniet nemo magni sint ad! Magni, quaerat?" 
    }
];

// function seedDB(){
//     const myPromise1=()=>{
//         const promise1=new Promise((resolve,reject)=>{
//             resolve(Campground.deleteMany({}));
//         });
//         return promise1;
//     };

//     const myPromise2=(seed)=>{
//         const promise2=new Promise((resolve,reject)=>{
//             resolve(Campground.create(seed));
//         });
//         return promise2;
//     }
//     const myPromise3=()=>{
//         const promise3 = new Promise((resolve,reject)=>{
//             resolve(Comment.create({
//                 text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum recusandae officia fuga quasi inventore placeat similique cupiditate illo, omnis provident repudiandae, minus dignissimos quidem ullam quas cum qui accusantium praesentium aliquam officiis sint dolores? Doloribus et dicta fuga. Ipsum delectus error quaerat maiores iste nemo officia perspiciatis dolores soluta maxime?",
//                 author: "Homer"
//             }));
//         });
//         return promise3;
//     }


// myPromise1().then(text=>{
//     console.log("Campground Removed");
//     return new Promise((resolve,reject)=>{
//         resolve(Comment.deleteMany({}));
//     });
// }).then(text=>{
//     console.log("Comments Removed");
//     for (const seed of seeds){
//         myPromise2(seed)
//         .then((campground)=>{
//             console.log("Campground Created!!");
//             myPromise3().then((comment)=>{
//                 console.log("Comment Created");
//                 campground.comments.push(comment);
//                 campground.save();
//                 console.log("Comment added to Campgrounds");
//             }).catch(err=>{
//                 console.log(err);
//             })
//         }).catch(err=>{
//             console.log(err);
//             })
//     }
// });
// }
async function seedDB(){
    try{
        //remove Campgrounds
        await Campground.deleteMany({});
        console.log("Campground removed");
        await Comment.deleteMany({});
        console.log("Comment Removed");
    
        for(const seed of seeds){
            let campground = await Campground.create(seed);
            console.log("Campground Created");
            let comment = await Comment.create(
                {
                    text: "This place is great, but I wish there was internet",
                    author: "Homer"
                }
            );
            console.log("Comment Created");
            campground.comments.push(comment);
            campground.save();
            console.log("Comment added to Campground");
        }
    }
    catch(err){
        console.log(err);
    }
}
module.exports=seedDB;

