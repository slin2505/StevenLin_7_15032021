const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, process.env.PASSWORDTOKEN, async (err, decodedToken) => {
        if (err) {
            console.log(err);
            res.send(200).json('no token')
        } else {
            res.locals.userId = decodedToken.userId
            next();
        }
      });
    } else {
      console.log('No token');
    }
  };