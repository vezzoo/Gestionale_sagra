export default class FetchResponse{
    private readonly _raw: any;
    private readonly _response_code: number;
    private readonly _data: any;

    get raw(): any {
        return this._raw;
    }

    get response_code(): number {
        return this._response_code;
    }

    get data(): any {
        return this._data;
    }

    constructor(raw: any, response_code: number, data: any) {
        this._raw = raw;
        this._response_code = response_code;
        this._data = data;
    }
}
