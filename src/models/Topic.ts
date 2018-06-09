export class Topic {
    id: number;
    userId: number;
    title: string;
    content: string;
    images: string;
    upvoteNum: number;
    commentNum: number;
    state: number;
    gmtCreate: Date;
    gmtModified: Date;
}