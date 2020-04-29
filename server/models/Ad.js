const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: { type: String }, //广告位名字
    items: [{
        imgUrl: { type: String },
        link: {type:String}  //跳转链接
    }]      
})

module.exports = mongoose.model('Ad',schema)