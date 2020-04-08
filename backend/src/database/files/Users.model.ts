import {DataTypes, Model} from "sequelize";
import Field from "../Field";
import DBModel from "../DBModel";

export default class User extends Model implements DBModel{

    public username: string | Field = new Field(DataTypes.STRING(128)).primaryKey().allowNull(false);
    public name: string | Field = new Field(DataTypes.STRING(128)).allowNull(true);
    public password: string | Field = new Field(DataTypes.STRING(128)).allowNull(false);
    public enabled: boolean | Field = new Field(DataTypes.BOOLEAN);
    public salt: string | Field = new Field(DataTypes.STRING(16));

    references(): void{
        User.addHook('beforeValidate', (a: User, options) => {

        })
    }

    __seq_opt(): any {
        return {underscored: false}
    }

    __table_name(): string {
        return "mymodelz";
    }
}