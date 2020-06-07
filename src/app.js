// SET UP EXPRESS
const bodyParser = require('body-parser')
const app = require('express')()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// UTILS
const FBAuth = require('./utils/fbauth')
const { db } = require('./utils/admin')

// HANDLERS
const { createEvent, readEvent, updateEvent, deleteEvent } = require('./handlers/event') 
const { createUser, login, logout, getUsers, getAuthenticatedUser } = require('./handlers/users')

// ENABLE CORS - Automatically allow cross-origin requests
const cors = require('cors')
app.use(cors({ origin: true }));

// User Routes
app.post('/createUser', createUser)
app.post('/login', login)
app.post('/logout', logout)
app.get(`/users`, FBAuth, getAuthenticatedUser)

// Event Routes
app.get(`/readEvent`, readEvent)
app.post(`/createEvent`, createEvent)
app.post(`/updateEvent`, updateEvent)
app.delete(`/deleteEvent`, deleteEvent)


module.exports = app