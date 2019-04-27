const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const port = process.env.PORT || 5005;
const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());


server.get('/', (req,res)=>{
	res.send('Welcome to jotti ...');
});


server.listen(port, ()=>{
	console.log(`===API listening at ${port}===`);
});
