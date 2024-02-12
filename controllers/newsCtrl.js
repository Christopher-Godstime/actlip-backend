const Posts = require("../models/newsModel");

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 10;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

const newsCtrl = {
  createPost: async (req, res) => {
    try {
      const { head, content, images } = req.body;

      if (images.length === 0)
        return res.status(400).json({ msg: "Please add your photo" });

      const newPost = new Posts({
        head,
        content,
        images,
        admin: req.user._id,
      });
      await newPost.save();

      res.json({
        msg: "Create Post!",
        newPost: {
          ...newPost._doc,
          admin: req.user,
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getPosts: async (req, res) => {
    try {
      const features = new APIfeatures(Posts.find({}), req.query).paginating();
      const posts = await features.query.sort("-createdAt");

      res.json({
        msg: "Success!",
        result: posts.length,
        posts,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  viewPosts: async (req, res) => {
    try {
      const features = new APIfeatures(Posts.find({}), req.query).paginating();
      const posts = await features.query.sort("-createdAt");
      const totalPosts = await Posts.countDocuments(); // Get total number of posts
      const totalPages = Math.ceil(totalPosts / req.query.limit);

      res.json({
        msg: "Success!",
        result: posts.length,
        posts,
        totalPages,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updatePost: async (req, res) => {
    try {
      const { head, content, images } = req.body;
      const post = await Posts.findOneAndUpdate(
        { _id: req.params.id },
        {
          head,
          content,
          images,
        }
      );

      res.json({
        msg: "Post Updated",
        newPost: {
          ...post._doc,
          head,
          content,
          images,
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getPost: async (req, res) => {
    try {
      const post = await Posts.findById(req.params.id);

      if (!post)
        return res.status(400).json({ msg: "This post deos not exist" });

      res.json({ post });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  viewPost: async (req, res) => {
    try {
      const post = await Posts.findById(req.params.id);

      if (!post)
        return res.status(400).json({ msg: "This post deos not exist" });

      res.json({ post });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  deletePost: async (req, res) => {
    try {
      const post = await Posts.findOneAndDelete({
        _id: req.params.id,
      });

      res.json({
        msg: "Deleted post!",
        newPost: {
          ...post,
          admin: req.user,
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = newsCtrl;
