# todo-api-postgresql

## DELETE vs TRUNCATE

- **`DELETE`**
    - Removes rows **one by one**
    - Can use `WHERE` (select specific rows)
    - Slower for large tables
    - Logs each row deletion

- **`TRUNCATE`**
    - Removes **all rows at once**
    - No `WHERE` allowed
    - Much **faster**
    - Minimal logging
    - Resets table storage and IDs
