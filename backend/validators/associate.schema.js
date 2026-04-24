const { z } = require("zod");

const associateSchema = z.object({
  name: z.string().trim().min(2).max(100),

  mobile: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/),

  email: z
    .string()
    .email()
    .or(z.literal(""))
    .optional()
    .transform((v) => (v === "" ? undefined : v)),

  password: z
    .string()
    .min(8)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),

  sponsor_id: z
    .union([z.number().int(), z.string().length(0)])
    .optional()
    .transform((v) => (v === "" ? undefined : Number(v))),

  commission_pct: z
    .union([z.coerce.number(), z.string().length(0)])
    .optional()
    .transform((v) => (v === "" ? undefined : Number(v))),

  pan_number: z
    .string()
    .trim()
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]$/)
    .or(z.literal(""))
    .optional()
    .transform((v) => (v === "" ? undefined : v)),

  aadhar_number: z.string().nullable().optional(),

  date_of_birth: z
    .union([z.coerce.date(), z.string().length(0)])
    .optional()
    .transform((v) => (v === "" ? undefined : v)),

  gender: z.enum(["Male", "Female", "Other"]).optional(),

  address: z.string().optional(),

  bank_account: z.string().optional(),

  bank_ifsc: z
    .string()
    .trim()
    .regex(/^[A-Z]{4}0[A-Z0-9]{6}$/)
    .or(z.literal(""))
    .optional()
    .transform((v) => (v === "" ? undefined : v)),

  bank_name: z.string().nullable().optional(),

  nominee_name: z.string().nullable().optional(),
  nominee_relation: z.string().nullable().optional(),

  role: z
    .enum(["super_admin", "manager", "associate", "sub_associate"])
    .optional()
});

module.exports = { associateSchema };