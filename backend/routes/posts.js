const router = require('express').Router();
const Post = require("../models/Post");
const User = require('../models/User');

require('dotenv').config();

const ImageKit = require('imagekit');

const imagekit = new ImageKit({
    publicKey: process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY,
    urlEndpoint:"https://ik.imagekit.io/cryolite69420",
})


//create post
router.post("/add", async (req,res)=>{
    try {
    const fileStr = req.body.photo; 
    const name = req.body.picName;
    const fileUpload = await  imagekit.upload({
        file: fileStr,
        fileName: name,
        folder: 'posts',
    });

    const newPost = await new Post({
        author: req.body.author,
        img: fileUpload.url,
        caption: req.body.caption,
        image_id:fileUpload.fileId,
    })
 
   const post = await newPost.save();
   res.status(200).json(post);
    
     } catch (error) {
         res.json(error);
     }
     
 });

 //get all posts for explore page

router.get("/explore", async(req,res)=>{
    try {
        const posts = await Post.find({}).populate('author');
        
        if(!posts){
            res.status(404).json("posts not found")
        } else {
            res.status(200).json(posts);
        }  
    } catch (error) {
        res.status(500).json(error)
    }
});

//get post details
router.get("/:id", async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id).populate('author').populate('comments');
        
        
        if(!post){
            res.status(404).json("post not found")
        } else {
            res.status(200).json(post);
        }  
    } catch (error) {
        res.status(500).json(error)
    }
});



//update post
router.put("/:id", async(req,res)=>{
    const post = await Post.findById(req.params.id).populate('author');
    
    if(String(req.body.userId) === String(post.author._id)){
        try {
            await Post.findByIdAndUpdate(req.params.id,{$set:req.body});
            res.status(200).json("your post has been updated");  
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(500).json("you can update only your post")
    };
});



 //delete a post
 router.delete("/:id", async(req,res)=>{
    const post = await Post.findById(req.params.id).populate('author');

    if(String(req.body.userId) == String(post.author._id)){
        try {
            const fileId = req.body.fileId;

            await  imagekit.deleteFile(fileId);
            await Post.findByIdAndDelete(req.params.id)
            res.status(200).json("your post was deleted");  
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(500).json("you can delete only your post")
    };
    
});


//getting user posts
router.get("/myposts/:id", async(req,res)=>{
    try {
        const posts = await Post.find({author: req.params.id});
        
        if(!posts){
            res.status(404).json("posts not found")
        } else {
            res.status(200).json(posts);
        }  
    } catch (error) {
        res.status(500).json(error)
    }
});

//getting feed posts

router.get("/feedposts/:id", async(req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        const feedPosts = await Post.find({author: req.params.id}).populate('author').populate('comments');

        const otherPosts = await Post.find({author:{$in:user.following}}).populate('author').populate('comments');
        
        res.status(200).json(feedPosts.concat(...otherPosts));
          
    } catch (error) {
        res.status(500).json(error)
    }
});

//like or post

router.put("/react/:id", async(req,res)=>{
        try {
            const post = await Post.findById(req.params.id);
            if(!post.likes.includes(req.body.userId)){
                await post.updateOne({$push:{likes:req.body.userId}});
                res.status(200).json("you liked this post");
            } else {
                await post.updateOne({$pull:{likes:req.body.userId}});
                res.status(200).json("you unliked this post");
            } 
        } catch (error) {
            res.status(500).json(error);
        }
    
});



module.exports = router