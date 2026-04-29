import { Pool, type QueryResultRow } from "pg";

const pool = new Pool();

export const query = <T extends QueryResultRow = QueryResultRow>(
    text: string,
    params?: any,
) => {
    return pool.query<T>(text, params);
};
