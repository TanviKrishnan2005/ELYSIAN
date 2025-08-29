const express = require('express');
const User = require('./user.model');  
const router = express.Router();

//register endpoint

router.post('/register',async(req,res)=>{
    try{
        const {username,email,password} = req.body;
        const user = new User({email,username,password});
        await user.save();
        res.status(201).send({message:"user registered successfully!"})
    }catch(error){
         console.error("❌ Error in /register:", error);
  res.status(500).send({ error: "Internal server error" });
    }
})

module.exports = router;