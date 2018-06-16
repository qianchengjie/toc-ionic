export class Comment {
    id: number;
    bId: number;
    pId: number;
    userId: number;
    content: string;
    upvoteNum: number;
    upvoteState: number;
    state: number;
    gmtCreate: Date;
    gmtModified: Date;
}