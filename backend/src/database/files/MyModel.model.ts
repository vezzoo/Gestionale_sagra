import {DataTypes, Model} from "sequelize";
import Field from "../Field";
import DBModel from "../DBModel";
import {Column, Table} from "sequelize-typescript";

@Table
export default class MyModel extends Model<MyModel>{

    @Column
    lol_name!: string;


}