var express = require('express');
var router = express.Router();
const { signIn } = require('../controllers/user.js');

/* GET users listing. */
router.get('/signin', signIn);

module.exports = router;
