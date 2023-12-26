const postController = require("../controller/post.controller")
// const authValidation = require("../validation/auth.validation");
const jwtValidation = require("../validation/jwt.validation")

const postRoute = (app) => {
  app.post("/postMedia/api/v1/posts",
    [jwtValidation.verifyJwt],
    postController.create
  );
  app.get(
    "/postMedia/api/v1/posts",
    postController.getAllPost
  );
  app.get("/postMedia/api/v1/postSearch/:search",postController.getPostBySearch)
  
};

module.exports = postRoute;