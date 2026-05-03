import z from "zod";

export const getUserTodoParamSchema = z.object({
    user_id: z.coerce.number(),
});
