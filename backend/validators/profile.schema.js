const { z } = require("zod");

const profileSchema = z.object({
  name: z.string().min(2).optional(),

  email: z.string().email().optional(),

  date_of_birth: z.coerce.date().optional(),

  gender: z.enum(["Male", "Female", "Other"]).optional(),

  address: z.string().optional(),

  occupation: z.string().optional(),

  pan_number: z
    .string()
    .trim()
    .toUpperCase()
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]$/)
    .optional(),

  aadhar_number: z
    .string()
    .regex(/^\d{12}$/, "Aadhar must be 12 digits")
    .optional(),

  bank_account: z.string().min(9).max(18).optional(),

  bank_ifsc: z
    .string()
    .regex(/^[A-Z]{4}0[A-Z0-9]{6}$/)
    .optional(),

  bank_name: z.string().optional(),

  nominee_name: z.string().optional(),

  nominee_relation: z.string().optional()
});

module.exports = { profileSchema };