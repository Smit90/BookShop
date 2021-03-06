const express = require('express')
const router = express.Router()

const { create, productById, list, read, remove, update, listRelated, listCategories, listBySearch, listSearch, photo } = require('../controllers/product')
const { requireSignin, isAdmin, isAuth } = require('../controllers/auth');
const { userById } = require('../controllers/user');

router.get('/product/:productId', read)
router.get('/products', list)
router.get('/products/related/:productId', listRelated)
router.get('/products/categories', listCategories)
router.get('/product/photo/:productId', photo)
router.post('/products/by/search', listBySearch)
router.get('/products/search', listSearch)

router.post('/product/create/:userId', requireSignin, isAdmin, isAuth, create)
router.delete('/product/:productId/:userId', requireSignin, isAdmin, isAuth, remove)
router.put('/product/:productId/:userId', requireSignin, isAdmin, isAuth, update)

router.param("userId", userById)
router.param("productId", productById)


module.exports = router