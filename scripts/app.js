
express = require('express')
app = express()
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const url = `mongodb+srv://hyperlogic:6408@healthcare.s6oc1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

MongoClient.connect(url)
  .then(client => {
    console.log('mongo connected');
    console.log(client);  
  })
  .then(() => {
    console.log('mongo activate')
  })
  .catch(err => console.log(err));