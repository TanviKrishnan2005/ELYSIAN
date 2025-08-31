const express = require('express');
const User = require('./user.model');
const genrateToken = require('../middleware/generateToken');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();



//register endpoint

router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ email, username, password });
        await user.save();
        res.status(201).send({ message: "user registered successfully!" })
    } catch (error) {
        console.error("❌ Error in /register:", error);
        res.status(500).send({ error: "Internal server error" });
    }
})
//login user endpoint
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: 'User not found' })
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).send({ message: 'Password not match' })
        }
        const token = await genrateToken(user.id)
        

        res.cookie('token',token,{
            httpOnly:true,
            secure:true,
            sameSite:'None'
        })


        res.status(200).send({ message: "Logged in successfully",token, user:{
            id :user.id,
            email:user.email,
            username:user.username,
            role:user.role,
            profileImage: user.userImage,
            bio:user.bio,
            profession:user.profession
        } })
    } catch (error) {
        console.error("❌ Error logged in user", error);
        res.status(500).send({ error: "error logged in user" });
    }
})

//logout endpoints
router.post('/logout',(req,res)=>{
    res.clearCookie('token');
    res.status(200).send({message: "logout successful"})
})

//delete a user 

router.delete('/users/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const user = await User.findByIdAndDelete(id);
        if(!user){
            return res.status(404).send({message:'User not found'})
        }
        res.status(200).send({message:"user deleted successfully"})
    } catch (error) {
        console.error("❌ Error deleting user", error);
        res.status(500).send({ error: "error deleting user" });
    }
})


module.exports = router;