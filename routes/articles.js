const express = require('express')
const router = express.Router()
const Articles = require('../models/articles')


//request to GET all articles
router.get('/', (req, res) =>{
    Articles.find()
    .then(article  => res.json(article))
    .catch(err => res.status(400).json(`Error: ${err}`))
})

//request to ADD all articles
router.post('/add', (req,res) =>{
    const newArticle = new Articles({
        title: req.body.title,
        article: req.body.article,
        authorname: req.body.authorname
    })
    newArticle.save().then(()=> res.json("the new article posted successfully"))
    .catch(err =>{res.status(400).json(`Error: ${err}`)})
})


//find article by id
router.get('/:id', (req,res) =>{
    Articles.findById(req.params.id)
    .then((article) => res.json(article))
    .catch(err=>res.status(400).json(`Error: ${err}`))
})


//find article by id and update
router.put('/update/:id', (req,res)=>{
    Articles.findById(req.params.id)
    .then(article =>{
        article.title = req.body.title,
        article.article = req.body.article,
        article.authorname = req.body.authorname

        article
        .save()
        .then(() =>res.json("The article is updated successfully"))
        .catch(err =>res.status(400).json(`Error: ${err}`))
    })
    
})

//find article by id and delete
router.delete('/delete/:id', (req,res)=>{
    Articles.findByIdAndDelete(req.params.id)
    .then(() => res.json('The article is deleted successully'))
    .catch(err => res.status(400).json(`Error: ${err}`))
})

module.exports = router



