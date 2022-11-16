const jwtDecode = require("jwt-decode");

exports.sessionDepartment = (req, res, next) => {
  const user = jwtDecode(req.headers.authorization.split(" ")[1]);
  if (user.department !== "admin") {
    return res
      .status(403)
      .json({ error: "You do not have permission to make this request" });
  }
  next();
};
