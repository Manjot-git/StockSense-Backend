const express = require('express');
const { Signup, Login, Logout } = require('../controllers/UserController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.post('/signup', Signup);
router.post('/login', Login);
router.get("/logout", Logout);

//  auth-check route
router.get('/validate', requireAuth, (req, res) => {
  res.status(200).json({ message: 'User is authenticated', userId: req.userId });
});

module.exports = router;
