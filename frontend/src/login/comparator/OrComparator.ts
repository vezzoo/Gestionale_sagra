import Comparator from "./Comparator";

export default class OrComparator<T> implements Comparator<T> {
    private conditions: Comparator<T>[] = [];

    add(c: Comparator<T>): OrComparator<T> {
        this.conditions.push(c);
        return this;
    }

    eval(value: T): boolean {
        for (let cond of this.conditions)
            if(cond.eval(value)) return true;
        return false;
    }
}
