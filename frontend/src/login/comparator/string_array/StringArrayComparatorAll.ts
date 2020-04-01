import Comparator from "../Comparator";

export default class StringArrayComparatorAll implements Comparator<string[]>{
    private template: string[] = [];

    constructor(template: string[]) {
        this.template = template;
    }

    eval(value: string[]): boolean {
        for (let i of this.template) if(value.indexOf(i) < 0) return false;
        return true;
    }
}
