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

export const DATABASE_REBUILD = !!!!!!false;

export const USER_CREATION_DISABLE = true;

export const AUTHENTICATION_MIN_USERNAME_LENGTH = 8;
const _AUTH_RULE_PSW_MIN_LENGTH = (num:number) => `(?=.{${num},})`;
const _AUTH_RULE_PSW_CONTAINS_DIGIT = `(?=.*\\d)`;
const _AUTH_RULE_PSW_CONTAINS_LOWERCASE = `(?=.*[a-z])`;
const _AUTH_RULE_PSW_CONTAINS_UPPERCASE = `(?=.*[A-Z])`;
const _AUTH_RULE_PSW_CONTAINS_SYMBOL = `(?=.*[\`\\-=\\[\\];',./\\\\\\*\\-\\+~_+{}:"\\|?><!@#$%^&*()])`;
export const AUTHENTICATION_PASSWORD_RULE = [_AUTH_RULE_PSW_MIN_LENGTH, _AUTH_RULE_PSW_CONTAINS_DIGIT, _AUTH_RULE_PSW_CONTAINS_LOWERCASE, _AUTH_RULE_PSW_CONTAINS_UPPERCASE, _AUTH_RULE_PSW_CONTAINS_SYMBOL];
