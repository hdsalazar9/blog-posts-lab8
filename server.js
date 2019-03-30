//Héctor David Salazar Schz A01207471
let bodyParser = require('body-parser');
let jsonParser = bodyParser.json();
const express= require('express');
const app = express();
const blogsRouter = require('./blog-post-router');

app.use('/blogposts/api', jsonParser, blogsRouter);

app.listen(8080, () =>{
	console.log("Your app is running in port 8080");
});
