export default interface DbModel{
    __table_name(): string;
    __seq_opt(): any;
    references(): void;
}