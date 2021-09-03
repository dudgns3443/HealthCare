const express = require('express')

const app = express()

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const url = `mongodb+srv://hyperlogic:6408@healthcare.s6oc1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://3.34.133.128');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

MongoClient.connect(url,(e,client)=>{
  app.get('/data',(req,res)=>{
    console.log(req.query)
    const post = req.query
    const db = client.db('caseup')
    db.collection('posts').insertOne(post)
  })

  app.get('/getPosts',(req,res)=>{
    const db = client.db('caseup')
    var result
    db.collection('posts').find({}).toArray((err,docs) =>{
      res.send(docs)
    })
  })
})

app.listen(8100)