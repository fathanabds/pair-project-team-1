const isLoggedIn = function (req, res, next) {
  if (req.session.user && req.session.user.email) {
    return next();
  }
  const error = 'You are Not Logged In';
  return res.redirect(`/user/login?error=${error}`);
};

const isNotLoggedIn = function (req, res, next) {
  const error = 'You are Already Logged In';
  if (req.session.user) {
    if (req.session.user.role == 'Doctor') {
      return res.redirect(`/medicalRecord/doctors?error=${error}`);
    } else if (req.session.user.role == 'Patient') {
      return res.redirect(`/medicalRecord/patients?error=${error}`);
    }
  } else {
    return next();
  }
};

const isPatient = function (req, res, next) {
  if (req.session.user && req.session.user.role == 'Patient') {
    return next();
  }
  const error = 'You Have No Access';
  return res.redirect(`/medicalRecord/doctors?error=${error}`);
};

const isDoctor = function (req, res, next) {
  if (req.session.user && req.session.user.role == 'Doctor') {
    return next();
  }
  const error = 'You Have No Access';
  return res.redirect(`/medicalRecord/patients?error=${error}`);
};

module.exports = { isLoggedIn, isPatient, isDoctor, isNotLoggedIn };
