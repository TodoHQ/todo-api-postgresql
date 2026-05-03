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

        const perDayTodos = await query(`
            SELECT 
                DATE(created_at) AS day,
                COUNT(*) AS todos_created
            FROM todos
            GROUP BY day
            ORDER BY day DESC
            LIMIT 30;
        `);

        const dominatingUser = await query(`
            SELECT 
                CASE 
                    WHEN cnt < 5 THEN '0-5'
                    WHEN cnt < 20 THEN '5-20'
                    WHEN cnt < 50 THEN '20-50'
                    ELSE '50+'
                END AS bucket,
                COUNT(*) AS users
            FROM (
                SELECT user_id, COUNT(*) AS cnt
                FROM todos
                GROUP BY user_id
            ) t
            GROUP BY bucket
            ORDER BY bucket;
        `);

        const completionRate = await query(`
            SELECT 
                ROUND(
                    100.0 * SUM(CASE WHEN is_done THEN 1 ELSE 0 END) / COUNT(*),
                    2
                ) AS completion_percentage
            FROM todos;
        `);

        return {
            totalUsers,
            totalTodos,
            topUsers,
            last7DaysTopUsers,
            perDayTodos,
            dominatingUser,
            completionRate,
        };
    }
}

const statsService = new StatsService();

export default statsService;
