import { query } from "./db/index.js";

type Todo = {
    id: number;
    title: string;
    description: string | null;
    is_done: boolean;
    created_at: string;
    updated_at: string;
};

class TodoService {
    async getUserTodos(userId: number) {
        const q = `
            SELECT * FROM todos 
            WHERE user_id = ${userId}`;

        return (await query<Todo>(q)).rows;
    }

    async getUserTodosCount(userId: number) {
        const q = `
            SELECT COUNT(*) FROM todos 
            WHERE user_id = ${userId}`;

        return Number((await query<{ count: string }>(q)).rows[0]?.count);
    }
}

const todoService = new TodoService();

export default todoService;
