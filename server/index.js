const express = require('express')

const app = express()

app.set('secret', 'laskndalsdkm')

app.use(require('cors')())
app.use(express.json())
//静态资源托管
app.use('/uploads',express.static(__dirname+'/uploads'))
// 使用路由，传参
require('./routes/admin/index')(app)
require('./plugins/db')(app)

app.listen(3000,()=>{
    console.log("正在监听3000端口")
})