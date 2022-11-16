const LIVR = require("livr");

function authValidator(req, res, next) {
  LIVR.Validator.defaultAutoTrim(true);

  const validator = new LIVR.Validator({
    login: ["required", "string"],
    name: ["required", "string"],
    last_name: ["required", "string"],
    role: ["required", "string"],
    password: ["required", "string", { min_length: 10 }],
    department: ["required", { one_of: ["admin", "office", "it"] }],
    position: ["required", "string"],
  });

  const validData = validator.validate(req.body);
  if (!validData) {
    return res.status(400).json({ error: validator.getErrors() });
  }
  next();
}

module.exports = {
  authValidator,
};
