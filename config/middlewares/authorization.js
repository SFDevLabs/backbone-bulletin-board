
/*
 *  Generic require login routing middleware
 */
exports.requiresLogin = function (req, res, next) {
  if (!req.isAuthenticated()) {
    return res.send('{status:Requires Authentication}', 404);
  }
  next()
};
/*
 *  Post authorizations routing middleware
 */
exports.post = {
    hasAuthorization : function (req, res, next) {
      if (req.post.user.id != req.user.id) {
        return res.send('{status:Requires Authentication}', 404);
      }
      next()
    }
}
/*
 *  User authorizations routing middleware
 */
exports.user = {
    hasAuthorization : function (req, res, next) {
      if (req.profile.id != req.user.id) {
        return res.send('{status:Requires Authentication}', 404);
      }
      next()
    }
}