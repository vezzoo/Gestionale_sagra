import FluentSchema from 'fluent-schema'
import {AbstractDataType, AbstractDataTypeConstructor} from "sequelize/types/lib/data-types";
import {Model} from "sequelize";

export default class Field{
    get obj(): { type?: AbstractDataType | AbstractDataTypeConstructor; allowNull?: boolean; defaultValue?: any; unique?: boolean | string; primaryKey?: boolean; field?: string; autoIncrement?: boolean; autoIncrementIdent?: number; comment?: string | null; onUpdate?: string; onDelete?: string; get?: any; set?: any; validate?: any } {
        return this._obj;
    }

    private _obj: {
        type?: AbstractDataType | AbstractDataTypeConstructor
        allowNull?: boolean, //true
        defaultValue?: any, //null
        unique?: boolean | string //false
        primaryKey?: boolean //false
        field?: string //null
        autoIncrement?: boolean //false
        autoIncrementIdent?: number //1
        comment?: string|null //null
        onUpdate?: string,
        onDelete?: string,
        get?: any,
        set?: any,
        validate?: any
    } = {};

    constructor(typ: AbstractDataType) {
        this._obj.type = typ;
    }

    allowNull(e = true): Field{
        this._obj.allowNull = e;
        return this;
    }
    defaultValue(e: any): Field{
        this._obj.defaultValue = e;
        return this;
    }

    unique(e: boolean | string): Field{
        this._obj.unique = e;
        return this;
    }
    primaryKey(e = true): Field{
        this._obj.primaryKey = e
        return this;
    }
    field(e: string): Field{
        this._obj.field = e
        return this;
    }
    autoIncrement(e = true): Field{
        this._obj.autoIncrement = e
        return this;
    }
    autoIncrementIdent(e:number): Field{
        this._obj.autoIncrementIdent = e
        return this;
    }
    comment(e:string | null): Field{
        this._obj.comment = e
        return this;
    }
    onUpdate(e:string): Field{
        this._obj.onUpdate = e
        return this;
    }
    onDelete(e :string): Field{
        this._obj.onDelete = e
        return this;
    }
    get(e: any): Field{
        this._obj.get = e;
        return this;
    }
    set(e: any): Field{
        this._obj.set = e;
        return this;
    }
    validate(e: any): Field{
        this._obj.validate = e;
        return this;
    }

}