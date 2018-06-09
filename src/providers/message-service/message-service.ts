import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController, AlertController } from 'ionic-angular';

@Injectable()
export class MessageServiceProvider {

  constructor(private toastCtrl: ToastController,
    private alertCtrl: AlertController) {
  }

  toast(message: string): void {
    this.toastCtrl.create({
      message,
      duration: 2000
    }).present();
  }

  alert(title: string, message: string): void {
    this.alertCtrl.create({
      title,
      message,
      buttons: ['确定']
    }).present();
  }

  showHttpError(err: HttpErrorResponse): void {
    let message: string;
    switch (err.status) {
      case 404:
        message = '找不到资源';
        break;
      default:
        message = '请检查网络连接';
        break;
    }
    this.alert('网络错误', message);
  }

}
