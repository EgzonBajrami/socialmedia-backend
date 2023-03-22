const newsModel = require('../models/news.models')
const storyModel = require('../models/storypart.models')
module.exports = {
    topStory: async(decoded,params) =>{
        console.log(params);
        console.log(decoded);
        const result = await newsModel.create({
            title:params.title,
            user:decoded,
            author:params.author,
            storyText:params.storyText,
            storyForm:params.storyForm,
            images:params.initialImage
        })
        return result;
    },
    storyImage: async (id, file) => {
        let fileName = null
        console.log(file);
     
        if(file){
          fileName =  `/images/${file.filename}` 
        }    
     
       
        return fileName; 
      },
      getTop:async()=>{
        const result = await newsModel.find({storyForm:'Top_story'}).limit(1).sort("-createdAt");
        await newsModel.populate(result,({path:'additionalText'}))
        console.log(result);
        return result;
      },
      addExtra:async(id,params)=>{
        console.log(params);
        console.log(params.initialImage);
        const post = await newsModel.findById(id);
        const storyparts = await storyModel.create({
          initialPost:id,
          storyText:params.storyText,
          imageOne:params.initialImage,
          imageTwo:params.secondImg


        });
      
        let data = post.additionalText;
        data.push(storyparts._id);
        console.log(data);
        const result = await newsModel.findByIdAndUpdate(id,{"additionalText":data}).exec();
        console.log(result);
      
        return result;
      },
      getPost:async(id)=>{
        const result = await newsModel.findById(id);
        await newsModel.populate(result,({path:'additionalText'}))
        
        return result;
      },
      getTopPosts:async() =>{
        const result = await newsModel.find({storyForm:'Top_story'}).sort({"createdAt":-1}).limit(7);
      
        return result;
      },
      getStoryPosts:async(params) =>{
        const result = await newsModel.find({storyForm:params}).sort({"createdAt":-1}).limit(4);
        return result;
      },
      getDiscussions: async(params) =>{
        const result = await newsModel.find({storyForm:params}).sort({"createdAt":-1});
        return result;
      },
      getUserPosts:async(params)=>{
        const result = await newsModel.find({user:params}).sort({"createdAt":-1});
        console.log(result);
        return result;
      }
      
}