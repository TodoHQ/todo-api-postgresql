import z from "zod";

export const getUserQuerySchema = z.object({
    page: z.coerce.number().min(1).max(100_000).default(1),
    size: z.coerce.number().min(1).max(100).default(10),
});
