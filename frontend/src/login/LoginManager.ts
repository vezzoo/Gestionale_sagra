import UserData from "./UserData";
import Comparator from "./comparator/Comparator";
import EventExecution from "./EventExecution";
import Authenticator from "../network/http_client/Authenticator";
import {authentication_header} from "../settings/settings";
import {AUTH_STILL_VALID, REQ_LOGIN} from "../settings/requests";
import LoginResult from "./LoginResult";
import {chrome_local_storage_get, chrome_local_storage_set} from "../settings/chrome_apis";


export default class LoginManager implements Authenticator {

    private _current_user: UserData = null;
    private static singleton_login_manager: LoginManager|null = null;

    private readonly loc_username = "username";
    private readonly loc_name = "name";
    private readonly loc_permissions = "permissions";
    private readonly loc_is_logged = "is_logged";
    private readonly loc_token = "tok";

    private is_logged = false;
    private token: string;

    private constructor() {}

    private async load_user(): Promise<void>{
        if(await this.isLogged()) {
            this.is_logged = true;
            this.token = await chrome_local_storage_get(this.loc_token);
            let perm = [];
            try{
                perm = JSON.parse(await chrome_local_storage_get(this.loc_permissions));
            } catch (e) {}
            this._current_user = new UserData(
                await chrome_local_storage_get(this.loc_username),
                await chrome_local_storage_get(this.loc_name),
                perm
            );
            console.log("Loaded user:", this.current_user)
        } else {
            this.is_logged = false;
            this.token = "<invalid>";
        }
    }

    static async getEnvLogin(): Promise<LoginManager> {
        if (this.singleton_login_manager == null){
            this.singleton_login_manager = new LoginManager();
            await this.singleton_login_manager.load_user()
        }
        return this.singleton_login_manager;
    }

    static getEnvLoginSync(): LoginManager {
        if (this.singleton_login_manager == null){
            throw Error("Login has not been instantiated, needed an await call")
        }
        return this.singleton_login_manager;
    }

    async isLogged(): Promise<boolean> {
        return await chrome_local_storage_get(this.loc_is_logged) === "true";
    }

    async login(username: string, password: string): Promise<LoginResult>{
        let login_res = await REQ_LOGIN.run({"$username": username, "$password": password}, false);
        if(login_res.response_code === 403) return new LoginResult(false, login_res.data.message);
        if(login_res.response_code === 200){
            await chrome_local_storage_set(this.loc_username, username);
            await chrome_local_storage_set(this.loc_name, login_res.data.name ?? username);
            await chrome_local_storage_set(this.loc_permissions, JSON.stringify(login_res.data.permissions));
            await chrome_local_storage_set(this.loc_token, login_res.data.token);
            await chrome_local_storage_set(this.loc_is_logged, "true");
            await this.load_user();
            return new LoginResult(true, "OK");
        }
        return new LoginResult(false, "Unknown error");
    }

    async logout() {
        await chrome_local_storage_set(this.loc_username, "");
        await chrome_local_storage_set(this.loc_name, name);
        await chrome_local_storage_set(this.loc_permissions, "[]");
        await chrome_local_storage_set(this.loc_token, "");
        await chrome_local_storage_set(this.loc_is_logged, "notrue");
        await this.load_user()
    }

    async is_valid(){
        try {
            await AUTH_STILL_VALID.run({});
            return true;
        } catch (e) {
            return false;
        }
    }

    get current_user(): UserData {
        return this._current_user;
    }

    requireAuth(required_permissions: Comparator<UserData>, fun: any): any {
        return fun.execute(this.is_logged && required_permissions.eval(this._current_user))(this.is_logged ? this._current_user : undefined);
    }


    async doAuthentication(headers, body, oth): Promise<boolean> {
        if(!this.is_logged) return false;
        headers[authentication_header] = this.token;
        return true;
    }
}
