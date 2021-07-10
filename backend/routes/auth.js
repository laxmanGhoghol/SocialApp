const router = require('express').Router();
const User = require("../models/user");
const bcrypt = require("bcrypt")

router.post("/register", async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashpass = await bcrypt.hash(req.body.password, salt)
    
    const newuser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashpass
    });
    try {
        const val = await newuser.save();
        res.status(200).json(val);
    }
    catch (err) {
        res.status(404).json(err);
    }
});

module.exports = router