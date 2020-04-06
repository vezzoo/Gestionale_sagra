import {DataTypes, Model} from "sequelize";
import Field from "../Field";
import DBModel from "../DBModel";

export default class MyModel extends Model implements DBModel{

    public lol_name: string | Field = new Field(DataTypes.STRING(128)).allowNull().primaryKey();

    references(): void{
        // MyModel.belongsTo(MyModel, {targetKey: 'id'});
        // MyModel.hasOne(MyModel,{sourceKey: 'id'});
        // MyModel.hasMany(MyModel,{sourceKey: 'id'});
        // MyModel.addHook('beforeValidate', (a: MyModel, options) => {
        //     a.lol_name = 'happy';
        // })
    }

    __seq_opt(): any {
        return {underscored: false}
    }

    __table_name(): string {
        return "mymodelz";
    }
}