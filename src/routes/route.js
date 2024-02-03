const router = require('express').Router();
const userController = require('../controllers/user.controller');
const {verifyToken} = require('../middlewares/index')
const validator = require('../middlewares/validate')

router.post('/signup',validator.signUp, userController.signup);
router.post('/login',validator.login, userController.login);

router.get('/users',verifyToken,userController.getUsers);
router.get('/get-profile',verifyToken,userController.getUserProfile);
router.put('/update-profile',verifyToken,userController.updateUser);
router.delete('/delete-profile',verifyToken,userController.deleteUser);

module.exports = router