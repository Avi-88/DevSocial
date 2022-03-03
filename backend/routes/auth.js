const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');


router.post("/register", async (req,res)=>{
   try {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  
    const newUser = await new User({
       username: req.body.username,
       password: hashedPassword,
       email:req.body.email
   })

  const user = await newUser.save();
  res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
    
});


router.post("/login", async (req,res)=>{
    try {
     const user = await User.findOne({email:req.body.email}).populate('followers').populate('following');
     const passCheck = bcrypt.compareSync(req.body.password, user.password);
     
     user && passCheck ? res.status(200).json(user) : res.status(400).json("wrong password");

     
     } catch (error) {
         res.status(500).json(error);
     }
     
 })

module.exports = router
