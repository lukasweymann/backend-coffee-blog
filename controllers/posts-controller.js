const postModel = require('../models/post-model');

// Example
const idProd = process.env.NODE_ENV === 'production';

const getPosts = async (req, res) => {
    try {
        const posts = await postModel.getAllPosts();

        res.send({
            error: null,
            posts: posts.rows
        });
    } catch (error) {
        res.send({
            error: idProd ? 'Sorry, internal error occurred' : error.message,
        });
    }
}

const getSinglePost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await postModel.getPostById(id);

        if (post.rows.length) {
            return res.send(post.rows[0]);
        }

        res.send({
            error: 'Post not found'
        });
    } catch (error) {
        res.send({
            error: idProd ? 'Sorry, internal error occurred' : error.message,
        });
    }
}

const deleteSinglePost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await postModel.getPostById(id);

        if (post.rows.length) {
            await postModel.deletePostById(id);
            return res.send(post.rows[0]);
        }

        res.send({
            error: 'Post not found'
        });
    } catch (error) {
        res.send({
            error: idProd ? 'Sorry, internal error occurred' : error.message,
        });
    }
}

const createSinglePost = async (req, res) => {
    const { title, text, author } = req.body;

    try {
        const post = await postModel.createPost({ title, text, author });

        if (post.rows.length) {
            return res.send(post.rows[0]);
        }

        res.send({
            error: 'Post wasn\'t returned from db'
        });
    } catch (error) {
        res.send({
            error: idProd ? 'Sorry, internal error occurred' : error.message,
        });
    }
}

const updateSinglePost = async (req, res) => {
    const { id } = req.params;
    const { title, text, author } = req.body;

    try {
        await postModel.updatePostById(id, { title, text, author });
        const post = await postModel.getPostById(id);

        if (post.rows.length) {
            return res.send(post.rows[0]);
        }

        res.send({
            error: 'Post not found'
        });
    } catch (error) {
        res.send({
            error: idProd ? 'Sorry, internal error occurred' : error.message,
        });
    }
}

module.exports = {
    getPosts,
    getSinglePost,
    createSinglePost,
    updateSinglePost,
    deleteSinglePost,
};