const router = require('express').Router();
const Comment = require('../models/Comment');
const Post = require("../models/Post");


router.post("/add/:id",  async (req,res)=>{
    try {
        Post.findById(req.params.id,function(err,foundPost){
            if(err)
                res.status(404).json('post not found');
            else
            {
                var newComment = {  content : req.body.content , 
                                    author: {
                                        userId: req.body.author._id,
                                        userName: req.body.author.username,
                                        img: req.body.author.profilePicture
                                    }
                                };
                Comment.create(newComment, function(err,newComment){
                    if(err)
                        res.status(400);
                    else
                    {
                        newComment.save();
                        foundPost.comments.push(newComment);
                        foundPost.save();
                        res.sendStatus(200);
                    }
                });
            }
        });

} catch (error) {
        res.status(500).json(error);
    }
     
});



module.exports = router
