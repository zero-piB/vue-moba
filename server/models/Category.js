const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name:{type:String},
    parent:{       //关联父级分类模型,可以把当前分类的父级模型查找出来
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Category', //绑定Category模型
    }
})

module.exports = mongoose.model('Category',schema)