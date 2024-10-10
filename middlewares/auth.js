const isLoggedIn = function (req, res, next) {
  if (req.session.user && req.session.user.email) {
    return next();
  }
  const error = 'You are Not Logged In';
  return res.redirect(`/user/login?error=${error}`);
};

const isPatient = function (req, res, next) {
  if (req.session.user && req.session.user.role == 'Patient') {
    return next();
  }
  const error = 'You Have No Access';
  return res.redirect(`/medicalRecord/patients/${req.session.user.id}?error=${error}`);
};

const isDoctor = function (req, res, next) {
  if (req.session.user && req.session.user.role == 'Doctor') {
    return next();
  }
  const error = 'You Have No Access';
  return res.redirect(`/medicalRecord/doctors/${req.session.user.id}?error=${error}`);
};

module.exports = { isLoggedIn, isPatient, isDoctor };
