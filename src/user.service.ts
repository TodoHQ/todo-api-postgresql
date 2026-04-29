import { query } from "./db/index.js";

type User = {
    id: number;
    name: string;
    email: string;
    age: number;
};

class UserService {
    async insertUser(payload: Pick<User, "name" | "email" | "age">) {
        const { name, email, age } = payload;

        const res = await query<User>(
            `INSERT INTO users (name, email, age)
            VALUES ($1, $2, $3)
            RETURNING id, name, email, age
            `,
            [name, email, age],
        );

        return res.rows[0];
    }

    async getUsers() {
        const q = `SELECT * FROM users`;
        return (await query<User>(q)).rows;
    }
}

const userService = new UserService();

export default userService;
