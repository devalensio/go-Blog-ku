const User = require('../models/user');
const FB = require('fb');
const token = require('../middlewares/token');

module.exports = {
    signIn(req, res) {
        FB.setAccessToken(req.headers.token);
        FB.api('me', {fields: ['id' , 'name', 'email', 'gender', 'picture'], access_token: req.headers.token}, function(userData) {
          res.status(200)
              .json({
                  name: userData.name,
                  avatar: userData.picture.data.url
              })
        })
    }
};
