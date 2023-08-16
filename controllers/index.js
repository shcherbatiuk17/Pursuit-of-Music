const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const deezerApi = require('./deezerApi'); // Adjust the path accordingly

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', async (req, res) => {
  const artistName = 'slipknot';

  try {
    const songs = await deezerApi.getTopSongsByArtist(artistName);
    res.render('trips', { songs });
  } catch (error) {
    res.render('error', { error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


module.exports = router;
