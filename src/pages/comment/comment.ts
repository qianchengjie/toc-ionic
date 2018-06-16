import { Comment } from './../../models/Comment';
import { CommentServiceProvider } from './../../providers/comment-service/comment-service';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, InfiniteScrollContent, InfiniteScroll } from 'ionic-angular';
import { User } from '../../models/User';
import { UpvoteServiceProvider } from '../../providers/upvote-service/upvote-service';
import { Upvote } from '../../models/Upvote';
import { UPVOTE_TYPE } from '../../consts/UpvoteType';
import { UserInfoPage } from '../user-info/user-info';

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {

  @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;

  date: Date = new Date();
  pageNum: number = 0;
  comments: Array<Comment> = [];
  commentContent: string = '';
  user: User = JSON.parse(localStorage.user);
  pId: number = 2;
  bId: number = 0;
  hasMore: boolean = true;

  constructor(private upvoteService: UpvoteServiceProvider,
    private commentService: CommentServiceProvider,
    public navCtrl: NavController,
    public navParams: NavParams) {
    
    this.pId = navParams.get('pId');
    this.findAllByPage();

  }

  findAllByPage(): void {
    this.commentService.findAllByPage(this.user.id, this.pId, this.pageNum).subscribe(
      data => {
        this.comments = data.data.content;
        this.pageNum++;
        if (data.data.last) {
          this.infiniteScroll.enable(false);
          this.hasMore = false;
        }
      },
      err => {}
    )
  }

  goToUserInfoPage(userinfo): void {
    this.navCtrl.push(UserInfoPage, { userinfo })
  }

  addComment(): void {
    let comment = new Comment();
    comment.userId = this.user.id;
    comment.pId = this.pId;
    comment.bId = this.bId;
    comment.content = this.commentContent;
    this.commentService.addComment(comment).subscribe(
      data => {
        this.commentContent = '';
        this.comments.unshift(data.data);
      },
      err => {}
    )
  }

  doUpvote(comment: Comment): void {
    let upvote = new Upvote();
    upvote.pId = comment.id;
    upvote.userId = this.user.id;
    upvote.type = UPVOTE_TYPE.COMMENT;
    upvote.state = comment.upvoteState === 0 ? 1 : 0;
    this.upvoteService.upvote(upvote).subscribe(
      data => {
        this.comments.forEach(item => {
          if (comment.id === item.id) {
            item.upvoteState = upvote.state;
            if (upvote.state === 0) {
              item.upvoteNum--;
            } else {
              item.upvoteNum++;
            }
          }
        })
      },
      err => {}
    )
  }

  doInfinite() {
    this.commentService.findAllByPage(this.pId, this.pageNum).subscribe(
      data => {
        this.comments = this.comments.concat(data.data.content);
        this.pageNum++;
        if (data.data.last) {
          this.infiniteScroll.enable(false);
          this.hasMore = false;
        }
      },
      err => this.infiniteScroll.complete()
    );
  }

}
