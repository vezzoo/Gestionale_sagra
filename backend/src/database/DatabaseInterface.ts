import {Sequelize} from "sequelize-typescript";
import {
    DATABASE_DB_NAME,
    DATABASE_DIALECT,
    DATABASE_HOST,
    DATABASE_PASSWORD,
    DATABASE_REBUILD,
    DATABASE_SQLITE_FILE,
    DATABASE_URL,
    DATABASE_USE_URL,
    DATABASE_USERNAME
} from "../settings";
import DbModel from "./DBModel";

export default class DatabaseInterface extends Sequelize {
    private static database_singleton: DatabaseInterface | null = null;
    private models_available: any[];

    private constructor() {
        if (DATABASE_USE_URL) super(DATABASE_URL);
        else if (DATABASE_DIALECT == 'sqlite') super({dialect: DATABASE_DIALECT, storage: DATABASE_SQLITE_FILE});
        else super(DATABASE_DB_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, {
                host: DATABASE_HOST,
                dialect: DATABASE_DIALECT
            });

        this.models_available = [];
    }

    public static getDatabase(): DatabaseInterface {
        if (this.database_singleton == null) this.database_singleton = new DatabaseInterface();
        return this.database_singleton;
    }

    async addModel(modelType: any): Promise<DatabaseInterface> {
        this.addModels([modelType]);
        this.models_available.push(modelType);
        return this;
    }

    async connect(): Promise<DatabaseInterface> {
        await this.authenticate();
        console.log(await this.databaseVersion());
        return this
    }

    async finalize(): Promise<void>{
        for(let e of this.models_available){
            try {
                if (DATABASE_REBUILD) {
                    await e.drop();
                    throw Error("recreate");
                }
                await e.findAll({limit: 1});
            } catch (ex) {
                if (ex.message !== "recreate") console.error(`ERROR TRYING TO FETCH TABLE ${e.name}. RECREATING.`);
                else console.warn(`Rebuilding ${e.name}`);
                await e.sync()
            }
        }
        console.log("DATABASE READY.")
    }

}

/*
 function MyModel() {
    var _this;

    _classCallCheck(this, MyModel);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "lol_name", new _Field["default"]());

    return _this;
  }
 */