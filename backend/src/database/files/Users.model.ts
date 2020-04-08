import {DataTypes, Model} from "sequelize";
import Field from "../Field";
import DBModel from "../DBModel";
import crypto from 'crypto'
import {USER_CREATION_DISABLE} from "../../settings";
import UserPermission from "./Permissions.model";

function generate_user(user: User, enabled_state: boolean) {
    let salt = Math.random().toString(36).substr(2); //11chars salt
    let shasum = crypto.createHash('sha256');
    shasum.update(user.password + salt);
    user.salt = salt;
    user.password = shasum.digest('hex');
    user.enabled = enabled_state;
}

export default class User extends Model implements DBModel {

    public username: string | Field = new Field(DataTypes.STRING(128)).primaryKey().allowNull(false);
    public name: string | Field = new Field(DataTypes.STRING(128)).allowNull(true);
    public password: string | Field = new Field(DataTypes.STRING(64)).allowNull(false);
    public enabled: boolean | Field = new Field(DataTypes.BOOLEAN);
    public salt: string | Field = new Field(DataTypes.STRING(11));

    references(): void {
        console.log("User before creation hook");
        User.addHook('beforeCreate', (a: User, options) => {
            generate_user(a, !USER_CREATION_DISABLE);
        });
        console.log("User before update hook");
        User.addHook('beforeCreate', (a: User, options) => {
            let changed = a.changed();
            if (changed && changed.indexOf('password') > -1) generate_user(a, !!a.enabled);
        });

        User.hasMany(UserPermission, {
            sourceKey: 'username',
            foreignKey: 'username',
            as: 'user_permissions' // this determines the name in `associations`!
        });
    }

    __seq_opt(): any {
        return {underscored: true}
    }

    __table_name(): string {
        return "Users";
    }
}