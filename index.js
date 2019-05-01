const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const mongodb = require('mongodb');
const assert = require('assert'); 
const port = process.env.PORT || 5005;
const MongoClient = require('mongodb').MongoClient;
const notesApi = require('./Routes/notes/notes');

let app = express();

let uri;


if(process.env.ENVIRONMENT==='production'){
	uri = process.env.MONGODB_URI;
}else{
	require('dotenv').config();
	uri = 'mongodb://localhost:27017';
}



app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


app.use('/api/notes', notesApi);


app.get('/', (req,res)=>{
	res.send('Welcome to jotti ...');
});




// Initialize connection once

MongoClient.connect(uri,{ useNewUrlParser: true }, (err, client)=> {

  assert.equal(null, err);
  console.log("Successfully connected to database\n");

  app.locals.db = client.db(process.env.DB_NAME);

  // Start the application after the database connection is ready
	
  app.listen(port, ()=>{
	  console.log(`===Listening on port ${port}===`);
  });

});

