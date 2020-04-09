import {DataTypes, Model} from "sequelize";
import Field from "../Field";
import DBModel from "../DBModel";
import crypto from 'crypto'
import {AUTHENTICATION_PASSWORD_RULE, USER_CREATION_DISABLE} from "../../settings";


export default class User extends Model implements DBModel {

    public username: string | Field = new Field(DataTypes.STRING(128)).primaryKey().allowNull(false);
    public name: string | Field = new Field(DataTypes.STRING(128)).allowNull(true);
    public password: string | Field = new Field(DataTypes.STRING(64)).allowNull(false);
    public enabled: boolean | Field = new Field(DataTypes.BOOLEAN);
    public salt: string | Field = new Field(DataTypes.STRING(11));
    public last_login: number | Field = new Field(DataTypes.BIGINT).allowNull();

    references(): void {
        console.log("User before creation hook");
        User.addHook('beforeCreate', (a: User, options) => {
            User.generate_user(a, !USER_CREATION_DISABLE);
        });

        console.log("User before update hook");
        User.addHook('beforeCreate', (a: User, options) => {
            let changed = a.changed();
            if (changed && changed.indexOf('password') > -1) User.generate_user(a, !!a.enabled);
        });
    }

    __seq_opt(): any {
        return {underscored: true}
    }

    __table_name(): string {
        return "Users";
    }

    private static generate_db_passw(salt: string, password: string): string {
        let shasum = crypto.createHash('sha256');
        return shasum.update(password + salt).digest('hex');
    }

    private static generate_user(user: User, enabled_state: boolean) {
        let salt = Math.random().toString(36).substr(2); //11chars salt
        user.set('salt', salt);
        user.set('password', this.generate_db_passw(salt, user.get('password').toString()));
        user.set('enabled', enabled_state);
    }

    public authenticate(password: string): void {
        let reg = new RegExp(AUTHENTICATION_PASSWORD_RULE.join(''), 'g');
        if (!!password.match(reg)?.length) throw Error("PSW RULE NOT MATCHED");
        if (this.get('password') !== User.generate_db_passw(this.get('salt').toString(), password)) throw Error("INVALID CREDENTIALS");
        if (!this.get('enabled')) throw Error("USER NOT ENABLED");
        this.set('last_login', Date.now());
        this.save();
    }
}