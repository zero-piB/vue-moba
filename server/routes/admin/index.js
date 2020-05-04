module.exports = app =>  {
    const express = require('express')
    const assert = require('http-assert')
    const AdminUser = require('../../models/AdminUser')
    const jwt = require('jsonwebtoken')
    const router = express.Router({
        mergeParams:true
    })
    
    //创建资源
    router.post('/',async(req,res)=>{
        const model = await req.Model.create(req.body)
        res.send(model)
    })

    //更新资源
    router.put('/:id',async(req,res)=>{
        const model = await req.Model.findByIdAndUpdate(req.params.id,req.body)
        res.send(model)
    })

    //删除资源
    router.delete('/:id',async(req,res)=>{
        await req.Model.findByIdAndDelete(req.params.id)
        res.send({
            success:true
        })
    })
    
    //资源列表
    router.get('/',async(req,res)=>{
        const queryOptions = {}
        if(req.Model.modelName === 'Category'){
            queryOptions.populate = 'parent'
        }
        if(req.Model.modelName === 'Article' || req.Model.modelName === 'Hero'){
            queryOptions.populate = 'categories'
        }
        //关联查询
        const items = await req.Model.find().setOptions(queryOptions).limit() 
        res.send(items)
    })

    //资源详情
    router.get('/:id',async(req,res)=>{
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })

    const resourceMiddleware = require('../../middleware/resource')
    const authMiddleware = require('../../middleware/auth')
    
    //验证token
    app.post('/admin/api/token', authMiddleware(), (req, res) => {
        res.status(200).send({
            message:'ok'
        })
    })

    //请求资源
    app.use('/admin/api/rest/:resource', resourceMiddleware() ,router)

    //处理上传图片的模块
    const multer = require('multer')
    const upload = multer({dest:__dirname + '/../../uploads'});
    app.post('/admin/api/upload', upload.single('file'),async(req,res)=>{
        //用了upload.single后，req上回挂载一个file
        const file = req.file
        //服务端静态资源地址
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })

    //登陆
    app.post('/admin/api/login', async (req, res) => {
        const { username, password } = req.body

        //1. 根据用户名查找
        const user = await AdminUser.findOne({ username }).select('+password')
        assert(user, 422, '用户不存在')

        //2.验证密码
        const isValid = require('bcrypt').compareSync(password||'', user.password)
        assert(isValid, 422, '密码错误')

        //3.成功返回username,token
        const token = jwt.sign({
            id: user._id
        }, app.get('secret'))

        res.send({token,username})
    })

    

    //错误捕获
    app.use((err, req, res, next) => {
        if (err.message === 'jwt malformed' || err.message === "invalid signature") {
            res.status(401).send({
                message: "不要乱改token"
            })
        } else {
            res.status(err.statusCode || 500).send({
                message: err.message
            })
        }
        
    })
}