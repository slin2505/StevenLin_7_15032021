const express = require("express");
const router = express.Router();
const postCtrl = require('../controllers/postCtrl');
const multer = require('../middlewares/multer');
const auth = require('../middlewares/auth');

router.get('/', postCtrl.readPost);
router.get('/:id', auth, postCtrl.readOnePost);
router.post('/', auth, multer, postCtrl.createPost);
router.put('/:id', auth, multer, postCtrl.updatePost);
router.delete('/:id', auth, postCtrl.deletePost)

router.post('/getLikes', auth, postCtrl.getLikeforPost);
router.post('/likeDislike', auth, postCtrl.likeDislikePost);
router.post('/likedByUser', auth, postCtrl.likedByUser);

module.exports = router;