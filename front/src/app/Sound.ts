export class Sound {
    name: string;
    link: string;
    createdAt: Date;

    constructor(public n: string, public l: string) {
        this.name = n;
        this.link = l;
    }
}
