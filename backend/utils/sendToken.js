const jwt = require('jsonwebtoken');

const sendToken = (user, statusCode, res, message = "Success") => {
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || "7d" }
  );

res.cookie("token", token, {
  httpOnly: true,
  secure: false,
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

  res.status(statusCode).json({
    success: true,
    message,
    token,
    user: {
      id: user.id,
      name: user.name,
      mobile: user.mobile,
      role: user.role
    }
  });
};

module.exports = sendToken;