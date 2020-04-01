import Comparator from "../Comparator";

export default class StringArrayComparatorContain implements Comparator<string[]> {
    private template: string;

    constructor(template: string) {
        this.template = template;
    }

    eval(value: string[]): boolean {
        return value.indexOf(this.template) >= 0;
    }
}
