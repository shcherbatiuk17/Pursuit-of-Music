const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');
const deezerApi = require('./deezerAPI'); // Adjust the path accordingly

// Route to render the homepage
router.get('/', async (req, res) => {
  try {
    res.render('homepage', {
      logged_in: req.session.logged_in,
      user_id: req.session.user_id
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to render the dashboard page and authenticate the user is signed in
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });

    const user = userData.get({ plain: true });
    res.render('dashboard', {
      ...user,
      logged_in: true,
      user_id: req.session.user_id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/dashboard', withAuth, async (req, res) => {
  try {
    // Get the artist name from the form
    const artistName = req.body.artistName;

    // Fetch top songs by the artist using the deezerApi module
    const songs = await deezerApi.getTopSongsByArtist(artistName);

    // Render the dashboard view with the retrieved songs
    res.render('dashboard', {
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
      songs
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to render the login page
router.get('/login', (req, res) => {
  if (req.session.user_id) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

// Route to render the signup page
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard')
    return
  }
  res.render('signup')
})

  
module.exports = router;
