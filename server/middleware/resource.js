module.exports = options => {
    return (req,res,next)=>{
        let modelName = require('inflection').classify(req.params.resource)
        const Model = require(`../models/${modelName}`)
        req.Model = Model
        next()
    }
}