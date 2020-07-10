const { pool } = require('./db-connector');

const getAllPosts = () => {
    return (
        pool.query(`
            SELECT id, image_url, title, content, author, timestamp FROM posts ORDER BY timestamp;
        `)
    )
};

const createPost = ({ image_url, title, content, author }) => {
    return (
        pool.query(
            'INSERT INTO posts(image_url, title, content, author, timestamp) VALUES($1, $2, $3, $4, $5) RETURNING *',
            [image_url, title, content, author, new Date()]
        )
    )
};

const getPostById = (id) => {
    return (
        pool.query(`
            SELECT * FROM posts WHERE id=$1;
        `, [id])
    )
};

const deletePostById = (id) => {
    return (
        pool.query(`
            DELETE FROM posts WHERE id=$1;
        `, [id])
    )
};

const updatePostById = (id, { image_url, title, content, author } = {}) => {
    if (title || content || author) {
        return pool.query(`
            UPDATE posts
            SET image_url=$1, title=$2, content=$3, author=$4
            WHERE id=$5;
        `, [image_url, title, content, author, id])
    }
};

module.exports = {
    getAllPosts,
    getPostById,
    updatePostById,
    createPost,
    deletePostById,
};