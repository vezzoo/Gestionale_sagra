export default interface Elaborator{
    elaborate(raw_fetch: any): Promise<any>;
}
