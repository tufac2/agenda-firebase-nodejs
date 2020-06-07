const { db } = require('../utils/admin')
const config = require('../utils/config')
const firebase = require('firebase')
const { admin } = require('../utils/admin')

firebase.initializeApp(config)

const { validateSignupData, validateLoginData } = require('../utils/userUtil')


const firebaseCreateUser = (user) => {
  return new Promise((resolve, reject) => {
    let response = {}
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(data => {
        return data.user.getIdToken()
        .then((token) =>{
          user.userId = data.user.uid
          response.userId = user.userId
          response.token = token
          db.collection('users').doc(user.userId).set(user)
          .then(token => {
            resolve(response)
          })
        })
      })
      .catch(err => {
        reject(err)
      })
  })
}


const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    let reference = db.collection('users')
    let query = reference.where(`email`, '==', `${email}`).get()
    .then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })  
  })
}

exports.createUser = (req, res) => {
  const dummyUser = {
    email: req.body.email,
    password: req.body.password,
    name: req.body.name || null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userId: null
  }

  const { valid, errors } = validateSignupData(dummyUser)

  if(!valid) return res.status(400).json(errors)

  firebaseCreateUser(dummyUser)
    .then(token => {
      return res.status(200).json(token)
    })
    .catch(err => {
      if(err.code === "auth/email-already-in-use"){
        return res.status(201).json({ message: `User already taken`, error: err})
      }else{
        return res.status(500).json({ message: `error creating user in create user`, error: err})
      }
    })
}

exports.login = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password   
  }

  const { valid, errors } = validateLoginData(user)

  if(!valid) return res.status(400).json(errors)

  firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then(data => {
      return data.user
    })
    .then(userData => {
      return res.json(userData)
    })
    .catch(err => {
      if(err.code === 'auth/wrong-password'){
        return res.status(403).json({ general: 'Wrong credentials, please try again' })
      }
      if(err.code === 'auth/user-not-found'){
        return res.status(404).json({ general: 'User does not exist'})
      }
      return res.status(500).json({message: "Error when login", err})
    })
}

exports.logout = (req, res) => {
  firebase.auth().signOut()
    .then(res => {
      return res.status(200).json({message:"User properly logged out"})
    }).catch(err => {
      return res.status(500).json({message:"error when logging out", error: err})
    })
}

exports.getAuthenticatedUser = (req, res) => {
  let userData = {}
  db.doc(`/users/${req.query.userId}`).get()
    .then(doc => {
      if(doc.exists){
        userData.credentials = doc.data()
        return res.status(200).json(userData)
      }
      else{
        return res.status(500).json({ message: 'User is not properly set', error: err})
      }
    }).catch(err =>{
      return res.status(500).json({ message: 'wrong request', error: err})
      console.error(err)
    })
}

exports.firebaseCreateUser = firebaseCreateUser
exports.getUserByEmail = getUserByEmail
