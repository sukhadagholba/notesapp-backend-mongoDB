const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: __dirname + '/files/' });
const fs = require('fs');
const cloudinary = require('cloudinary');
require('dotenv').config();

cloudinary.config({
  cloud_name:process.env.cloud_name,
  api_key:process.env.api_key,
  api_secret:process.env.api_secret
});


router.get('/', async (req, res) => {
  try {
    const db = await req.app.locals.db;
    
   db.collection('notes').find({}).toArray()
   .then(items => {
    	res.status(200).json(items);
   })
   .catch(err => {
  	res.status(500).json(err);
   })

  } catch (err) {
    res.status(500).json({error: err.message});
  }
});


router.get('/:id', async (req, res) => {
try{    
        const db = await req.app.locals.db;
        const {id} = req.params;
	//const query = 
        var ObjectId = require('mongodb').ObjectId;

        db.collection('notes').findOne({_id: new ObjectId (req.params.id)})
        .then(result => {
                res.status(200).json(result);
        })
        .catch(error => {
                res.status(500).json({error: error.message});
        })
}catch(err){
    console.log(err);
    res.status(500).json({error: err});
}
})


module.exports = router;
