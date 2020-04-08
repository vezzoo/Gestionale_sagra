import {DataTypes, Model} from "sequelize";
import Field from "../Field";
import DBModel from "../DBModel";
import User from "./Users.model";

export default class UserPermission extends Model implements DBModel{

    public username: string | Field = new Field(DataTypes.STRING(128)).primaryKey().allowNull(false);
    public group: string | Field = new Field(DataTypes.STRING(32)).primaryKey().allowNull(false);

    references(): void{
        UserPermission.belongsTo(User, {targetKey: 'username'});
    }

    __seq_opt(): any {
        return {underscored: true}
    }

    __table_name(): string {
        return "Permissions";
    }
}