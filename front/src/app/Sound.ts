export class Sound {
    name: string;
    source: string;
    createdAt: Date;

    constructor(public n: string, public s: string) {
        this.name = n;
        this.source = s;
    }
}
