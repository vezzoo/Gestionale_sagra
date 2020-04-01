export class ng_animation {
    private readonly in_string: string;
    private readonly out_string: string;

    constructor(in_string: string, out_string: string) {
        this.in_string = in_string;
        this.out_string = out_string;
    }

    forward(): string {
        return this.in_string + ' => ' + this.out_string;
    }

    reverse(): string {
        return this.out_string + ' => ' + this.in_string;
    }
}
