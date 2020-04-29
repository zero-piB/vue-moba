module.exports = app =>  {
    const express = require('express')
    const router = express.Router({
        mergeParams:true
    })
    
    //创建分类
    router.post('/',async(req,res)=>{
        const model = await req.Model.create(req.body)
        res.send(model)
    })
    //更新分类
    router.put('/:id',async(req,res)=>{
        const model = await req.Model.findByIdAndUpdate(req.params.id,req.body)
        res.send(model)
    })
    //删除分类
    router.delete('/:id',async(req,res)=>{
        await req.Model.findByIdAndDelete(req.params.id)
        res.send({
            success:true
        })
    })
    //分类列表
    router.get('/',async(req,res)=>{
        const queryOptions = {}
        if(req.Model.modelName === 'Category'){
            queryOptions.populate = 'parent'
        }
        if(req.Model.modelName === 'Article' || req.Model.modelName === 'Hero'){
            queryOptions.populate = 'categories'
        }
        //关联查询
        const items = await req.Model.find().setOptions(queryOptions).limit(10) 
        res.send(items)
    })

    router.get('/:id',async(req,res)=>{
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })

    app.use('/admin/api/rest/:resource',(req,res,next)=>{
        let modelName = require('inflection').classify(req.params.resource)
        const Model = require(`../../models/${modelName}`)
        req.Model = Model
        next()
    },router)

    //处理上传图片的模块
    const multer = require('multer')
    const upload = multer({dest:__dirname + '/../../uploads'});
    app.post('/admin/api/upload',upload.single('file'),async(req,res)=>{
        //用了upload.single后，req上回挂载一个file
        const file = req.file
        //服务端静态资源地址
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })
}