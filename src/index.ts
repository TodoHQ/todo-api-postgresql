import express from "express";

import userService from "./services/user.service.js";
import { getUserQuerySchema } from "./schema/user.schema.js";
import todoService from "./services/todo.service.js";
import {
    getUserTodoParamSchema,
    getUserTodoQuerySchema,
} from "./schema/todo.schema.js";
import statsService from "./services/stats.service.js";
import z from "zod";

const app = express();

const port = 3000;

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/stats", async (req, res) => {
    const responseData = await statsService.getStats();

    res.send(responseData);
});

app.get("/users", async (req, res) => {
    try {
        const result = getUserQuerySchema.safeParse(req.query);

        if (!result.success) {
            res.status(400).send(result.error.issues);
            return;
        }
        const { page, size, orderBy, order, name } = result.data;

        const users = await userService.getUsers({
            page,
            size,
            orderBy,
            order,
            name,
        });
        const total = await userService.getTotalCount({ name });

        res.send({ users, page, size, total, orderBy, order, name });
    } catch (error) {
        console.log("ERROR", error);
        res.status(500).send({ error: error });
    }
});

app.get("/users/:userId/todos", async (req, res) => {
    try {
        const { userId } = getUserTodoParamSchema.parse(req.params);
        const { page, size } = getUserTodoQuerySchema.parse(req.query);

        const todos = await todoService.getUserTodos(userId, { page, size });
        const total = await todoService.getUserTodosCount(userId);

        res.send({ todos, total, page, size });
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).send(error.issues);
            return;
        }
        console.log("ERROR", error);
        res.status(500).send({ error: error });
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
