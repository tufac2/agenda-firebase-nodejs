const { db, sgMail } = require('../utils/admin')
const { initializeEvent, validateArgCreateEvent } = require('../utils/eventUtil')

const dbReference = db.collection('events')

exports.createEvent = (req, res) => {
  debugger
  const { valid, errors } = validateArgCreateEvent(req.body)
  if(!valid) return res.status(501).json({
    message: 'Data Validation Errors in Create Event',
    errors
  })

  const eventData = initializeEvent(req.body)

  dbReference.add(eventData)
  .then(docRef => {
    return res.status(200).json({
      message: `Document ${docRef.id} is created`
    })
  }).catch(err => {
    return res.status(500).json({
      message: "Error creating new event in CreateEvent",
      err
    })
  })
}

exports.readEvent = (req, res) => {
  dbReference.get()
  .then(snapshot => {
    let response = []
    let document = {}
    snapshot.forEach(doc => {
      document.id = doc.id
      response.push(Object.assign(document, doc.data()))
      document = {}
    })
      return res.status(200).json(response)
  }).catch(err => {
    return res.status(500).json(err)
  })
}

exports.updateEvent = (req, res) => {
  const { valid, errors, dummyEvent } = validateUpdateEvent(req.body)
  if(!valid) return res.status(501).json({
    message: 'Data Validation Errors in Update Event',
    errors
  })
 
  dbReference.doc(req.body.id).update(dummyEvent)
  .then(docRef => {
    return res.status(200).json({
      message: `Event ${req.body.id} has been yodated`
    })
  }).catch(err => {
    return res.status(500).json({
      message: 'Error updating event in updateEvent',
      err
    })
  })
}

exports.deleteEvent = (req, res) => {
  dbReference.doc(req.query.id).delete()
  .then(() => {
    return res.status(200).json({
      message: `Document ${req.query.id} successfully deleted`
    })
  }).catch(err => {
      return res.status(500).json({
        message: 'Error deleting document in deleteEvent',
        err
      })
  })
}

exports.getOfferDetail = (req, res) => {
  let reference = db.doc(`jobs/${req.query.id}/`).collection('offer_detail').get()
  .then((QuerySnapshot) => {
    if(QuerySnapshot.docs.length > 1) {
      return res.status(500).json({
        message: "Many Descriptions for same object"
      })
    }else{
      return res.status(200).json(QuerySnapshot.docs[0].data())
    }
    return res.status(200).json
  }).catch(err => {
    return res.status(200)
  })
}

exports.sendEmail = (req, res) => {
  const msg = {
    to: req.body.email,
    from: req.body.from,
    subject:  req.body.subject,
    templateId: req.body.templateId
  }

  sgMail.send(msg)
    .then((response) => {
      return res.send("email sent")
    })
    .catch(err => res.send(err))
}
