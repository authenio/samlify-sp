/* fake user */

const profile = {
  'hellosamlify': {
    firstName: 'Samuel',
    lastName: 'Saml',
    login: 'samuel',
    email: 'samuel@samlify.com'
  }
};

module.exports.getProfileByLogin = function (login) {
 if (!profile[login]) {
    return undefined;
  }
  return profile[login];
}
