const usersModel = require('../models/users.models')
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
module.exports ={
    add: async(params) =>{
        console.log(params);
       

        const hashedPassword = await bcrypt.hash(params.password, parseInt(process.env.SALT));
        console.log(hashedPassword);

        const result = await usersModel.create({password:hashedPassword,firstName:params.firstName,
            lastName:params.lastName,
            age:params.age,email:params.email,role:'USER'});
        console.log(result);
        return result._id;
    },
    findUser:async(params) =>{
        const result = await usersModel.findById(params).select('-password');
        if(!result){
            throw Error('User does not exist');
        }
        return result;
    },
    changeUserImage: async (id, file) => {
        let fileName = null
        console.log(file);
     
        if(file){
          fileName =  `/images/${file.filename}` 
        }    
        const avatar = fileName;
        console.log(id);
        const result = await usersModel.findByIdAndUpdate(id,{avatar:avatar});
        return result;
     
       
      
      },
}