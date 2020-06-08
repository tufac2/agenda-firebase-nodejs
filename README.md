# Description

Backend service of landing page for HR-e-voluition. The topics covered by this project are:
1. Register New Users with Firebase SDK and replicating them in DB
2. CRUD for and agenda's events

# Getting Started

```npm install```

```npm run dev``` This will run the server locally with hot reabuild as you modify

```firebase deploy``` Whill deploy the Cloud Functions to Firebase

## Sendgrid
Marketing email platform. We are using a free account wiht the user tufac2@gmail.com. We can only send up to 100 emails per day. To upgrade in future.

**Sendgrid** has its own API for sending SMPT emails. There are severals APIs for sending email. In order to be faster we are using V3 as guidance but we will send the **emails via http** for the moment.


### Configure Environment Variables for Firebase
We beed to save the API keys in a secure way in order to avoid to share this with other people. In order to do so we are setting new environment variables in Firebase. **Ask for API key** as this is not shared any part along the project.

```firebase functions:config:set sendgrid.key=KEY```

## Firebase
Database and Backend. This is a serverless application so we are using NoSQL database for storage our data and CloudFunctions to run our backend.

You need **a config.json** file with your credentials that can be find in your firebase console. In this repository you can find a **config_Example.json** to use as a reference to know what you need before running the project.

### Firestore Why NoSQL

The noSQL Database of Firebase. This kind of databases allows to create non-relational Docuents (no tables anymore :-)).

For example, I can create a Collection called CARS where I will store some cars. Then I can have as many documents inside that collection, one for each car. However, every document may have different data types.

The other aspect to use NoSQL database is that it is easy to maintain. You do not need to migrate things. Just create new Collections and that's all.

### CloudFunctions
Our code is running in the Server. As soon as our functions are invoked with an **http request** that function will run in the server and provide us with the required data.

The pros, is that we do not have to take care of the server maintenance. We just need to write our NodeJS code for the functions and Firesbase will take all the maintanance part.

#### HTTP CODE LIST FOR RESPONSES
**under review because right now the codes are not align in the response**

#POST
409. Resource already exists
201. No problem. Data not found
202. No problem. Data already in use. Not possible to insert in data base

#PUT
Need to add a PUT method

#GENERAL
200. Request OK
200. Request OK but no content found
403. Unauthorized. The user has not token
404. Not found

#SIGNUP
409. The user is already taken

#LOGIN
405. Wrong/empty email or empty email. Preventing login manipulated data.
404. Resource not found. User does not exist in database

