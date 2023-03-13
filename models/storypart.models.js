const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
    initialPost:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'news',
        required:true

    },
    storyText:{
        type:String,
        required:true,
    },
    imageOne:{
        type:String,
        required:true
    },
    imageTwo:{
        type:String,
        required:true,
    }
})
const storyModel = mongoose.model('story',storySchema);
    module.exports = storyModel;
