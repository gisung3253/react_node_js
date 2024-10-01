const express = require('express');
const router = express.Router();
const {Users} = require("../models");
const bycrypt = require("bcrypt");

const {sign} = require('jsonwebtoken')



router.post("/", async (req, res) => {
    const {username, password} = req.body;
    bycrypt.hash(password, 10).then((hash)=>{
        Users.create({
            username: username,
            password: hash,
        })
        return res.json("SUCCESS");
    })
})

router.post('/login', async (req, res)=>{
    const {username, password} = req.body;

    const user = await Users.findOne({where: {username: username}});

    if(!user) return res.json({error: "User Doesn't Exist"});

    bycrypt.compare(password, user.password).then(async (match)=>{
        if(!match) return res.json({error: "Wrong Username And Password Combination"});

        const accessToken = sign({username: user.username, id: user.id}, 
            "importantsecret"
        )

        return res.json(accessToken)
    })

})


module.exports = router;