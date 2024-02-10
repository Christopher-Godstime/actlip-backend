const router = require("express").Router();
const newsCtrl = require("../controllers/newsCtrl");
const auth = require("../middleware/auth");

router
  .route("/posts")
  .post(auth, newsCtrl.createPost)
  .get(auth, newsCtrl.getPosts);

router
  .route("/post/:id")
  .patch(auth, newsCtrl.updatePost)
  .get(auth, newsCtrl.getPost)
  .delete(auth, newsCtrl.deletePost);

module.exports = router;
