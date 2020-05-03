const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name:{type:String},
    parent:{       //关联父级分类模型,可以把当前分类的父级模型查找出来
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Category', //绑定Category模型
    }
})
 
//方法使用
schema.virtual('children', {
    localField: '_id',
    foreignField: 'parent',
    justOne: false,
    ref:'Category'
})

schema.virtual('newsList', {
    localField: '_id',
    foreignField: 'categories',
    justOne: false,
    ref:'Article'
})

module.exports = mongoose.model('Category',schema)