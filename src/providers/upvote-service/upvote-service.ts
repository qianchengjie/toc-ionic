import { Upvote } from './../../models/Upvote';
import { Observable } from 'rxjs';
import { HttpServiceProvider } from './../http-service/http-service';
import { Injectable } from '@angular/core';
import { UpvoteApi } from '../../api/api';

@Injectable()
export class UpvoteServiceProvider {

  constructor(private httpService: HttpServiceProvider) {
  }
  
  /**
   * 获得点赞情况
   * @param userId
   * @param pId 
   * @param type 
   */
  getUpvoteState(userId: number, pId: number, type: number): Observable<any> {
    return this.httpService.doHttp(UpvoteApi.getUpvoteState, { userId, pId, type });
  }

  /**
   * 点赞或取消点赞
   * @param upvote
   */
  upvote(upvote: Upvote): Observable<any> {
    return this.httpService.doHttp(UpvoteApi.upvote, upvote, {}, true);
  }


}
