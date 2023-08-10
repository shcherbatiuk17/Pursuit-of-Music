const router = require('express').Router();
const { User } = require('../models');

router.get('/', async (req, res) => {

    res.render('homepage', {
    });

});

router.get('/signup', (req, res) => {
  res.render('signup');
});


router.get('/', async (req, res) => {
    res.render('trips', {
    });
});

router.get('/logout', (req, res) => {
  res.render('/');
  //})
});

module.exports = router;