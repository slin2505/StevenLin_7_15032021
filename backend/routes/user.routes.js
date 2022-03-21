const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/authCtrl');
const userCtrl = require('../controllers/userCtrl');
const passwordValidator = require('../middlewares/passwordValidator');
const multer = require('../middlewares/multer');

// Auth
router.post('/register', passwordValidator.ctrl, authCtrl.register);
router.post('/login', authCtrl.login);
router.get('/logout', authCtrl.logout);

// CRUD User
router.get('/', userCtrl.getAllUsers);
router.get('/:id', userCtrl.getOneUser);
router.put('/:id', passwordValidator.ctrl, multer, userCtrl.updateUser);
router.delete('/:id', userCtrl.deleteUser);

module.exports = router;