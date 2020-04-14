import Comparator from "./Comparator";

export default class OneOfComparator<T> implements Comparator<T> {
    private conditions: Comparator<T>[] = [];

    add(c: Comparator<T>): OneOfComparator<T> {
        this.conditions.push(c);
        return this;
    }

    eval(value: T): boolean {
        let tr = 0;
        for(let cond of this.conditions) if(cond.eval(value)) tr++;
        return tr === 1;
    }
}
