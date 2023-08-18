const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');
const deezerApi = require('./deezerAPI'); // Adjust the path accordingly

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

router.get('/login', (req, res) => {
  if (req.session.user_id) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard')
    return
  }
  res.render('signup')
})

  
module.exports = router;
