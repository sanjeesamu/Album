"use strict";

var checkUser = function checkUser(req, res, next) {
  if (!req.query.user) {
    return res.status(401).send('Unauthorized');
  }

  next();
};

module.exports = checkUser;