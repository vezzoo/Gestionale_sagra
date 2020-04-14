import Elaborator from "../network/http_client/Elaborator";
import HttpRequestTemplate from "../network/http_client/HttpRequestTemplate";

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

export const REQ_LOGIN = new HttpRequestTemplate("POST", base_path + "/users/authenticate", json_processor)
    .addBody("username", "$username")
    .addBody("password", "$password");

/*auth requests*/
