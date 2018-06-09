export class Discussion {
    id: number;
    userId: number;
    topicId: number;
    content: string;
    images: string;
    upvoteNum: number;
    commentNum: number;
    state: number;
    gmtCreate: Date;
    gmtModified: Date;
}