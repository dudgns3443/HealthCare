const express = require('express')

const app = express()

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const url = `mongodb+srv://hyperlogic:6408@healthcare.s6oc1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
// const bodyParser = require('body-parser')
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://192.168.0.27:5500');

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
// app.use(bodyParser)

MongoClient.connect(url,(e,client)=>{
  console.log('mongoDB connect.')
  
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

  app.get('/signUp',(req,res)=>{
    const db = client.db('caseup')
    console.log(req.query)
    db.collection('userInfo').find({userId : req.query.userId}).toArray((err,docs)=>{
      
      if(docs.length>0){
        res.send('이미 사용중인 아이디입니다.')
      }
      else{
        db.collection('userInfo').insertOne(req.query)
        res.cookie('userId',req.query.userId,{maxAge:3000})
        res.send(true)
      }
    })
  })

  app.get('/signIn',(req,res) => {
    const db = client.db('caseup')
    db.collection('userInfo').find(req.query).toArray((err,docs)=>{
      console.log(req.query)
      if(docs.length == 0)
        res.send(false)
      else
        res.send(true)
    })
  })



})

app.listen(8100)