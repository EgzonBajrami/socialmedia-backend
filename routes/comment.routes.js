var express = require('express');
var router = express.Router();
const {jsonResponse} = require('../lib/helper');
const {verifyToken} = require('../middleware/auth.middleware')
const commentController = require('../controllers/comment.controller')

/* GET home page. */
router.post('/createComment/:id',verifyToken, async(req,res)=>{
    try{
        const result = await commentController.createComment(req.decoded,req.body,req.params);
        res.json(jsonResponse(result))
        

    }catch(err){
        res.json(jsonResponse(err.message,false));

    }
})
router.get('/postComments/:id', async(req,res)=>{
    try{
        const result = await commentController.getComments(req.params.id);
        res.json(jsonResponse(result));

    }catch(err){
        res.json(jsonResponse(err.message,false));
    }
})
router.post('/createReply/:id', verifyToken, async(req,res)=>{
    try{
        const result = await commentController.createReply(req.decoded,req.body,req.params);
        res.json(jsonResponse(result));

    }catch(err){
        res.json(jsonResponse(err.message,false));
    }
})

module.exports = router;
