import { Message } from './Message';

export class User {
    id: number;
    username: string;
    phone: string;
    avatar: string;
    state: number;
    followedNum: number;
    followingNum: number;
    gmtCreate: Date;
    gmtModified: Date;
    lastChat: Message;
    unReadNum: number;
}