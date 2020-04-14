import Comparator from "../Comparator";

export default class StringArrayComparatorPreciseNumber implements Comparator<string[]>{
    private template: string[] = [];
    private num: number;

    constructor(template: string[], num:number) {
        this.template = template;
        this.num = num;
    }

    eval(value: string[]): boolean {
        let num = 0;
        for (let i of this.template) if(value.indexOf(i) > 0) num++;
        return num === this.num;
    }
}
