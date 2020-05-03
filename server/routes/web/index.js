module.exports = app => {
    const mongoose = require('mongoose')
    const Article = mongoose.model('Article')
    const Category = mongoose.model('Category')

    const router = require('express').Router()

    const newsTitle = ["王者荣耀×谭盾丨五虎定制交响乐，用传统乐器复原中国声韵", "王者英雄导航来啦!", "新皮肤爆料丨龙战于野，迅疾如风，赵云新装登场！", "跨系统角色转移限量测试开启公告", "新皮肤爆料丨活动免费兑换！【盾山-圆桌骑士】新装登场", "5月3日跨系统角色转移测试公告", "跨系统角色转移后点亮守护星活动蔷薇之心可重复获取问题说明", "关于微社区熟练度铭文奖励领取活动暂时关闭说明", "五五开黑节 点亮守护星活动优化说明", "5月1日全服不停机更新公告", "峡谷寻宝第二话——传说史诗皮肤自选寻宝活动开启", "神秘商店开启公告", "点亮守护星·抽内测皮肤 百万内测皮肤大放送", "【五五集结领豪礼】活动开启公告", "与我为伍，彼此守护，五五开黑节多重福利就绪", "【原创内容大赛音乐比赛】优秀作品合集（二）", "大众赛事合作赛道全面开启，携手合作伙伴共建王者电竞生态", "【KPL今日预报】南京Hero久竞 vs DYG，DYG.久诚迎战老东家能否取胜", "关于责成TS俱乐部就欠薪问题进行说明的通知", "《一招即浪》第二期：逆天牛魔王最浪打法，城市赛教你一招制敌"]

    // router.get('/news/init', async (req, res) => {
    //     const parent = await Category.findOne({name:'新闻资讯'})
    //     const cats = await Category.find().where({
    //         parent:parent
    //     }).lean()
        
    //     const newsList = newsTitle.map(title => {
    //         const randomCats = cats.slice(0).sort((a, b) => Math.random() - 0.5)
    //         return {
    //             title: title,
    //             categories:randomCats.slice(0,2)
    //         }
    //     })

    //     await Article.deleteMany({})
    //     await Article.insertMany(newsList)
    //     res.send(newsList)
    // })

    router.get('/news/list', async (req, res) => {
        const parent = await Category.findOne({ name: '新闻资讯' })
        const cates = await Category.aggregate([
            {
                $match: { parent: parent._id },
            },
            {
                $lookup: {
                    from: 'articles',
                    localField: '_id',
                    foreignField: 'categories',
                    as: 'newsList'
                },
            }
        ])
        res.send(cates)
    })

    app.use('/web/api',router)
}