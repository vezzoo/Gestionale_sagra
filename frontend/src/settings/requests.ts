import Elaborator from "../network/http_client/Elaborator";
import HttpRequestTemplate from "../network/http_client/HttpRequestTemplate";
import LoginManager from "../login/LoginManager";
import Authenticator from "../network/http_client/Authenticator";

const base_path = "http://localhost:3000";

const json_processor = new class implements Elaborator{
    elaborate(raw_fetch: any): Promise<any> {
        return raw_fetch.json();
    }
};

const text_processor = new class implements Elaborator{
    elaborate(raw_fetch: any): Promise<any> {
        return raw_fetch.text();
    }
};

const blob_processor = new class implements Elaborator{
    elaborate(raw_fetch: any): Promise<any> {
        return raw_fetch.blob();
    }
};

const authenticator = new class implements Authenticator{
    async doAuthentication(headers, body, oth): Promise<boolean> {
        let login_manager = await LoginManager.getEnvLogin();
        return await login_manager.doAuthentication(headers, body, oth);
    }
}

/*no auth requests*/

export const REQ_LOGIN = new HttpRequestTemplate("POST", base_path + "/users/authenticate", json_processor)
    .addBody("username", "$username")
    .addBody("password", "$password");

/*auth requests*/

export const AUTH_STILL_VALID = new HttpRequestTemplate("GET", base_path + "/users/authenticate", json_processor, authenticator);
