const validationFun = require("../../middleware/validation");
const { signUp, signIn, confirmEmail } = require("./controller/auth.controller");
const authSchemaValidation = require("./auth.validator")
const router = require("express").Router()

router.post("/signup", validationFun(authSchemaValidation.signUp), signUp);
router.post("/signIn",  validationFun(authSchemaValidation.signIn),signIn);
router.get("/confirm/:token",confirmEmail)
module.exports = router;