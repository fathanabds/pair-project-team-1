const isLoggedIn = function (req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  }
  req.session.returnTo = req.originalUrl;
  return res.redirect("/login");
};

module.exports = { isLoggedIn };
