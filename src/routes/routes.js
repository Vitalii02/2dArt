const { Router } = require("express");

const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const topicsController = require("../controllers/topics.controller");

const { authValidator } = require("../validator/auth.validator");
const { topicValidator } = require("../validator/topics.validator");
const { queryValidator } = require("../validator/query.validator");

const { sessionChecker } = require("../middleware/checkSession");
const { sessionDepartment } = require("../middleware/checkDepartment");

const router = Router();

//-----------------------------------AUTH----------------------------------------\\

router.post("/login", authController.login);
router.post("/logout", sessionChecker, authController.logout);
router.get("/refreshToken", authController.refreshToken);

// //-----------------------------------USER----------------------------------------\\

router.get(
  "/getUsers",
  queryValidator,
  sessionChecker,
  sessionDepartment,
  userController.getUsers
);
router.post(
  "/createUser",
  authValidator,
  sessionChecker,
  sessionDepartment,
  userController.createUser
);

router.put(
  "/updateUser",
  authValidator,
  queryValidator,
  sessionChecker,
  sessionDepartment,
  userController.updateUser
);
router.delete(
  "/deleteUser",
  queryValidator,
  sessionChecker,
  sessionDepartment,
  userController.deleteUser
);

// //-----------------------------------TOPICS-------------------------------------\\

router.get(
  "/getFeed",
  queryValidator,
  sessionChecker,
  topicsController.getFeed
);
router.post(
  "/createTopics",
  topicValidator,
  sessionDepartment,
  sessionChecker,
  topicsController.createTopics
);
router.put(
  "/updateTopics",
  queryValidator,
  sessionDepartment,
  sessionChecker,
  topicsController.updateTopics
);
router.delete(
  "/deleteTopics",
  queryValidator,
  sessionDepartment,
  sessionChecker,
  topicsController.deleteTopics
);

module.exports = router;
