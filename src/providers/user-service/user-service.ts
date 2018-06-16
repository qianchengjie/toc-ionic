import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpServiceProvider } from '../http-service/http-service';
import { UtilServiceProvider } from '../util-service/util-service';
import { UserApi } from '../../api/api';
import { User } from '../../models/User';

@Injectable()
export class UserServiceProvider {


  constructor(private httpService: HttpServiceProvider,
    private utilService: UtilServiceProvider) {
  }

  /**
   * 用户登录或注册
   * @param  {any}
   * @return {Observable<any>}
   */
  login({ phone, code, rememberMe }: any): Observable<any> {
    return this.httpService.doHttp(UserApi.login, { phone, code, rememberMe });
  }
  
  /**
   * 获取验证码
   * @param  {any}
   * @return {Observable<any>}
   */
  getRegisterCode({ phone }: any): Observable<any> {
    return this.httpService.doHttp(UserApi.sendCode, { phone });
  }

  getUserBasicInfo(userId: number): Observable<any> {
    let api = this.utilService.deepClone(UserApi.basicInfo);
    api[0] = this.utilService.placeholder(api[0], { id: userId });
    return this.httpService.doHttp(api);
  }

  updateUserInfo(user: User): Observable<any> {
    let api = this.utilService.deepClone(UserApi.updateUserInfo);
    api[0] = this.utilService.placeholder(api[0], { id: user.id });
    return this.httpService.doHttp(api, user, null, true);
  }

  updateMyUserInfo(): void {
    let user = JSON.parse(localStorage.user);
    let api = this.utilService.deepClone(UserApi.basicInfo);
    api[0] = this.utilService.placeholder(api[0], { id: user.id });
    this.httpService.doHttp(api).subscribe(
      data => {
        let user1 = data.data;
        user1.phone = user.phone;
        user = user1;
        localStorage.user = JSON.stringify(user);
      },
      err => {}
    );
  }

}
