export default interface Comparator<T>{
    eval(value: T): boolean;
}
