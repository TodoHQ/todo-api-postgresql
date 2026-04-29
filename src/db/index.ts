import { Pool } from "pg";

const pool = new Pool();

export const query = (text: string) => {
    return pool.query(text);
};
