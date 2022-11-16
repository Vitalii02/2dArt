const LIVR = require("livr");

function topicValidator(req, res, next) {
  LIVR.Validator.defaultAutoTrim(true);

  const validator = new LIVR.Validator({
    title: ["required", "string", { max_length: 25 }],
    text: ["required", "string", { max_length: 3000 }],
    description: ["required", "string", { max_length: 50 }],
  });

  const validData = validator.validate(req.body);
  if (!validData) {
    return res.status(400).json({ error: validator.getErrors() });
  }
  next();
}

module.exports = {
  topicValidator,
};
