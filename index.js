const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongodb = require('mongodb');
const port = process.env.PORT || 5005;
const server = express();
const MongoClient = require('mongodb').MongoClient;
let db;
let uri;

if(process.env.ENVIRONMENT==='production'){
	uri = process.env.MONGODB_URI;
}else{
	uri = 'mongodb://localhost:27017';
}



server.use(helmet());
server.use(cors());
server.use(express.json());


server.get('/', (req,res)=>{
	res.send('Welcome to jotti ...');
});


// Initialize connection once

MongoClient.connect(uri,{ useNewUrlParser: true }, (err, database)=> {
  if(err) throw err;

  db = database;

  // Start the application after the database connection is ready
	
  server.listen(port, ()=>{
	  console.log(`===Listening on port ${port}===`);
  });

});

