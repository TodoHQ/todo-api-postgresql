import { Client } from "pg";
import { query } from "./db/index.js";
import userService from "./user.service.js";

const client = await new Client({
    // user: process.env.POSTGRES_USER || "",
    // password: process.env.POSTGRES_PASSWORD || "",
    // host: "localhost",
    // port: 5432,
    // database: '',
}).connect();

try {
    const res = await client.query("SELECT $1::text as message", [
        "Hello world!",
    ]);
    console.log(res.rows[0].message); // Hello world!

    // const res2 = await client.query("SELECT * from users");
    // console.log(res2.rows); // Hello world!

    console.log(
        await userService.insertUser({
            name: "Ram",
            age: 14,
            email: "ram@example.com",
        }),
    );
    console.log(await userService.getUsers());
} catch (err) {
    console.error(err);
} finally {
    await client.end();
}
