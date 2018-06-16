import { Comment } from './../../models/Comment';
import { UtilServiceProvider } from './../util-service/util-service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpServiceProvider } from '../http-service/http-service';
import { CommentApi } from '../../api/api';

@Injectable()
export class CommentServiceProvider {

  constructor(private utilService: UtilServiceProvider,
    private httpService: HttpServiceProvider) {
  }

  addComment(comment: Comment): Observable<any> {
    return this.httpService.doHttp(CommentApi.addComment, comment, {}, true);
  }

  findAllByPage(userId: number, pId: number, pageNum: number): Observable<any> {
    let api = this.utilService.deepClone(CommentApi.findAllByPage);
    api[0] = this.utilService.placeholder(api[0], { pId });
    return this.httpService.doHttp(api, { userId, pageNum });
  }

}
