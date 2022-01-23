const express = require('express')
const router = express.Router()
const Blog = require('../models/blogs')
const blogController = require('../controllers/blogController')

router.get('/', blogController.blog_index)
router.get('/:id', blogController.blog_content) 

module.exports = router