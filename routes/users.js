var express = require('express');
var router = express.Router();
const {jsonResponse} = require('../lib/helper')
const userController = require('../controllers/user.controller')
const authController = require('../controllers/auth.controller')
const upload = require('../lib/upload')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/register', async(req,res)=>{
  try{
    const result = await userController.add(req.body);
    console.log(result);
    res.json(jsonResponse(result));

  }catch(err){
    res.json(jsonResponse(err.message,false));

  }
})
router.post('/login', async(req,res)=>{
  try{
    const result = await authController.login(req.body);
    res.json(jsonResponse(result));
    

  }catch(err){
    res.json(jsonResponse(err.message,false));
  }
})
router.get('/user/:id', async(req,res)=>{
  try{
    const result = await userController.findUser(req.params.id);
    res.json(jsonResponse(result));

  }catch(err){
    res.json(jsonResponse(err.message,false));
  }
})
router.post('/changeImage/:id', upload.single('user-image'), async(req,res)=>{
  try{
    const result = await userController.changeUserImage(req.params.id, req.file);
    res.json(jsonResponse(result));

  }catch(err){
    res.json(jsonResponse(err.message,false));
  }
})

module.exports = router;
