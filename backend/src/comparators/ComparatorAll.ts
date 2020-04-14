import Comparator from "./Comparator";

export default class ComparatorAll<T> implements Comparator<T>{
    eval(value: T): boolean {
        return true;
    }
}