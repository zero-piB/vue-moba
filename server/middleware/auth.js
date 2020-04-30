module.exports = options => {
    const assert = require('http-assert')
    const jwt = require('jsonwebtoken')
    const AdminUser = require('../models/AdminUser')
    return async (req, res, next) => {
        //1.查看有无token
        const token = String(req.headers.authorization || '').split(' ').pop()
        assert(token, 401, '请先登陆')
        //2.验证token
        const { id } = jwt.verify(token, req.app.get('secret'))
        assert(id, 401, '有用？')
        //3.查看是否有该用户
        req.user = await AdminUser.findById({ _id: id })
        assert(req.user, 401, '伪造token?挺牛逼的啊你')
        await next()
    }
}