const express = require('express');
const uuidv4 = require('uuid/v4');
let bodyParser = require('body-parser');
let jsonParser = bodyParser.json();
const router = express.Router();

//Import the model information
const {
  ListBlogs
} = require('./blog-post-model');

router.get('/blog-posts', (req, res, next) => {
  //Ask the model for the list of all blogs
  let allBlogPost = ListBlogs.get();
  if (allBlogPost) {
    res.status(200).json({
      message: "Successfully sent the blogs",
      status: 200,
      blogs: allBlogPost
    });
  } else {
    res.status(500).json({
      message: "Internal server error",
      status: 500
    });
    return next();
  }
});

router.get('/blog-posts/:author', (req, res, next) => {
  let authorName = req.params.author;
  //Validate that there is an author passed by parameter
  if (authorName == undefined) {
    res.status(406).json({
      message: "Author not defined in parameters.",
      status: 406
    });
    return next();
  }

  let blogsArray = ListBlogs.getByName(authorName);

  if (blogsArray.length > 0) {
    res.status(200).json({
      message: "Successfully sent the author's blogs",
      status: 200,
      author: authorName,
      blogs: blogsArray
    });
  } else {
    res.status(404).json({
      message: "Author not found in blogs",
      author: authorName,
      status: 404
    });
    return next();
  }
});

router.post('/blog-posts', jsonParser, (req, res, next) => {
  let requiredField = ['title', 'content', 'author', 'publishDate'];
  for (let i = 0; i < requiredField.length; i++) {
    let currentField = requiredField[i];
    if (!(currentField in req.body)) {
      res.status(406).json({
        message: `Missing field ${currentField} in body`,
        status: 406
      });
      return next();
    }
  }

  //Obtain the information for the new blog
  let titleAux = req.body.title;
  let contentAux = req.body.content;
  let authorAux = req.body.author;
  let publishDateAux = req.body.publishDate;

  let newBlog = {
    id: uuidv4(),
    title: titleAux,
    content: contentAux,
    author: authorAux,
    publishDate: publishDateAux
  };

  ListBlogs.post(newBlog);
  res.status(201).json({
    message: "Successfully added the blog.",
    status: 201,
    newBlog: newBlog
  });

});

router.delete('/blog-posts/:id', jsonParser, (req, res, next) => {
  let idPath = req.params.id;
  let idBody = req.body.id;

  if (idPath != idBody) {
    res.status(406).json({
      message: "ID should be the same in path variable and body parameters.",
      status: 406
    });
    return next();
  }

  let isDead = ListBlogs.delete(idPath);
  if (isDead) {
    res.status(204).send();
    return next();
  } else {
    res.status(404).json({
      message: "The ID provided does not exist in the blogs.",
      status: 404
    });
    return next();
  }
});

router.delete('/blog-posts', jsonParser, (req, res, next) => {
  res.status(406).json({
    message: "Missing ID in url parameter.",
    status: 406
  });
  return next();
});

router.put('/blog-posts/:id', jsonParser, (req, res, next) => {
  let idPath = req.params.id;
  let putBlog = req.body.putBlog;

  //If no id is written
  if (idPath == undefined || idPath == "") {
    res.status(406).json({
      message: "Missing ID.",
      status: 406
    });
    return next();
  }
  //If no field to update is given in body
  if (putBlog == undefined || Object.keys(putBlog).length <= 0) {
    res.status(404).json({
      message: "No fields in body to update.",
      status: 404
    });
    return next();
  }

  let isUpdated = ListBlogs.put(idPath, putBlog);
  if (isUpdated) {
    res.status(200).json({
      message: "Succesfully updated the blog.",
      updatedBlog: putBlog,
      status: 200
    });
    return next();
  } else {
    res.status(404).json({
      message: "The ID provided does not exist in the blogs.",
      status: 404
    });
    return next();
  }

});

router.put('/blog-posts', jsonParser, (req, res, next) => {
  res.status(406).json({
    message: "Missing ID in url parameter.",
    status: 406
  });
  return next();
});

//We need to make the router visible, so lets export it
module.exports = router;
