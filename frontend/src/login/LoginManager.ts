import UserData from "./UserData";
import Comparator from "./comparator/Comparator";
import EventExecution from "./EventExecution";
import Authenticator from "../network/http_client/Authenticator";
import {authentication_header} from "../settings/settings";
import {login} from "../settings/requests";
import LoginResult from "./LoginResult";
import {chrome_local_storage_get, chrome_local_storage_set} from "../settings/chrome_apis";

let singleton_login_manager = null;

export default class LoginManager implements Authenticator{

    private _current_user:UserData = null;

    private readonly loc_username = "username";
    private readonly loc_name = "name";
    private readonly loc_permissions = "permissions";
    private readonly loc_is_logged = "is_logged";
    private readonly loc_token = "tok";

    private is_logged = false;
    private token:string;

    constructor() {}

    async load_user(): Promise<void>{
        if(await chrome_local_storage_get(this.loc_is_logged)) {
            this.is_logged = true;
            this.token = await chrome_local_storage_get(this.loc_token);
            this._current_user = new UserData(
                await chrome_local_storage_get(this.loc_username),
                await chrome_local_storage_get(this.loc_name),
                JSON.parse(await chrome_local_storage_get(this.loc_permissions))
            )
        } else {
            this.is_logged = false;
            this.token = "<invalid>";
        }
    }

    static async getEnvLogin(): Promise<LoginManager> {
        if (singleton_login_manager == null){
            singleton_login_manager = new LoginManager();
            await singleton_login_manager.load_user()
        }
        return singleton_login_manager;
    }

    async isLogged(): Promise<boolean> {
        return await chrome_local_storage_get(this.loc_is_logged) !== null;
    }

    async login(username: string, password: string): Promise<LoginResult>{
        let login_res = await login.run({"$username": username, "$password": password}, false);
        if(login_res.response_code === 403) return new LoginResult(false, login_res.data.message);
        if(login_res.response_code === 200){
            await chrome_local_storage_set(this.loc_username, username);
            await chrome_local_storage_set(this.loc_name, login_res.data.name ?? "UNKNOWN");
            await chrome_local_storage_set(this.loc_permissions, JSON.stringify(login_res.data.permissions));
            await chrome_local_storage_set(this.loc_token, login_res.data.token);
            await chrome_local_storage_set(this.loc_is_logged, "true");
            await this.load_user();
            return new LoginResult(true, "OK");
        }
        return new LoginResult(false, "Unknown error");
    }

    async logout(){
        await chrome_local_storage_set(this.loc_username, "");
        await chrome_local_storage_set(this.loc_name, name);
        await chrome_local_storage_set(this.loc_permissions, JSON.stringify([]));
        await chrome_local_storage_set(this.loc_token, "");
        await chrome_local_storage_set(this.loc_is_logged, "notrue");
        await this.load_user()
    }


    get current_user(): UserData {
        return this._current_user;
    }

    requireAuth(required_permissions: Comparator<UserData>, fun: any): any {
        return fun.execute(this.is_logged && required_permissions.eval(this._current_user))(this.is_logged ? this._current_user : undefined);
    }

    doAuthentication(headers, body, oth): boolean {
        if(!this.is_logged) return false;
        headers[authentication_header] = this.token;
        return true;
    }
}
