const mongoose = require("mongoose");

const Comment = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  
  userId:{
    type:mongoose.SchemaTypes.ObjectId,
    ref:"users"
  },
  postId:{
    type:mongoose.SchemaTypes.ObjectId,
    ref:"posts"
  }
});

module.exports = mongoose.model("comments", Comment);