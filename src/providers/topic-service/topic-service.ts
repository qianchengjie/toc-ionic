import { UtilServiceProvider } from './../util-service/util-service';
import { History } from './../../models/History';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TopicApi } from "../../api/api";
import { Topic } from '../../models/Topic';
import { HttpServiceProvider } from './../http-service/http-service';
import { Collection } from './../../models/Collection';

@Injectable()
export class TopicServiceProvider {
  
  constructor(private httpService: HttpServiceProvider,
    private utilService: UtilServiceProvider,
    public http: HttpClient) {
  }

  /**
   * 提交话题
   * @param topic 
   */
  submitTopic(topic: Topic): Observable<any> {
    return this.httpService.doHttp(TopicApi.submitTopic, topic, {}, true);
  }

  getAllTopics(): Observable<any> {
    return this.httpService.doHttp(TopicApi.getAllTopics);
  }

  findAllHistory(userId: number, pageNum: number): Observable<any> {
    return this.httpService.doHttp(TopicApi.findAllHistory, { userId, pageNum });
  }

  addHistroy(history: History): Observable<any> {
    return this.httpService.doHttp(TopicApi.addHistory, history);
  }

  
  findAllCollection(userId: number, pageNum: number): Observable<any> {
    return this.httpService.doHttp(TopicApi.findAllCollection, { userId, pageNum });
  }

  addCollection(collection: Collection): Observable<any> {
    return this.httpService.doHttp(TopicApi.addCollection, collection);
  }
  
  findCollection(userId: number, topicId: number): Observable<any> {
    return this.httpService.doHttp(TopicApi.findCollection, { userId, topicId });
  }
  
  deleteCollection(collectionId: number): Observable<any> {
    let api = this.utilService.deepClone(TopicApi.deleteCollection);
    api[0] = this.utilService.placeholder(api[0], { id: collectionId });
    return this.httpService.doHttp(api);
  }

  searchTopic(val: string): Observable<any> {
    return this.httpService.doHttp(TopicApi.searchTopic, { val });
  }

}
