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

    async getUsers(params: {
        page: number;
        size: number;
        orderBy: "name" | "email" | "age" | "created_at" | "updated_at";
        order: "asc" | "desc";
        name: string | undefined;
    }) {
        const q = `
            SELECT * FROM users
            ${params.name ? `WHERE name ILIKE '%${params.name}%'` : ""}
            ORDER BY ${params.orderBy} ${params.order} 
            OFFSET ${params.size * (params?.page - 1)} LIMIT ${params?.size}`;

        return (await query<User>(q)).rows;
    }

    async getTotalCount(params: { name: string | undefined }) {
        const q = `SELECT COUNT(*) FROM users ${params.name ? `WHERE name ILIKE '%${params.name}%'` : ""}`;
        return Number((await query<{ count: string }>(q)).rows[0]?.count);
    }
}

const userService = new UserService();

export default userService;
