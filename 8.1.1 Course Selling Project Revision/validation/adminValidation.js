const { z } = require("zod")

const adminSingupSchema = z.object({
  email: z.string().email().min(3).max(25),
  password: z.string()
    .min(5, "Password must be at least 5 characters")
    .max(20, "Password must not exceed 20 characters")
    .regex(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/, "Must include uppercase and special char"),
  firstName: z.string(),
  firstName: z.string()
})

const adminSinginSchema = z.object({
  email: z.string().email().min(3).max(25),
  password: z.string()
    .min(5, "Password must be at least 5 characters")
    .max(20, "Password must not exceed 20 characters")
    .regex(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/, "Must include uppercase and special char")
})


module.exports = {
  adminSingupSchema,
  adminSinginSchema
}