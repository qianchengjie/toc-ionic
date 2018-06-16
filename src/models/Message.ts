export class Message {
  id: string;
  content: string;
  from: string;
  to: string;
  status: number;
  sendTime: Date;
  receiveTime: Date;
  destination: string;
  type: number;
  constructor(content: string,
    from: string,
    to: string,
    destination: string,
    type: number) {
    this.content = content;
    this.from = from;
    this.to = to;
    this.destination = destination;
    this.type = type;
  }
}