const express = require('express')

const app = express()
require('./plugins/db')(app)
app.set('secret', 'laskndalsdkm')

app.use(require('cors')())
app.use(express.json())
//静态资源托管
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use('/admin', express.static(__dirname + '/admin'))
app.use('/',express.static(__dirname+'/web'))
// 使用路由，传参
require('./routes/admin/index')(app)
require('./routes/web/index')(app)

app.listen(3000,()=>{
    console.log("正在监听3000端口")
})