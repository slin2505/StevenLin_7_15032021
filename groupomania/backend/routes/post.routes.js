const express = require("express");
const router = express.Router();
const postCtrl = require('../controllers/postCtrl');
const multer = require('../middlewares/multer');

router.get('/', postCtrl.readPost);
router.get('/:id', postCtrl.readOnePost);
router.post('/', multer, postCtrl.createPost);
router.put('/:id', multer, postCtrl.updatePost);
router.delete('/:id', postCtrl.deletePost)

router.post('/:id/getLikes', postCtrl.getLikeforPost);
router.put('/:id/likeDislike', postCtrl.likeDislikePost);
router.post('/:id/likedByUser', postCtrl.likedByUser);

module.exports = router;