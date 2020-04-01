import Comparator from "../Comparator";

export default class StringComparator implements Comparator<string>{
    private template: string;

    constructor(template: string) {
        this.template = template;
    }

    eval(value: string): boolean {
        return value === this.template;
    }
}
