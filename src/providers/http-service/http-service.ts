import { UtilServiceProvider } from './../util-service/util-service';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, App, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { BaseUrl } from '../../api/api';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

@Injectable()
export class HttpServiceProvider {

  constructor(private utilService: UtilServiceProvider,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private app: App,
    public http: HttpClient) {
  }

  /**
   * http 请求
   * @param api 
   * @param params 
   * @param options 
   * @param isJson 
   */
  doHttp(api: object, params?: any, options?: object, isJson?: boolean): Observable<any> {
    let token = localStorage.token ? localStorage.token : '';
    // 默认请求配置
    if (!options) {
      options = {
        headers: new HttpHeaders({
          // 'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': token
        })
      }
    }
    if (isJson) {
      options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': localStorage.token
        })
      }
      params = JSON.stringify(params);
    }
    let result;
    let url = BaseUrl + api[0];
    switch (api[1]) {
      // POST请求
      case 1:
        if (!isJson) {
          let formData = new FormData();
          for (let key in params) {
            if (key === 'file') {
              let file = params[key];
              formData.append('file', file, file.name);
            } else {
              formData.append(key, params[key]);
            }
          }
          result = this.http.post(url, formData, options)
            .pipe(
              retry(3),
              catchError(this.handleError)
            );
        } else {
          result = this.http.post(url, params, options)
            .pipe(
              retry(3),
              catchError(this.handleError)
            );
        }
        break;
      case 2:
        // PUT请求
        if (!isJson) {
          let formData = new FormData();
          for (let key in params) {
            if (key === 'file') {
              let file = params[key];
              formData.append('file', file, file.name);
            } else {
              formData.append(key, params[key]);
            }
          }
          result = this.http.put(url, formData, options)
            .pipe(
              retry(3),
              catchError(this.handleError)
            );
        } else {
          result = this.http.put(url, params, options)
            .pipe(
              retry(3),
              catchError(this.handleError)
            );
        }
        break;
      // DELETE请求
      case 3:
        result = this.http.delete(url, options)
          .pipe(
            retry(3),
            catchError(this.handleError)
          );
        break;
      // GET请求
      default:
        if (params) {
          url += '?' + this.utilService.toQueryString(params);
        }
        result = this.http.get(url, options)
          .pipe(
            retry(3),
            catchError(this.handleError)
          );
    }
    return this.checkStatus(result);
  }

  /**
   * 判断是否错误
   * @param result
   */
  checkStatus(result: Observable<any>): Observable<any> {
    return new Observable((observer) => {
      result.subscribe(
        data => {
          let code = data.code;
          switch (code) {
            case 0:
              observer.next(data);
              break;
            case 401:
              localStorage.removeItem('user');
              localStorage.removeItem('token');
              this.app.getRootNav().setRoot('LoginPage');
              this.toast('请重新登录');
              break;
            case 1: case -1:
            case 403:
            default:
              this.toast(data.msg);
              observer.error(data);
              break;
          }
        },
        err => {
          this.alert('网络错误', '请检查网络连接');
          observer.error(err);
        }
      );
    });
  }

  /**
   * http请求异常捕获
   * @param error
   */
  private handleError(error: HttpErrorResponse): ErrorObservable{
    return Observable.throw(error);
  }


  toast(msg: string): void {
    this.toastCtrl.create({
      message: msg,
      position: 'bottom',
      duration: 2000,
    }).present();
  }

  alert(title: string, msg: string): void {
    this.alertCtrl.create({
      title: title,
      subTitle: msg,
      buttons: ['确定']
    }).present();
  }
}
