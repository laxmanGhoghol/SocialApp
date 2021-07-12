const router = require('express').Router();
const User = require("../models/User");
const bcrypt = require("bcrypt")


//register user
router.post("/register", async (req, res) => {
    
    //creating hash for password
    const salt = await bcrypt.genSalt(10);
    const hashpass = await bcrypt.hash(req.body.password, salt)
    
    const newuser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashpass
    });
    try {
        //save new user
        const val = await newuser.save();
        res.status(200).json(val);
    }
    catch (err) {
        res.status(404).json(err);
    }
});

//user login
router.post("/login", async(req, res)=>{
    try{
        //check if userid exists
        const val = await User.findOne({email: req.body.email});
        !val && res.status(404).json('user not found'); //if one side of AND is null it will never call second operand(if first op true then call second operrand)
        
        const valPass = await bcrypt.compare(req.body.password, val.password);
        !valPass && res.status(400).json('wrong password'); // if valPass is is true then call second operand
        
        //if email and passowrd is valid
        res.status(200).json(val);
    } catch(err){
        res.status(400).json('Something went wrong')
    }
});

module.exports = router