import { UserServiceProvider } from './../../providers/user-service/user-service';
import { User } from './../../models/User';
import { FileUtilServiceProvider } from './../../providers/file-util-service/file-util-service';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ParallelHasher } from 'ts-md5/dist/parallel_hasher';

@IonicPage()
@Component({
  selector: 'page-me-info',
  templateUrl: 'me-info.html',
})
export class MeInfoPage {

  uploader: FileUploader;

  user: User = JSON.parse(localStorage.user);
  oldUser: User = JSON.parse(localStorage.user);

  editing: boolean = false;

  constructor(private userService: UserServiceProvider,
    private toastCtrl: ToastController,
    private fileUtil: FileUtilServiceProvider,
    public navCtrl: NavController,
    public navParams: NavParams) {
    this.initUploader();
  }

  
  chooseHeadImg(): void {
    if(this.editing) {
      document.getElementById('file').click();
    }
  }
  
  initUploader(): void {
    this.uploader = new FileUploader({
      url: "http://localhost/users/" + this.user['id']+ "/avatar",
      method: "POST",
    });
    this.uploader.authTokenHeader = 'Authorization'
    this.uploader.authToken = localStorage.token;
    this.uploader.onBuildItemForm = (fileItem, form) => {
      for (let key in fileItem.formData) {
        form.append(key, fileItem.formData[key]);
      }
    };
    this.uploader.onAfterAddingFile = fileItem => {
      let fileReader = new FileReader();
      fileReader.onload = e => {
        let img = new Image();
        let name = fileItem._file.name;
        img.src = e.target['result'];
        img.onload = () => {
          this.fileUtil.compress(img, img.width, img.height, 0.5).then((blob) => {
            fileItem.file = blob;
            fileItem._file = blob;
            let hasher = new ParallelHasher('../assets/js/md5_worker.js');
            hasher.hash(blob).then(md5 => {
              fileItem.formData = {
                'userId': 1,
                name,
                'size': blob.size,
                'fileType': 1,
                md5
              };
              this.startUpload(fileItem);
            });
          });
        }
      }
      fileReader.readAsDataURL(fileItem._file);
    }
  }

  selectedFileOnChanged(): void {
    console.log(this.uploader)
  }

  startUpload(fileItem: FileItem): void{
    fileItem.upload();
    fileItem.onSuccess = (res, status, headers) => {
      res = JSON.parse(res);
      if (res['code'] === 0) {
        this.user.avatar = res['data'] + '?t=' + new Date().getTime();
      } else {
      }
    };
  }

  edit() {
    if (this.editing && this.oldUser !== this.user) {
      let toast = this.toastCtrl.create({
        message: '保存中，请稍等...',
        position: 'top'
      });
      toast.present();
      let user = new User();
      for (let key in this.user) {
        if (key === 'file') {
          if (!user[key]) {
            user[key] = this.user[key];
          }
        } else {
          user[key] = this.user[key];
        }
      }
      this.userService.updateUserInfo(user).subscribe(
        data => {
          toast.dismiss();
          let user = data.data;
          user['avatar'] += '?' + Math.random();
          localStorage.user = JSON.stringify(data.data);
          this.oldUser = data.data;
          this.user = JSON.parse(JSON.stringify(data.data));
        },
        err => toast.dismiss()
      );
      user.gmtCreate = new Date(this.user['gmtCreate']);
      user.gmtModified = new Date(this.user['gmtModified']);
    }
    this.editing = !this.editing;
  }

}
