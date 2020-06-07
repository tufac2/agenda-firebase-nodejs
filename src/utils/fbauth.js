const { admin } = require('./admin')
module.exports = (req, res, next) => {
  let idToken
  if(req.headers.authorization && req.headers.authorization.startsWith('Baarer ')){
    idToken = req.headers.authorization.split('Baarer ')[1]
  } else {
    console.error('No token found - Unauthorized')
    return res.status(403).json({ error: 'Unauthorized'})
  }

  admin
    .auth()
    .verifyIdToken(idToken)
    .then(decodedToken => {
      req.user = decodedToken
      console.log(req.user.uid)
      return next()
    })
    .catch(err => {
      console.error('Error while verifyin token')
      return res.status(403).json({message: "Error verifying token", err})
    })
}