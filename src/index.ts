import express from "express";

import userService from "./services/user.service.js";
import { getUserQuerySchema } from "./schema/user.schema.js";
import todoService from "./services/todo.service.js";
import { getUserTodoParamSchema } from "./schema/todo.schema.js";
import statsService from "./services/stats.service.js";

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

app.get("/users/:user_id/todos", async (req, res) => {
    try {
        const result = getUserTodoParamSchema.safeParse(req.params);

        if (!result.success) {
            res.status(400).send(result.error.issues);
            return;
        }
        const userId = result.data.user_id;

        const todos = await todoService.getUserTodos(userId);
        const total = await todoService.getUserTodosCount(userId);

        res.send({ todos, total });
    } catch (error) {
        console.log("ERROR", error);
        res.status(500).send({ error: error });
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
