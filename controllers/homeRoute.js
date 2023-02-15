const router = require('express').Router();
const { BlogPost, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// this will get all of the posts w/ user data and render to homepage
router.get('/', async (req, res) => {
  try {
    const blogPostData = await BlogPost.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });
    // serialize the data
    const blogPosts = blogPostData.map((blogPost) =>
      blogPost.get({ plain: true })
    );
    // pass the data into handlebars
    res.render('homepage', {
      blogPosts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// finds posts by id and renders to page
router.get('/post/:id', async (req, res) => {
  try {
    const blogPostData = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          attributes: ['comment_body', 'user_id'],
        },
      ],
    });

    const blogPost = blogPostData.get({ plain: true });
    console.debug({ blogPost });
    blogPost.comments.forEach((comment) => {
      comment.user = blogPost.users.find((user) => user.id === comment.user_id);
    });

    res.render('post', {
      ...blogPost,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// gets the profile of user when logged in
router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: BlogPost }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// if user is logged in, go to profile page, if not, go to login page
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
