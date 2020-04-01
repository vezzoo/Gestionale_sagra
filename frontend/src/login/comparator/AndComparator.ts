import Comparator from "./Comparator";

export default class AndComparator<T> implements Comparator<T> {
    private conditions: Comparator<T>[] = [];

    add(c: Comparator<T>): AndComparator<T> {
        this.conditions.push(c);
        return this;
    }

    eval(value: T): boolean {
        for (let cond of this.conditions)
            if (!cond.eval(value)) return false;
        return true;
    }
}
