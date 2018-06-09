import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class FileUtilServiceProvider {

  constructor(public http: HttpClient) {
  }

  /**
   * 
   * @param img     压缩图片
   * @param width   压缩后长度
   * @param height  压缩后高度
   * @param ratio   压缩比例 1为原来大小
   */
  compress(img, width, height, ratio): any {      
    return new Promise((resolve, reject) => {
      var canvas, ctx;
      canvas = document.createElement('canvas');        
      canvas.width = width;
      canvas.height = height;
      ctx = canvas.getContext("2d");        
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob((blob) => {
        resolve(blob);
      }, "image/jpeg", ratio);
    });
  }

}
