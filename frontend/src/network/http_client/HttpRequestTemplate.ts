import Authenticator from "./Authenticator";
import FetchResponse from "./FetchResponse";
import Elaborator from "./Elaborator";

export default class HttpRequestTemplate{
    private method: string;
    private url: string;
    private authenticator: Authenticator = null;
    private elaborator: Elaborator = null;
    private headers: any = {};
    private body: any = {};
    private oth: any = {};

    constructor(method: string, url: string, elaborator?: Elaborator, authentication?: Authenticator) {
        this.method = method;
        this.url = url;
        this.authenticator = authentication ?? null;
        this.elaborator = elaborator ?? null;
    }

    addHeader(name: string, value: string): HttpRequestTemplate{
        this.headers[name] = value;
        return this;
    }

    addBody(name: string, value: string): HttpRequestTemplate{
        this.body[name] = value;
        return this;
    }

    addOth(name: string, value: string): HttpRequestTemplate{
        this.oth[name] = value;
        return this;
    }

    private replaceValues(fill, elm){
        let keys = Object.keys(fill);
        Object.keys(elm).forEach(e => {
            if(keys.indexOf(elm[e]) >= 0) elm[e] = fill[elm[e]];
        });
        return elm
    }

    run(fill?: any, do_fail = true): Promise<FetchResponse>{
        return new Promise<FetchResponse>(async (resolve, reject) => {
            this.body = this.replaceValues(fill, this.body);
            this.oth = this.replaceValues(fill, this.oth);
            this.headers = this.replaceValues(fill, this.headers);

            if(Object.keys(this.body).length > 0) this.headers["Content-Type"] = "application/json";
            if(this.authenticator) this.authenticator.doAuthentication(this.headers, this.body, this.oth);

            let raw;
            try{
                raw = await fetch(this.url, Object.assign(this.oth, {
                    method: this.method,
                    headers: this.headers,
                    body: Object.keys(this.body).length > 0 ? JSON.stringify(this.body) : undefined
                }));
            } catch (e) {
                reject(e);
            }

            if(raw.status >= 400 && do_fail) reject(raw);
            resolve(new FetchResponse(raw, raw.status, await this.elaborator.elaborate(raw)));
        });
    }
}
