export default class UserData {
    private _username: string;
    private _name: string;
    private _permissions: string[];
    private _additional_data = {};

    get additional_data(): {} {
        return this._additional_data;
    }

    get username(): string {
        return this._username;
    }

    get name(): string {
        return this._name;
    }

    get permissions(): string[] {
        return this._permissions;
    }

    constructor(username: string, name: string, permissions: string[], add: any) {
        this._username = username;
        this._name = name;
        this._permissions = permissions;
        this._additional_data = add;
    }
}
