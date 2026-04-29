import express from "express";
import userService from "./user.service.js";

const app = express();

const port = 3000;

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/users", async (req, res) => {
    try {
        let { page = 1, size = 10 } = req.query as any;
        if (size > 20) {
            size = 20;
        }
        if (page < 0) {
            page = 1;
        }
        const users = await userService.getUsers({ page, size });
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
