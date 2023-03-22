const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    title:{type:String,
    required:true},
    user:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    storyText:{
        type:String,
        required:true
    },
    storyForm:{
        type:String,
        required:true
    },
    images:[{
        type:String
    }],
    additionalText:[{
        type:mongoose.Types.ObjectId,
        ref:'story'
    }]
}
    ,{
        timestamps:true,
    })
    const newsModel = mongoose.model('news',newsSchema);
    module.exports = newsModel;