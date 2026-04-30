import express from "express";

import userService from "./user.service.js";
import { getUserQuerySchema } from "./schema/user.schema.js";

const app = express();

const port = 3000;

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/users", async (req, res) => {
    try {
        const result = getUserQuerySchema.safeParse(req.query);

        if (!result.success) {
            res.status(400).send(result.error.issues);
            return;
        }
        const { page, size, orderBy, order } = result.data;

        const users = await userService.getUsers({
            page,
            size,
            orderBy,
            order,
        });
        const total = await userService.getTotalCount();

        res.send({ users, page, size, total });
    } catch (error) {
        console.log("ERROR", error);
        res.sendStatus(500).send({ error: error });
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
