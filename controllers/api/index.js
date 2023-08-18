const router = require('express').Router();
const userRoutes = require('./userRoutes');
const logoutRoute = require("./logoutRoute");


router.use('/users', userRoutes);
router.use("/logout", logoutRoute);

module.exports = router;
