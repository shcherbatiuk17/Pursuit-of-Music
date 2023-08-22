const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');

// GET route for finding a user by their id
router.get("/:id", async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      attributes: {
        exclude: ["password"],
      },
    });
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  };
});

// POST route to create a new user 
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Your password must be at least 8 characters.' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json({ message: 'Your password must be at least 8 characters.' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Not a valid email, try again.' })
      return
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      userData.password
    );

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect password!' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'Now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
