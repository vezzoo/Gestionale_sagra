import UserData from "./UserData";
import Comparator from "./comparator/Comparator";
import EventExecution from "./EventExecution";

let singleton_login_manager = null;

export default class LoginManager {

    private current_user = null;

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
        this.current_user = new UserData(
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

    login(username: string, name: string, permissions: string[], token:string){
        localStorage.setItem(this.loc_username, username);
        localStorage.setItem(this.loc_name, name);
        localStorage.setItem(this.loc_permissions, JSON.stringify(permissions));
        localStorage.setItem(this.loc_token, token);
        localStorage.setItem(this.loc_is_logged, "true");
        this.load_user();

    }

    logout(){
        localStorage.setItem(this.loc_username, "");
        localStorage.setItem(this.loc_name, name);
        localStorage.setItem(this.loc_permissions, JSON.stringify([]));
        localStorage.setItem(this.loc_token, "");
        localStorage.setItem(this.loc_is_logged, "notrue");
        this.load_user()
    }

    requireAuth(required_permissions: Comparator<UserData>, fun: any): any {
        return fun.execute(this.isLogged() && required_permissions.eval(this.current_user))(this.isLogged() ? this.current_user : undefined);
    }
}
