const Post = require('../model/post.model')
const Comment = require('../model/comment.model')

exports.getAllPost = async(req,res)=>{
    try{
        const allposts = await Post.find().populate({path:"userId",select:"-password -objectId"})
    return res.status(200).send({message:allposts})

    }
    catch(err){
        console.log(err);
    return res.status(500).send({ message: "server err" });
    }
}


exports.create = async(req,res)=>{
    try{
        let postObj = {
            content : req.body.content,
            userId:req.user._id,
        }
        const newPost = await Post.create(postObj)
        const newPostSend = await Post.findOne({_id:newPost._id}).populate(
                                            {path:"userId",select:"-password -objectId"}
        )
        return res.status(201).send({message:newPostSend})
        
    }
    catch(err){
        console.log(err);
    return res.status(500).send({ message: "server err" });
    }
}


exports.getPostBySearch = async(req, res)=>{
    const searchQuery = req.params.search
    console.log("searchQuery",searchQuery)

    try {
        // Search for posts containing the search term
        const posts = await Post.find({ content: { $regex: new RegExp(searchQuery, 'i') } })
  .populate('userId', '-password -objectId')
  .exec();

const comments = await Comment.find({ comment: { $regex: new RegExp(searchQuery, 'i') } });

for (let x = 0; x < comments.length; x++) {
  try {
    const post = await Post.findById(comments[x].postId)
      .populate({ path: 'userId', select: '-password -objectId' })
      .populate({ path: 'commentIds', populate: { path: 'userId', select: '-password -objectId' } });

    let index = posts.findIndex(item => item._id.toString() === post._id.toString());

    if (index > -1) {
      // If the post is found in the posts array, remove it and add the updated post
      posts.splice(index, 1, post);
    } else {
      // If the post is not found, add it to the posts array
      posts.push(post);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Send the formatted search results back to the client
return res.status(200).json({ message: posts });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    
}