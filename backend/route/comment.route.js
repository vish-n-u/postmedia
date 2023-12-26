const commentController = require("../controller/comment.controller")
// const authValidation = require("../validation/auth.validation");
const jwtValidation = require("../validation/jwt.validation")

const commentRoute = (app) => {
  app.post("/postMedia/api/v1/comments",
    [jwtValidation.verifyJwt],
    commentController.createComment
  );
  app.get(
    "/postMedia/api/v1/comments/:id",
    commentController.searchCommentsViaPost
  );
  
};

module.exports = commentRoute;