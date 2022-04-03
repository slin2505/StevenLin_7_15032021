const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/commentCtrl');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer');

router.get('/', auth, commentCtrl.readPostComment);
router.get('/:id', auth, commentCtrl.readOneComment);
router.get('/count/:id', auth, commentCtrl.countComment);
router.post('/', auth, multer, commentCtrl.createComment);
router.put('/:id', auth, multer, commentCtrl.updateComment);
router.delete('/:id', auth, commentCtrl.deleteComment)

module.exports = router;