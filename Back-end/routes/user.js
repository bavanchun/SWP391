const router = require("express").Router();
const middlewareController = require("../controller/middlewareController");
const useController = require("../controller/userController");
const upload = require("../middleware/multer");
const uploads = require("../middleware/multerConfig");
// GET all USER
//  /v1/user/all
router.get("/", middlewareController.verifyTokenAdminAuth,useController.getAllUsr);
//  GET BY ID
// /v1/user/id=
router.get("/id=:id", useController.getUserById);
// DELETE by ID
// /v1/user/id=
router.delete(
  "/id=:id",
  middlewareController.verifyTokenAdminAuth,
  useController.deleteUser
);
router.post("/create" ,middlewareController.verifyTokenAdminAuth, useController.createUser)
//  UPDATE by ID
// /v1/user/id=
router.put(
  "/update/id=:id",
  middlewareController.verifyTokenAdminAuth,
  useController.updateUser
);
// SUBCRIBE  Membership
// /v1/user/subcribe
router.post(
  "/subcribe",
  middlewareController.verifyToken,
  useController.subcribeMemberShip
);
// Search
router.get("/search",middlewareController.verifyTokenAdminAuth, useController.search);

// upload Image
router.post("/uploadImage", upload.single("avatar"), useController.uploadImage);

router.post("/uploadImages", uploads.array("post"), useController.uploadImages);
module.exports = router;
