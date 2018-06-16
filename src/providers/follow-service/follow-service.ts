import { Follow } from './../../models/Follow';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpServiceProvider } from '../http-service/http-service';
import { UtilServiceProvider } from '../util-service/util-service';
import { FollowApi } from '../../api/api';

@Injectable()
export class FollowServiceProvider {


  constructor(private httpService: HttpServiceProvider,
    private utilService: UtilServiceProvider) {
  }

  follow(follow: Follow): Observable<any> {
    return this.httpService.doHttp(FollowApi.follow, follow, null, true);
  }
  unfollow(id: number): Observable<any> {
    let api = this.utilService.deepClone(FollowApi.unfollow);
    api[0] = this.utilService.placeholder(api[0], { id });
    return this.httpService.doHttp(api);
  }
  getAllFollowed(userId: number, pageNum: number): Observable<any> {
    let api = this.utilService.deepClone(FollowApi.getAllFollowed);
    api[0] = this.utilService.placeholder(api[0], { userId });
    return this.httpService.doHttp(api, { pageNum });
  }
  getAllFollowing(userId: number, pageNum: number): Observable<any> {
    let api = this.utilService.deepClone(FollowApi.getAllFollowing);
    api[0] = this.utilService.placeholder(api[0], { userId });
    return this.httpService.doHttp(api, { pageNum });
  }

  isFollow(userId: number, followId: number): Observable<any> {
    return this.httpService.doHttp(FollowApi.isFollow, { userId, followId });
  }
  


}
