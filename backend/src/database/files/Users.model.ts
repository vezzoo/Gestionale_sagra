import {
    AllowNull,
    BeforeCreate,
    BeforeUpdate,
    Column,
    Default,
    HasMany,
    PrimaryKey,
    Table,
    Model
} from "sequelize-typescript";
import {DataTypes} from "sequelize";
import crypto from 'crypto'
import {AUTHENTICATION_PASSWORD_RULE, USER_CREATION_DISABLE} from "../../settings";
import UserPermission from "./Permissions.model";
import sequelize_fix from "../sequelize_fix";

@Table({
    timestamps: false,
    freezeTableName: true,
    tableName: "Users"
})
export default class User extends Model<User>{

    @PrimaryKey
    @AllowNull(false)
    @Column(DataTypes.STRING(128))
    public username!: string;

    @Column(DataTypes.STRING(128))
    public name!: string;

    @AllowNull(false)
    @Column(DataTypes.STRING(80))
    public password!: string;

    @AllowNull(false)
    @Default(false)
    @Column(DataTypes.BOOLEAN)
    public enabled!: boolean;

    @Column(DataTypes.STRING(11))
    public salt!: string;

    @Column(DataTypes.BIGINT)
    public last_login!: number;

    @HasMany(() => UserPermission)
    // @ts-ignore
    public permissions: UserPermission[] = this.permissions;

    @BeforeCreate
    private static hash_password(instance: User){
        User.generate_user(instance, !USER_CREATION_DISABLE);
    }

    @BeforeUpdate
    private static update_password(instance:User){
        let changed = instance.changed();
        if (changed && changed.indexOf('password') > -1) User.generate_user(instance, !!instance.enabled);
    }

    private static generate_db_passw(salt: string, password: string): string {
        let shasum = crypto.createHash('sha256');
        return shasum.update(password + salt).digest('hex');
    }

    private static generate_user(user: User, enabled_state: boolean) {
        let salt = Math.random().toString(36).substr(2); //11chars salt
        user.salt = salt;
        user.password = this.generate_db_passw(salt, user.get('password').toString());
        user.enabled =  enabled_state;
    }

    public authenticate(password: string): void {
        let reg = new RegExp(AUTHENTICATION_PASSWORD_RULE.join(''), 'g');
        if (!!password.match(reg)?.length) throw Error("PSW RULE NOT MATCHED");
        if (this.password !== User.generate_db_passw(this.salt, password)) throw Error("INVALID CREDENTIALS");
        if (!this.enabled) throw Error("USER NOT ENABLED");
        this.last_login = Date.now();
        this.save();
    }

    constructor(...args: any) {
        super(...args);
        sequelize_fix(new.target, this);
    }
}