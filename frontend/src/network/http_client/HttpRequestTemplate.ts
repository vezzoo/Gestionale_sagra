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

    async run(fill?: any, do_fail = true): Promise<FetchResponse>{
        return new Promise<FetchResponse>(async (resolve, reject) => {
            let b = JSON.parse(JSON.stringify(this.body));
            let o = JSON.parse(JSON.stringify(this.oth));
            let h = JSON.parse(JSON.stringify(this.headers));
            b = this.replaceValues(fill, b);
            o = this.replaceValues(fill, o);
            h = this.replaceValues(fill, h);


            if(Object.keys(b).length > 0) h["Content-Type"] = "application/json";
            if(this.authenticator)
                if(!await this.authenticator.doAuthentication(h, b, o))
                    reject("Cannot do authentication!");

            let raw;
            try{
                raw = await fetch(this.url, Object.assign(o, {
                    method: this.method,
                    headers: h,
                    body: Object.keys(b).length > 0 ? JSON.stringify(b) : undefined
                }));
            } catch (e) {
                reject(e);
            }

            if(raw.status >= 400 && do_fail) reject(raw);
            resolve(new FetchResponse(raw, raw.status, await this.elaborator.elaborate(raw)));
        });
    }
}
