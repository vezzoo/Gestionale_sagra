import Comparator from "../Comparator";

export default class StringArrayComparatorAllOnly implements Comparator<string[]> {
    private template: string[] = [];

    constructor(template: string[]) {
        this.template = template;
    }

    eval(value: string[]): boolean {
        if (value.length < this.template.length) return false;
        let myt = JSON.parse(JSON.stringify(value));
        for (let i of this.template) {
            if (myt.indexOf(i) < 0) return false;
            myt.splice(myt.indexOf(i), 1);
        }
        return true;
    }
}
