import {Sequelize} from "sequelize";
import {
    DATABASE_DB_NAME,
    DATABASE_DIALECT, DATABASE_HOST, DATABASE_PASSWORD,
    DATABASE_SQLITE_FILE,
    DATABASE_URL,
    DATABASE_USE_URL,
    DATABASE_USERNAME
} from "../settings";

export default class DatabaseInterface extends Sequelize{
    private static database_singleton: DatabaseInterface|null = null;

    private constructor(){
        if(DATABASE_USE_URL) super(DATABASE_URL);
        else if(DATABASE_DIALECT == 'sqlite') super({dialect: DATABASE_DIALECT, storage: DATABASE_SQLITE_FILE});
        else super(DATABASE_DB_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, {host: DATABASE_HOST, dialect: DATABASE_DIALECT});
    }

    public static getDatabase(): DatabaseInterface{
        if(this.database_singleton == null) this.database_singleton = new DatabaseInterface();
        return this.database_singleton;
    }

    async connect(){
        await this.authenticate();
    }

}

