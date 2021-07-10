const router = require('express').Router();
const bcrypt = require('bcrypt')
const User = require('../models/User');
//update user
router.put("/:id", async (req, res)=>{
    if(req.body.userId === req.params.id || req.user.isAdmin){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt)
            }catch(err){
                return res.status(500).json(err);
            }
        }
        try {
            
        } catch (err) {
            
        }
    }
    else{
        res.status(403).json('you can update only your account')
    }
})
//delete user

//
module.exports = router