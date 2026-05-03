import { Pool, type QueryResultRow } from "pg";

const pool = new Pool();

export const query = async <T extends QueryResultRow = QueryResultRow>(
    text: string,
    params?: any,
) => {
    return (await queryRaw<T>(text, params)).rows;
};

export const queryRaw = <T extends QueryResultRow = QueryResultRow>(
    text: string,
    params?: any,
) => {
    return pool.query<T>(text, params);
};
