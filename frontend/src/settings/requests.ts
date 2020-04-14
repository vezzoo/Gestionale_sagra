import Elaborator from "../network/http_client/Elaborator";
import HttpRequestTemplate from "../network/http_client/HttpRequestTemplate";
import LoginManagerAutenticathor from "../login/LoginManagerAutenticathor";

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

/*no auth requests*/

export const REQ_LOGIN = new HttpRequestTemplate("POST", base_path + "/users/user_login", json_processor)
    .addBody("username", "$username")
    .addBody("password", "$password");

/*auth requests*/

export const AUTH_STILL_VALID = new HttpRequestTemplate("GET", base_path + "/users/alive", json_processor, new LoginManagerAutenticathor());
