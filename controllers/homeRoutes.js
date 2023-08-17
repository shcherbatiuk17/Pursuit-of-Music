const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');
const deezerApi = require('./deezerApi'); // Adjust the path accordingly

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

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });

    const user = userData.get({ plain: true });
    const artistName = 'slipknot';
    let songs;
    try {
       songs = await deezerApi.getTopSongsByArtist(artistName);
    } catch (error) {
      res.render('error', { error: error.message });
    }
    res.render('dashboard', {
      ...user,
      logged_in: true,
      user_id: req.session.user_id,
      songs
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/songs', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });

    const user = userData.get({ plain: true });
    const artistName = req.body.artistName;
    let songs;
    try {
       songs = await deezerApi.getTopSongsByArtist(artistName);
       console.log(songs)
    } catch (error) {
      res.render('error', { error: error.message });
    }
    res.render('dashboard', {
      ...user,
      logged_in: true,
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
