const router = require('express').Router();
const User = require('../models/User');



require('dotenv').config();

const ImageKit = require('imagekit');


const imagekit = new ImageKit({
    publicKey: process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY,
    urlEndpoint:"https://ik.imagekit.io/cryolite69420",
})


router.get("/:id", async(req,res)=>{
    try {
        const user = await User.findById(req.params.id).populate('followers').populate('following');
        const {password, updatedAt, ...other} = user._doc;
        if(!user){
            res.status(404).json("user not found")
        } else {
            res.status(200).json(other);
        }  
    } catch (error) {
        res.status(500).json(error)
    }
});

router.put("/:id", async(req,res)=>{
    if(req.body.userId === req.params.id){
        try {
        if(req.body.profilePic_id){
            imagekit.deleteFile(req.body.profilePic_id, function(error, result) {
                if(error) console.log(error);
                else console.log(result);
            });
        } 

        const fileStr = req.body.profilePic; 
        const name = req.body.profilePic_Name;
        const fileUpload = await  imagekit.upload({
        file: fileStr,
        fileName: name,
        folder: 'profiles',
        });

        await User.findByIdAndUpdate(req.params.id,{
               username: req.body.username,
               bio: req.body.bio,
               techStack : req.body.techStack,
               profilePicture: fileUpload.url,
               profilePic_id: fileUpload.fileId,
        });

        res.status(200).json("your account has been updated"); 

        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(500).json("you can update only your account")
    };
});


router.delete("/:id", async(req,res)=>{
    if(req.body.userId === req.params.id){
        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("your account was deleted");  
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(500).json("you can delete only your account")
    };
});


router.put("/:id/follow", async(req,res)=>{
    if(req.body.userId !== req.params.id){
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(!user.followers.includes(req.body.userId)){
              await user.updateOne({$push:{followers:req.body.userId}});
              await currentUser.updateOne({$push:{following :req.params.id}});

              res.status(200).json("you started following this user");
            } else {
              res.status(403).json('you already follow this user');
            } 
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json("you cant follow yourself");
    };
});


router.put("/:id/unfollow", async(req,res)=>{
    if(req.body.userId !== req.params.id){
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(user.followers.includes(req.body.userId)){
              await user.updateOne({$pull:{followers:req.body.userId}});
              await currentUser.updateOne({$pull:{following :req.params.id}});

              res.status(200).json("you  unfollowed this user");
            } else {
                res.status(403).json('you dont follow this user');
            } 
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json("you cant unfollow yourself")
    };
});

router.get("/:id/suggested", async(req,res)=>{
    try {
        const user = await User.findById(req.params.id).populate('following');
        const allUsers = await User.find({});
    
        if(!user){
            res.status(404).json("user not found")
        } else {
            /*const newResult = await User.find({followers:{$nin: user}})*/
            
            const suggestedImpure =  allUsers.filter(el => {
                return !user.following?.find(element => {
                   return element.id === el.id ;
                });
             });
        
            const suggestedPure = suggestedImpure.filter(el => {
                return el.id !== req.params.id ;
            })
            
            res.status(200).json({suggested : suggestedPure , following: user.following});
           /* res.status(200).json(newResult)*/
        }  
    } catch (error) {
        res.status(500).json(error)
    }
});

module.exports = router
