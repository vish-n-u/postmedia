const mongoose = require("mongoose");

const Post = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  
  userId:{
    type:mongoose.SchemaTypes.ObjectId,
    ref:"users"
  },
  commentIds:{
    type:[mongoose.SchemaTypes.ObjectId],
    ref:"comments"
  }
});

module.exports = mongoose.model("posts", Post);