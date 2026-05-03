INSERT INTO todos (user_id, title, description, is_done, created_at, updated_at)
VALUES
(1, 'Setup project repo', 'Initialize Git and push base project structure', false, NOW() - INTERVAL '10 days', NOW() - INTERVAL '10 days'),
(5, 'Implement auth', 'Add JWT-based authentication for APIs', true, NOW() - INTERVAL '6 days', NOW() - INTERVAL '2 days'),
(12, 'Design database schema', 'Create ER diagram and finalize tables', true, NOW() - INTERVAL '8 days', NOW() - INTERVAL '7 days'),
(20, 'Build todo APIs', 'CRUD APIs for todo module using Node.js', false, NOW() - INTERVAL '3 days', NOW() - INTERVAL '1 day'),
(42, 'Write unit tests', 'Cover services with Jest test cases', false, NOW() - INTERVAL '1 day', NOW());


INSERT INTO todos (user_id, title, description, is_done, created_at, updated_at)
SELECT 
    CASE 
        WHEN RANDOM() < 0.7 THEN (RANDOM() * 19 + 1)::int  -- skew: top 20 users get more todos
        ELSE (RANDOM() * 213 + 1)::int
    END AS user_id,
    
    'Task ' || gs,
    'Auto-generated task for performance testing',
    
    (RANDOM() > 0.5),
    
    NOW() - (RANDOM() * INTERVAL '60 days'),
    NOW() - (RANDOM() * INTERVAL '30 days')

FROM generate_series(1, 10000) gs;



-- 

INSERT INTO todos (user_id, title, description, is_done, created_at, updated_at)
SELECT
    u.id,
    'Task ' || gs,
    'Using real user ids',
    (RANDOM() > 0.5),
    NOW() - (RANDOM() * INTERVAL '90 days'),
    NOW() - (RANDOM() * INTERVAL '30 days')
FROM generate_series(1, 100000) gs
JOIN LATERAL (
    SELECT id FROM users ORDER BY RANDOM() LIMIT 1
) u ON true;