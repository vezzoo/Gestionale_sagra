let database_singleton = null;

export default class DatabaseInterface{

    public static getDatabase(): DatabaseInterface{
        return new DatabaseInterface();
    }

}