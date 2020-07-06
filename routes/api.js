const express = require('express');
const createJWTMiddleware = require('express-jwt');
const postsController = require('../controllers/posts-controller');

const router = express.Router();
const jwtMiddleware = createJWTMiddleware({ secret: process.env.JWT_SECRET });

// [C]reate route
router.post('/posts', jwtMiddleware, postsController.createSinglePost);

// [R]ead route
router.get('/posts/:id', postsController.getSinglePost);
router.get('/posts', postsController.getPosts);

// [U]pdate route
router.put('/posts/:id', jwtMiddleware, postsController.updateSinglePost);

// [D]elete route
router.delete('/posts/:id', jwtMiddleware, postsController.deleteSinglePost);

module.exports = router;