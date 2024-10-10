const isLoggedIn = function (req, res, next) {
  if (req.session.user && req.session.user.email) {
    return next();
  }
  // req.session.returnTo = req.originalUrl;
  const error = 'You are Not Logged In';
  return res.redirect(`/login?error=${error}`);
};

module.exports = { isLoggedIn };
