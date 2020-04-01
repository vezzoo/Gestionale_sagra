import UserData from "./UserData";
import Comparator from "./comparator/Comparator";
import EventExecution from "./EventExecution";
import Authenticator from "../network/http_client/Authenticator";
import {authentication_header} from "../settings/settings";
import {login} from "../settings/requests";
import LoginResult from "./LoginResult";

let singleton_login_manager = null;

export default class LoginManager implements Authenticator{

    private _current_user:UserData = null;

    private readonly loc_username = "username";
    private readonly loc_name = "name";
    private readonly loc_permissions = "permissions";
    private readonly loc_is_logged = "is_logged";
    private readonly loc_token = "tok";

    constructor() {
        if (localStorage.getItem(this.loc_is_logged) == "true") {
            this.load_user();
        }
    }

    private load_user(){
        this._current_user = new UserData(
            localStorage.getItem(this.loc_username),
            localStorage.getItem(this.loc_name),
            JSON.parse(localStorage.getItem(this.loc_permissions))
        )
    }

    static getEnvLogin(): LoginManager {
        if (singleton_login_manager == null) singleton_login_manager = new LoginManager();
        return singleton_login_manager;
    }

    isLogged(): boolean {
        return localStorage.getItem(this.loc_is_logged) !== null;
    }

    async login(username: string, password: string): Promise<LoginResult>{
        let login_res = await login.run({"$username": username, "$password": password}, false);
        if(login_res.response_code === 403) return new LoginResult(false, login_res.data.message);
        if(login_res.response_code === 200){
            localStorage.setItem(this.loc_username, username);
            localStorage.setItem(this.loc_name, login_res.data.name ?? "UNKNOWN");
            localStorage.setItem(this.loc_permissions, JSON.stringify(login_res.data.permissions));
            localStorage.setItem(this.loc_token, login_res.data.token);
            localStorage.setItem(this.loc_is_logged, "true");
            this.load_user();
            return new LoginResult(true, "OK");
        }
        return new LoginResult(false, "Unknown error");
    }

    logout(){
        localStorage.setItem(this.loc_username, "");
        localStorage.setItem(this.loc_name, name);
        localStorage.setItem(this.loc_permissions, JSON.stringify([]));
        localStorage.setItem(this.loc_token, "");
        localStorage.setItem(this.loc_is_logged, "notrue");
        this.load_user()
    }


    get current_user(): UserData {
        return this._current_user;
    }

    requireAuth(required_permissions: Comparator<UserData>, fun: any): any {
        return fun.execute(this.isLogged() && required_permissions.eval(this._current_user))(this.isLogged() ? this._current_user : undefined);
    }

    doAuthentication(headers, body, oth): boolean {
        if(!this.isLogged()) return false;
        headers[authentication_header] = localStorage.getItem(this.loc_token);
        return true;
    }
}
