var express = require('express');
var router = express.Router();
const newsController = require('../controllers/news.controller')
const {verifyToken} = require('../middleware/auth.middleware')
const {jsonResponse} = require('../lib/helper')
const upload = require('../lib/upload')

router.post('/topStory', verifyToken, async(req,res)=>{
    try{
        const result = await newsController.topStory(req.decoded,req.body);
        res.json(jsonResponse(result));

    }catch(err){
        res.json(jsonResponse(err.message,false));

    }
})
router.post('/AddImage', verifyToken, upload.single('story-image'), async(req,res)=>{
    try{
        
        const result = await newsController.storyImage(req.params.id, req.file);
        res.json(jsonResponse(result));
    
    }catch(err){
        res.json(jsonResponse(err.message,false));
    }
})
router.get('/topStory', async(req,res)=>{
    try{
        const result = await newsController.getTop();
        res.json(jsonResponse(result));
        
    }catch(err){
        res.json(jsonResponse(err.message,false));
    }
})
router.post('/addExtra/:id', verifyToken, async(req,res)=>{
    try{
        const result = await newsController.addExtra(req.params.id, req.body);
        res.json(jsonResponse(result));
        
    }catch(err){
        res.json(jsonResponse(err.message,false));
    }
})
router.get('/story/:id', async(req,res)=>{
    try{
        const result = await newsController.getPost(req.params.id);
        res.json(jsonResponse(result));
        
    }catch(err){
        res.json(jsonResponse(err.message,false));
    }
})
router.get('/topStories', async(req,res)=>{
    try{
        const result = await newsController.getTopPosts();
        res.json(jsonResponse(result));

    }catch(err){
        res.json(jsonResponse(err.message,false));
    }

})
router.get('/stories/:storyType', async(req,res)=>{
    try{
        const result = await newsController.getStoryPosts(req.params.storyType);
        res.json(jsonResponse(result));

    }catch(err){
        res.json(jsonResponse(err.message,false));
    }
})
router.get('/discussions/:storyType', async(req,res)=>{
    try{
        const result = await newsController.getDiscussions(req.params.storyType);
        res.json(jsonResponse(result));

    }catch(err){
        res.json(jsonResponse(err.message,false));
    }
})
router.get('/userPosts/:id', async(req,res)=>{
    try{
        const result = await newsController.getUserPosts(req.params.id);
        res.json(jsonResponse(result));

    }catch(err){
        res.json(jsonResponse(err.message,false));
    }
})
module.exports = router;
