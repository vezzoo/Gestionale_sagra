import Comparator from "../Comparator";
import UserData from "../../UserData";

export default class StringComparator implements Comparator<UserData>{

    private comp: Comparator<string[]>;

    constructor(c: Comparator<string[]>) {
        this.comp = c;
    }

    eval(value: UserData): boolean {
        return this.comp.eval(value.permissions);
    }
}
