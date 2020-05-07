module.exports = app => {
    const mongoose = require('mongoose')
    const Article = mongoose.model('Article')
    const Category = mongoose.model('Category')
    const Hero = mongoose.model('Hero')

    const router = require('express').Router()

    //返回5个新闻分类，每类5条
    router.get('/news/list', async (req, res) => {
        // 方法1
        // const parent = await Category.findOne({
        //     name: '新闻资讯'
        // }).populate({
        //     path: 'children',
        //     populate: {
        //         path: 'newsList'
        //     }
        // }).lean()
        // 方法2
        const parent = await Category.findOne({name: '新闻资讯'})
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
            },
            {
                $addFields: {
                    newsList:{$slice:['$newsList',5]}
                }
            }
        ])
        const articles = await Article.find().populate('categories').lean()
        //随机选取热门分类
        cates.unshift({
            name: '热门',
            newsList:articles.sort((a,b)=>Math.random()-0.5).slice(0,5)
        })
        cates.map(cate => {
            cate.newsList.map(news => {
                news.categoryName = (cate.name === '热门') ? news.categories[0].name: cate.name
                return news
            })
            return cate
        })
        res.send(cates)
    })

    router.get('/heroes/list', async (req, res) => {
        const parent = await Category.findOne({name: '英雄分类'})
        const cates = await Category.aggregate([
            {
                $match: { parent: parent._id },
            },
            {
                $lookup: {
                    from: 'heroes',
                    localField: '_id',
                    foreignField: 'categories',
                    as: 'heroesList'
                },
            }
        ])
        const heroes = await Hero.find().lean()
        //随机选取热门分类
        cates.unshift({
            name: '热门',
            heroesList:heroes.sort((a,b)=>Math.random()-0.5).slice(0,10)
        })
        res.send(cates)
    })
    
    router.get('/articles/:id', async (req, res) => { 
        const article = await Article.findById(req.params.id).lean()
        article.related = await Article.find().where({
            categories: { $in: article.categories },
            _id: { $nin: req.params.id },
        }).limit(2)
        res.send(article)
    })

    app.use('/web/api',router)
}