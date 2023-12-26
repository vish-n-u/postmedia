const Post = require('../model/post.model')
const Comment = require('../model/comment.model')

exports.createComment = async (req, res) => {
    try{
        let commentObj={
            comment:req.body.content,
            userId:req.user._id,
            postId:req.body.postId
        }
      const newComment =   await Comment.create(commentObj)
       const post = await Post.findById(req.body.postId)
        post.commentIds.push(newComment._id)
        await post.save()
        const populatedPost = await Post.findById(req.body.postId)
        .populate({ path: 'userId', select: '-password -objectId' })
        .populate({ path: 'commentIds' });

        // Now 'populatedPost' contains the document with the 'userId' field in the main post and the 'userId' field in each comment within the 'commentIds' array populated
        console.log("comments",populatedPost)
        // If you also want to populate the 'userId' field in each individual comment, you can do this in a loop
        for (const comment of populatedPost.commentIds) {
        await comment.populate({ path: 'userId', select: '-password -objectId' });
    }
    return res.status(201).send({message:populatedPost})
}
    catch(err){
        console.log(err);
    return res.status(500).send({ message: "server err" });
    }

}


exports.searchCommentsViaPost = async(req,res) =>{ // Assuming you have a Mongoose model named 'Post' with a 'userId' field and a 'commentIds' array
// const post = await Post.findById(postId);
try{
        const postId = req.params.id
        // Use populate() to specify the paths to be populated
        const populatedPost = await Post.findById(postId)
        .populate({ path: 'userId', select: '-password -objectId' })
        .populate({ path: 'commentIds', populate: { path: 'userId', select: '-password -objectId' } });

        // Now 'populatedPost' contains the document with the 'userId' field in the main post and the 'userId' field in each comment within the 'commentIds' array populated

        // If you also want to populate the 'userId' field in each individual comment, you can do this in a loop
        for (const comment of populatedPost.commentIds) {
        await comment.populate({ path: 'userId', select: '-password -objectId' });
}

return res.status(200).send({message:populatedPost})}
catch(err){
    console.log(err);
return res.status(500).send({ message: "server err" });
}
// Now 'populatedPost' contains the document with 'userId' fields populated in the main post, comments within 'commentIds', and each individual comment
}