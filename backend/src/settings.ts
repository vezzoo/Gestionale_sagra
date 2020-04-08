export const WEBSERVER_PORT = 3000;
export const WEBSERVER_BIND = "0.0.0.0";

//One of the following sections
export const DATABASE_USE_URL = false;
export const DATABASE_URL = "sqlite::memory"; // or "postgres://user:pass@example.com:5432/dbname" or ...

export const DATABASE_DIALECT = 'sqlite';   // one of 'mysql' | 'mariadb' | 'postgres' | 'mssql'
export const DATABASE_SQLITE_FILE = './db.sqlite';
export const DATABASE_DB_NAME = 'gestionale';
export const DATABASE_USERNAME = 'root';
export const DATABASE_PASSWORD = 'toor';
export const DATABASE_HOST = 'localhost';

export const DATABASE_REBUILD = !!!false;

export const USER_CREATION_DISABLE = true;