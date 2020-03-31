import Elaborator from "../network/http_client/Elaborator";

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

/*auth requests*/
