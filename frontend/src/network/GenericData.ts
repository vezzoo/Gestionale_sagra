import Data from "./Data";

export default class GenericData implements Data{

    private data: ArrayBuffer;

    constructor(data: ArrayBuffer) {
        this.data = data;
    }

    static fromString(data: string): Data{
        let buf = new ArrayBuffer(data.length);
        let bufView = new Uint8Array(buf);
        for (let i=0, strLen=data.length; i < strLen; i++) {
            bufView[i] = data.charCodeAt(i);
        }
        return new GenericData(buf);
    }

    static fromObject(data: any){
        return GenericData.fromString(JSON.stringify(data));
    }

    getData(): ArrayBuffer {
        return this.data;
    }

    getInfos(): any {
        return undefined;
    }
}
