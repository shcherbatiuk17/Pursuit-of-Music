const router = require("express").Router();

// POST route for ending a session
router.post('/', (req, res) => {
    req.session.destroy(() => {
        res.status(204).end();
    })
});

module.exports = router;