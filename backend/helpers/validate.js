const validate = (schema) => (req, res, next) => {
  try {
    req.validatedData = schema.parse(req.body);
    next();
  } catch (err) {
    return res.status(400).json({
      success: false,
      errors: err.issues.map(e => ({
        field: e.path[0],
        message: e.message
      }))
    });
  }
};

module.exports = validate;