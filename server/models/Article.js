const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title:{type:String},
    categories:[{       
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Category', //绑定Category模型
    }],
    body:{type:String}
})

module.exports = mongoose.model('Article',schema)