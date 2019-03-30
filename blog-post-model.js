const uuidv4 = require('uuid/v4');

let blogsArray = [
  {
    id: uuidv4(),
    title: "Blog title 1",
    content: "Interesting blog content",
    author: "JustName",
    publishDate: new Date()
  },
  {
    id: uuidv4(),
    title: "Blog title 2",
    content: "Even more interesting blog content",
    author: "FancyAuthor",
    publishDate: new Date()
  },
  {
    id: uuidv4(),
    title: "Blog title 3",
    content: "Such an amazing blog content",
    author: "FancyName",
    publishDate: new Date()
  },
  {
    id: uuidv4(),
    title: "Blog title 4",
    content: "How to make cookies while being sleep",
    author: "Roger",
    publishDate: new Date()
  },
  {
    id: uuidv4(),
    title: "Blog title 5",
    content: "How to make cookies while being awake",
    author: "Roger",
    publishDate: new Date()
  }
];

//Simulate querys
const ListBlogs = {
  get : function(){
    return blogsArray;
  },

  getByName : function(authorName){
    let returnArr = [];
    blogsArray.forEach(item =>{
      if(item.author == authorName){
        returnArr.push(item);
      }
    });
    return returnArr;
  },

  verifyID : function(idToCheck){
    blogsArray.forEach(item =>{
      if(item.id == idToCheck)
        return true;
    });
    return false;
  },

  post : function(newBlog){
    blogsArray.push(newBlog);
  },

  delete : function(idToDelete){
    for(let i=0; i < blogsArray.length; i++){
      if(blogsArray[i].id == idToDelete){
        //Delete the found blog
        blogsArray.splice(i,1);
        return true;
      }
    }
    return false;
  },

  put : function(idToUpdate, blogUpdate){
    //Check if the id exists and update the object with assing
    for(let i=0; i < blogsArray.length; i++){
      if(blogsArray[i].id == idToUpdate){
        Object.assign(blogsArray[i], blogUpdate);
        return true;
      }
    }
    return false;
  }
}

module.exports = {ListBlogs};
