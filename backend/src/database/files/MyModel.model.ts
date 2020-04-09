import {DataTypes, Model} from "sequelize";
import Field from "../Field";
import DBModel from "../DBModel";
import {Column, PrimaryKey, Table} from "sequelize-typescript";

@Table
export default class MyModel extends Model<MyModel>{

    @PrimaryKey
    @Column(DataTypes.STRING(128))
    lol_name!: string;


}