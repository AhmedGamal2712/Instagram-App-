const {auth} = require("../../middleware/auth");
const validationFun = require("../../middleware/validation");
const uploadData = require("../../service/uploadFile");
const { getProfile, updateProfilePic, updateCoverPhotos } = require("./controller/user.controller");
const { getDetails } = require("./user.validation");
const userAPI = require("./userRoles");

const router = require("express").Router();



router.get("/getDetails", validationFun(getDetails), auth(userAPI.getDetails), getProfile);
router.patch("/updateProfilePic", auth(userAPI.getDetails), uploadData("images/profilePic").single("image"), updateProfilePic);
router.patch("/updateCoverPhotos", auth(userAPI.getDetails), uploadData("images/coverPhotos").array("image",5), updateCoverPhotos);

module.exports = router;




