var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Post = require('../models/postModel')
const User = require('../models/userModel')
const dotenv = require('dotenv')

const DB = process.env.DATABASE

mongoose.connect(DB)
.then(()=>console.log('資料連接成功'))

/* GET users listing. */
router.get('/',async function(req, res, next) {
    try{
        const timeSort = req.query.timeSort == "asc" ? "createdAt":"-createdAt"
        const q = req.query.q !== undefined ? {"content": new RegExp(req.query.q)} : {};
        const posts = await Post.find(q).populate({
            path: 'user',
            select: 'name photo '
        }).sort(timeSort);
          res.status(200).json({
          "status":"success",
          "data":posts
      })
     }catch(err){
         res.status(400).json({
             "status":"failed",
             "message":err
         })
     }
});


//Post
router.post('/',async function(req, res, next) {
    try{
        const body = req.body
        const posts = await Post.create(body)
        res.status(200).json({
            "status":"success",
           "data":posts
        })
    }catch(err){
        res.status(400).json({
            "status":"failed",
            "message":err
        })
    }
})

module.exports = router;
