const router = require('express').Router();
const User = require("../models/User");
const refreshTokensData = require('../models/refreshToken')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')


//register user
router.post("/register", async (req, res) => {
    try {
        //creating hash for password
        const salt = await bcrypt.genSalt(10);
        const hashpass = await bcrypt.hash(req.body.password, salt)

        const newuser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashpass
        });
        //save new user
        const val = await newuser.save();
        res.status(200).json({ 'ok': true });
    }
    catch (err) {
        res.status(404).json({ 'ok': false });
    }
});

//user login
router.post("/login", async (req, res) => {
    try {
        //check if userid exists
        const val = await User.findOne({ email: req.body.email });
        !val && res.status(404).json({ 'ok': false, 'err': 'wrong email' }); //if one side of AND is null it will never call second operand(if first op true then call second operrand)

        const valPass = await bcrypt.compare(req.body.password, val.password);
        !valPass && res.status(400).json({ 'ok': false, 'err': 'wrong password' }); // if valPass is is true then call second operand

        //if email and passowrd is valid
        const accessToken = jwt.sign({ 'userId': val._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
        const refreshToken = jwt.sign({ 'userId': val._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '15d' })

        const refreshTokendata = new refreshTokensData({
            token: refreshToken
        });
        await refreshTokendata.save(); // saving refresh token in database

        res.status(200).json({ 'accessToken': accessToken, 'refreshToken': refreshToken });
    } catch (err) {
        res.status(400).json({ 'ok': false })
    }
});

//to refresh token
router.post('/token', async (req, res) => {
    try {
        const refreshToken = req.body.token;

        if (refreshToken == null) return res.sendStatus(401)
        const val = await refreshTokensData.findOne({ 'token': refreshToken });
        !val && res.status(404).json({ 'ok': false, 'err': 'token expired' });

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(403)
            const accessToken = jwt.sign({ 'userId': user.userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
            res.status(200).json({ 'accessToken': accessToken })
        });
    } catch (err) {
        res.status(500).json({ 'ok': false });
    }
});

//delete refresh token
router.delete('/logout', async (req, res) => {
    try {
        await refreshTokensData.findOneAndDelete({ 'token': req.body.token })
        res.status(200).json('loged out')
    } catch (err) {
        res.status(500).json({ 'ok': false });
    }
})



module.exports = router