import { DiscussionServiceProvider } from './../../providers/discussion-service/discussion-service';
import { Discussion } from './../../models/Discussion';
import { MessageServiceProvider } from './../../providers/message-service/message-service';
import { ParallelHasher } from 'ts-md5/dist/parallel_hasher';
import { FileUtilServiceProvider } from './../../providers/file-util-service/file-util-service';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-submit-discussion',
  templateUrl: 'submit-discussion.html',
})
export class SubmitDiscussionPage {

  editor: any;
  imgsUrl: Array<string> = [];

  dicussion: Discussion = new Discussion();

  uploader: FileUploader;
  
  user: object = JSON.parse(localStorage.user);

  editorConfig: any = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'bullet' }, { 'align': [] }],
      ['link', 'image']
    ]
  };
  
  constructor(private discussionService: DiscussionServiceProvider,
    private messageService: MessageServiceProvider,
    private fileUtil: FileUtilServiceProvider,
    public navCtrl: NavController,
    public navParams: NavParams) {
    this.initUploader();
    this.dicussion.topicId = navParams.get('topicId');
  }

  onEditorCreated(editor): void {
    this.editor = editor;
    let toolbar = editor.getModule('toolbar');
    toolbar.addHandler('image', () => {
      document.getElementById('file').click();
    })
  }
  
  initUploader(): void {
    this.uploader = new FileUploader({
      url: "http://localhost/discussion/uploadImg",
      method: "POST",
      authToken: localStorage.token
    });
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
                'fileType': 3,
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

  startUpload(fileItem: FileItem): void{
    fileItem.upload();
    fileItem.onSuccess = (response, status, headers) => {
      let res = JSON.parse(response);
      if (res['code'] !== 0) {
        this.messageService.alert('添加图片错误', res['msg']);
      } else {
        this.imgsUrl.push(res['data']);
        this.editor.insertEmbed(10, 'image', res['data']);
        document.getElementById('file')['value'] = '';
      }
    };
  }

  submitDiscussion(): void {
    let imgs = '';
    for (let item of this.imgsUrl) {
      imgs += item + ',';
    }
    this.dicussion.images = imgs.substring(0, imgs.length - 1);
    this.dicussion.userId = this.user['id'];
    this.discussionService.submitDiscussion(this.dicussion).subscribe(
      data => {
        this.navCtrl.pop();
      },
      err => {}
    );
  }

}
