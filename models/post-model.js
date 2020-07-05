const { pool } = require('./db-connector');

const getAllPosts = () => {
    return (
        pool.query(`
            SELECT id, image, title, text, author, timestamp FROM posts ORDER BY timestamp;
        `)
    )
};

const createPost = ({ title, text, author }) => {
    return (
        pool.query(
            'INSERT INTO posts(title, text, author, timestamp) VALUES($1, $2, $3, $4) RETURNING *',
            [title, text, author, new Date()]
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

const updatePostById = (id, { title, text, author } = {}) => {
    if (title || text || author) {
        return pool.query(`
            UPDATE posts
            SET title=$1, text=$2, author=$3
            WHERE id=$4;
        `, [title, text, author, id])
    }
};

module.exports = {
    getAllPosts,
    getPostById,
    updatePostById,
    createPost,
    deletePostById,
};