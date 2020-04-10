import {AllowNull, Column, Model, PrimaryKey, Table, BelongsTo, ForeignKey} from "sequelize-typescript";
import {DataTypes} from "sequelize";
import User from "./Users.model";
import sequelize_fix from "../sequelize_fix";

@Table({
    timestamps: false,
    freezeTableName: true,
    tableName: "Permissions"
})
export default class UserPermission extends Model<UserPermission>{


    @AllowNull(false)
    @PrimaryKey
    @Column(DataTypes.STRING(128))
    public group!: string;

    @AllowNull(false)
    @PrimaryKey
    @ForeignKey(() => User)
    @Column(DataTypes.STRING(128))
    public username!: User;

    // @BelongsTo(() => User)
    // public team!: User;

    constructor(...args: any) {
        super(...args);
        sequelize_fix(new.target, this);
    }
}