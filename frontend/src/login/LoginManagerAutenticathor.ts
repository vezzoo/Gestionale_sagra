import Authenticator from "../network/http_client/Authenticator";
import LoginManager from "./LoginManager";

export default class LoginManagerAutenticathor implements Authenticator{
    async doAuthentication(headers, body, oth): Promise<boolean> {
        let login_manager = await LoginManager.getEnvLogin();
        return await login_manager.doAuthentication(headers, body, oth);
    }
}
