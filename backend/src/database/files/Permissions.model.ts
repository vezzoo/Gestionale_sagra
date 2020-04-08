import {DataTypes, Model} from "sequelize";
import Field from "../Field";
import DBModel from "../DBModel";
import User from "./Users.model";

export default class UserPermission extends Model implements DBModel{

    public group: string | Field = new Field(DataTypes.STRING(32)).allowNull(false);

    references(): void{
        console.log("Permissions refs");
        UserPermission.belongsTo(User);
    }

    __seq_opt(): any {
        return {underscored: true}
    }

    __table_name(): string {
        return "Permissions";
    }
}