const mongoose = require("mongoose");

const User = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  userPic:{
    type:String,
    required: true,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  postIds:{
    type:[mongoose.SchemaTypes.ObjectId],
    ref:"posts"
  },
  commentIds:{
    type:[mongoose.SchemaTypes.ObjectId],
    ref:"comments"
  }
});

module.exports = mongoose.model("users", User);