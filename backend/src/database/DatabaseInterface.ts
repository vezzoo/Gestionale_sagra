import {Sequelize} from "sequelize";
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
import Field from "./Field";
import DbModel from "./DBModel";

export default class DatabaseInterface extends Sequelize {
    private static database_singleton: DatabaseInterface | null = null;
    private models_available: {instance: DbModel, modelType: any, fields: string[]}[];

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
        let i = new modelType({}, {isNewRecord: false, hooks: false});
        let fields = Object.getOwnPropertyNames(i)
            .filter(elm => {
                    return !!Object.getOwnPropertyDescriptor(i, elm)?.value?.obj;
                }
            )
            .reduce((ret, elm) =>
                Object.assign(ret,
                    {
                        [elm]: Object.getOwnPropertyDescriptor(i, elm)?.value.obj
                    }), {}
            );

        modelType.init(fields, Object.assign(i.__seq_opt(), {
            timestamps: false,
            underscored: true,
            freezeTableName: true,
            tableName: i.__table_name(),
            sequelize: this
        }));

        this.models_available.push({instance: i, modelType, fields: Object.keys(fields)});
        console.log(`LOADED ${modelType.name}`);
        return this;
    }

    async connect(): Promise<DatabaseInterface> {
        await this.authenticate();
        console.log(await this.databaseVersion());
        return this
    }

    async finalize(): Promise<void>{
       for(let e of this.models_available){
            e.instance.references();
            try {
                if (DATABASE_REBUILD) {
                    await e.modelType.drop();
                    throw Error("recreate");
                }
                await e.modelType.findAll({limit: 1});
            } catch (ex) {
                if (ex.message !== "recreate") console.error(`ERROR TRYING TO FETCH TABLE ${e.modelType.name}. RECREATING.`);
                else console.warn(`Rebuilding ${e.modelType.name}`);
                await e.modelType.sync()
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