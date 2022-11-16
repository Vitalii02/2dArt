const LIVR = require("livr");

function queryValidator(req, res, next) {
  LIVR.Validator.defaultAutoTrim(true);

  const validator = new LIVR.Validator({
    id: "positive_integer",
    sort: ["string", { one_of: ["ASC", "DESC"] }],
    fromDate: "positive_integer",
    toDate: "positive_integer",
  });
  const validQuery = validator.validate(req.query);
  if (!validQuery) {
    return res.status(400).json({ error: validator.getErrors() });
  }
  next();
}

module.exports = {
  queryValidator,
};
