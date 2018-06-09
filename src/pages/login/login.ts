import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { UserServiceProvider } from '../../providers/user-service/user-service';

import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  code: any;
  phone: any;
  time: number = 30;

  loginForm: FormGroup;


  constructor(private loadingCtrl: LoadingController,
    private userService: UserServiceProvider,
    public formBuilder: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams) {
    this.loginForm = formBuilder.group({
      phone: [null, Validators.compose([Validators.required, Validators.pattern(/^1[3|4|5|8][0-9]{9}$/)])],
      code: [null, Validators.compose([Validators.required, Validators.pattern(/^[0-9]{4}$/)])]
    });
    this.phone = this.loginForm.controls['phone'];
    this.code = this.loginForm.controls['code'];
  }

  ionViewDidLoad() {
  }

  sendCode() {
    this.time--;
    let timer = setInterval(() => {
      this.time--;
      if (this.time === 0) {
        this.time = 30;
        clearInterval(timer);
      }
    }, 1000);
    this.userService.getRegisterCode({ phone: this.phone.value }).subscribe();
  }

  login() {
    let loader = this.loadingCtrl.create({
      content: '登录中...'
    });
    loader.present();
    this.userService.login({ phone: this.phone.value, code: this.code.value, rememberMe: false }).subscribe(
      data => {
        localStorage.user = JSON.stringify(data.data.user);
        localStorage.token = data.data.token;
        // setTimeout(() => {
        loader.dismiss();
        this.navCtrl.setRoot(TabsPage);
        // }, 2000);
      },
      err => loader.dismiss()
    );
  }

}