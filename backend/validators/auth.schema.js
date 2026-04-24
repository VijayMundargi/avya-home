const { z } = require("zod");

const loginSchema = z.object({
  mobile: z.string().regex(/^[6-9]\d{9}$/, "Invalid mobile number"),
  password: z.string().min(1, "Password is required")
});


const sendOTPSchema = z.object({
  email: z.string().email("Invalid email")
});


const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email")
});

const resetPasswordSchema = z.object({
  email: z.string().email(),
  otp: z.string().length(6, "OTP must be 6 characters"),
  password: z
    .string()
    .min(8)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Weak password"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});


const changePasswordSchema = z.object({
  oldPassword: z.string().min(1),
  newPassword: z
    .string()
    .min(8)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Weak password")
});

module.exports = {
  loginSchema,
  sendOTPSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema
};