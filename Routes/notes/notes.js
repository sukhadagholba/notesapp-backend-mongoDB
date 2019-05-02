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
        const ObjectId = require('mongodb').ObjectId;

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
});


router.post('/', upload.single('file'), async (req, res) => {
  try {
    const db = await req.app.locals.db;
    //console.log('req.file.path', req.file.path);

    const { title, content } = req.body;
    let imgUrl="";

        if(req.file){

        cloudinary.uploader.upload(req.file.path,(result) =>{
                console.log('result inside cloudinary', result);
                imgUrl = result.secure_url;
        })
        .then(() =>{

        console.log(imgUrl);
        const image=imgUrl;
        const note = {title, content, image};

        db.collection('notes').insertOne({title, content, image})
        .then(result => {
                res.status(200).json(result.insertedId);
        })
        .catch(err => {
                res.status(500).json(err.message);
        })
        })
}else{
        console.log('inside else');

        db.collection('notes').insertOne({title, content })
        .then(result => {
                res.status(200).json(result.insertedId);
        })
        .catch(err => {
                console.log(err);
                res.status(500).json(err);
        })
        }

  } catch (err) {
    console.log(err);
    res.status(500).json({error: err});
  }
});

router.delete('/:id', async (req, res) => {
try{
        const db = await req.app.locals.db;
        const {id} = req.params;
        const ObjectId = require('mongodb').ObjectId;

        db.collection('notes').deleteOne({_id: new ObjectId (req.params.id)})
        .then(deletedDocument => {
                res.status(200).json(deletedDocument);
        })
        .catch(error => {
                res.status(500).json({error: error.message});
        })
}catch(err){
    console.log(err);
    res.status(500).json({error: err});
}
});

module.exports = router;
