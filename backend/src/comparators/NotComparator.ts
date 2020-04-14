import Comparator from "./Comparator";

export default class NotComparator<T> implements Comparator<T> {
    private conditions: Comparator<T>;

    constructor(conditions: Comparator<T>) {
        this.conditions = conditions;
    }

    eval(value: T): boolean {
        return !this.conditions.eval(value);
    }
}
