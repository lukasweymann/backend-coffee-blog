const express = require('express');
const router = express.Router();

const blog = require('./blog-data.json');

router.get('/:id/:info', function (req, res) {
    const { id, info } = req.params;

    const idAsNumber = parseInt(id, 10);

    const foundBlogArticle = blog.find((singleBlogArticle) => {
        return singleBlogArticle.id === idAsNumber;
    });

    res.send(foundBlogArticle[info]);
});

router.get('/:id', function (req, res) {
    const { id } = req.params;

    const idAsNumber = parseInt(id, 10);

    const foundBlogArticle = blog.find((singleBlogArticle) => {
        return singleBlogArticle.id === idAsNumber;
    });

    res.send(foundBlogArticle);
});

router.get('/', function (req, res) {
    res.send(blog);
});

module.exports = router;