const router  = require("express").Router();
const middlewareController = require("../controller/middlewareController");
const useController = require("../controller/userController")

// GET all USER
//  /v1/user/all
router.get("/", useController.getAllUsr);
//  GET BY ID 
// /v1/user/id=
router.get("/id=:id" ,useController.getUserById);
// DELETE by ID
// /v1/user/id=
router.delete("/id=:id" ,middlewareController.verifyTokenAdminAuth ,  useController.deleteUser);
//  UPDATE by ID 
// /v1/user/id=
router.post ("/update/id=:id" ,middlewareController.verifyTokenAdminAuth,useController.updateUser); 
// SUBCRIBE  Membership
// /v1/user/subcribe
router.post("/subcribe" ,middlewareController.verifyToken,  useController.subcribeMemberShip);
// Search 
router.get("/search",useController.search);
module.exports = router;