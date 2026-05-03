import z from "zod";

export const getUserTodoParamSchema = z.object({
    userId: z.coerce.number(),
});

export const getUserTodoQuerySchema = z.object({
    page: z.coerce.number().min(1).max(100_000).default(1),
    size: z.coerce.number().min(1).max(100).default(100),
});
