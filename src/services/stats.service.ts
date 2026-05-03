import { query } from "../db/index.js";

class StatsService {
    async getStats() {
        const totalUsers = Number(
            (await query<{ count: string }>(`SELECT COUNT(*) FROM users`))[0]
                ?.count,
        );
        const totalTodos = Number(
            (await query<{ count: string }>(`SELECT COUNT(*) FROM todos`))[0]
                ?.count,
        );

        const topUsers = await query(`
            SELECT 
                u.id,
                u.name,
                u.email,
                COUNT(t.id) AS total_todos
            FROM users u
            JOIN todos t ON u.id = t.user_id
            GROUP BY u.id, u.name, u.email
            ORDER BY total_todos DESC
            LIMIT 10;
            `);

        const last7DaysTopUsers = await query(`
            SELECT 
                u.id,
                u.name,
                u.email,
                COUNT(t.id) AS todos_last_7_days
            FROM users u
            JOIN todos t ON u.id = t.user_id
            WHERE t.created_at >= NOW() - INTERVAL '7 days'
            GROUP BY u.id, u.name, u.email
            ORDER BY todos_last_7_days DESC
            LIMIT 10;
            `);

        return { totalUsers, totalTodos, topUsers, last7DaysTopUsers };
    }
}

const statsService = new StatsService();

export default statsService;
