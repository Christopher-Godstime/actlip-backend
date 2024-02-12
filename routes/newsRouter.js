const router = require("express").Router();
const newsCtrl = require("../controllers/newsCtrl");
const auth = require("../middleware/auth");

router.route("/posts").post(auth, newsCtrl.createPost).get(newsCtrl.getPosts);

router.route("/news").get(newsCtrl.viewPosts);

router
  .route("/post/:id")
  .patch(auth, newsCtrl.updatePost)
  .get(newsCtrl.getPost)
  .delete(auth, newsCtrl.deletePost);

router.route("/news/:id").get(newsCtrl.viewPost);

module.exports = router;
