const express = require('express');
const router = express.Router();
const {Users} = require("../models");
const bycrypt = require("bcrypt");



router.post("/", async (req, res) => {
    const {username, password} = req.body;
    bycrypt.hash(password, 10).then((hash)=>{
        Users.create({
            username: username,
            password: hash,
        })
        res.json("SUCCESS");
    })
})

router.post('/login', async (req, res)=>{
    const {username, password} = req.body;

    const user = await Users.findOne({where: {username: username}});

    if(!user) res.json({error: "User Doesn't Exist"});

    bycrypt.compare(password, user.password).then((match)=>{
        if(!match) res.json({error: "Wrong Username And Password Combination"});

        res.json("YOU LOGGED")
    })

})


module.exports = router;