const Router = require('express')
const userController = require('../contoller/user.controller')
const router = new Router()

router.post('/user/create', userController.createUser)
router.post('/user/check', userController.checkUser)
router.put('/user/update', userController.updateUser)
router.delete('/user/delete', userController.deleteUser)
router.post('/washlist_and_wallet', userController.getWashlistAndWallet)
router.post('/change_washlist', userController.changeWashlist)
router.post('/change_wallet', userController.changeWallet)
module.exports = router