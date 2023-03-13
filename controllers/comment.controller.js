const commentModel = require('../models/comment.models');
const newsModel = require('../models/news.models')
const usersModel = require('../models/users.models')

module.exports = {
    createComment: async(decoded,params,pst) =>{

  


        const postId= pst;
        console.log(pst);
        console.log(postId);
      
      
        
        const commenter = decoded;
        const post = await newsModel.findById(postId.id);
        if(!post){
          return "No posts exist by that ID"
        }
        const user = await usersModel.findById(commenter);
        if(!user){
          return "No user exists by that Id"
        }
        
      
        
       
        const comment = await commentModel.create({
          content:params.comment,
          parent: params.id,
          post: postId.id,
          commenter: commenter,
        });
      
      
      
        await commentModel.populate(comment, { path: "commenter", select: "-password" });
        console.log(comment);
      
         return comment;
      
    },
    getComments:async(id) =>{
        const comments = await commentModel.find({ post: id })
        .populate("commenter", "-password")
        .sort("-createdAt").exec();
        
    
     
    let commentParents = {};
    let rootComments = [];

    for (let i = 0; i < comments.length; i++) {
      let comment = comments[i];
      commentParents[comment._id] = comment;
    }

    for (let i = 0; i < comments.length; i++) {
      const comment = comments[i];
      if (comment.parent) {
        let commentParent = commentParents[comment.parent];
        commentParent.children = [...commentParent.children, comment];
      } else {
        rootComments = [...rootComments, comment];
      }
    }



        return rootComments;
    },
}