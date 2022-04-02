const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/authCtrl');
const userCtrl = require('../controllers/userCtrl');
const passwordValidator = require('../middlewares/passwordValidator');
const multer = require('../middlewares/multer');
const auth = require('../middlewares/auth');

// Auth
router.post('/register', passwordValidator.ctrl, authCtrl.register);
router.post('/login', authCtrl.login);
router.get('/logout', authCtrl.logout);

// CRUD User
router.get('/', userCtrl.getAllUsers);
router.get('/:id', auth, userCtrl.getOneUser);
router.put('/:id', auth, multer,  passwordValidator.ctrl, userCtrl.updateUser);
router.delete('/:id', auth, userCtrl.deleteUser);

module.exports = router;