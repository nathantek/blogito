export class Post {
    like = 0;
    dislike = 0;
    constructor(public title: string, public content: string, public date: number) {
    }
}
