/* fake user */

const profile = {
  'hellosamlify': {
    firstName: 'Admin',
    lastName: 'Samlify',
    login: 'hellosamlify',
    email: 'hello@samlify.com'
  }
};

module.exports.getProfileByLogin = function (login) {
  if (!profile[login]) {
    return undefined;
  }
  return profile[login];
}
