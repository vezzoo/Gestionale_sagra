import Comparator from "../Comparator";

export default class StringArrayComparatorAtLeast implements Comparator<string[]>{
    private template: string[] = [];
    private at_least: number;

    constructor(template: string[], at_least:number) {
        this.template = template;
        this.at_least = at_least;
    }

    eval(value: string[]): boolean {
        let num = 0;
        for (let i of this.template) if(value.indexOf(i) > 0) num++;
        return num >= this.at_least;
    }
}
