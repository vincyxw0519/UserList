const mongoose = require('mongoose')
const User = require('./model/model')

mongoose.connect('mongodb://127.0.0.1:27017/USER_LIST');

//get all user intance
module.exports.getUsers = () => {
    return User.find().exec();  
}

//get one user instance
module.exports.getOneUser = (id) => {
    return User.findById(id).exec();  
}

//create new user
module.exports.createUser = (fn, ln, s, a, ps) => {
    const user = new User({
        firstname: fn,
        lastname: ln,
        sex: s,
        age: a,
        password: ps
    });
    return user.save();
}


//delete user
module.exports.deleteUser = (id) =>{
    return User.remove({_id:id}).exec();
}

//update user information
module.exports.updateUser = (id, fn, ln, s, a, ps) =>{
    return User.findByIdAndUpdate(id, {firstname : fn, lastname : ln, sex : s, age : a, password : ps});
}

