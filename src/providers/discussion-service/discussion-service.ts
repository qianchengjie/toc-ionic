import { UtilServiceProvider } from './../util-service/util-service';
import { HttpHeaders } from '@angular/common/http';
import { Discussion } from './../../models/Discussion';
import { Observable } from 'rxjs';
import { HttpServiceProvider } from './../http-service/http-service';
import { Injectable } from '@angular/core';
import { DiscussionApi } from '../../api/api';

@Injectable()
export class DiscussionServiceProvider {

  constructor(private utilService: UtilServiceProvider,
    private httpService: HttpServiceProvider) {
  }

  /**
   * 提交讨论
   * @param discussion
   */
  submitDiscussion(discussion: Discussion): Observable<any> {
    return this.httpService.doHttp(DiscussionApi.submitDiscussion, discussion, {}, true);
  }

  /**
   * 获取改topicId的所有讨论
   * @param topicId
   */
  getAllDiscussionByTopicId(topicId: number): Observable<any> {
    let api = this.utilService.deepClone(DiscussionApi.getAllDiscussionByTopicId);
    api[0] = this.utilService.placeholder(api[0], { topicId });
    return this.httpService.doHttp(api);
  }

}
