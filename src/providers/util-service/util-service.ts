import { Injectable } from '@angular/core';

@Injectable()
export class UtilServiceProvider {

  /**
   * html转文本
   * @param val
   */
  html2Text(val): string {
    const div = document.createElement('div')
    div.innerHTML = val
    return div.textContent || div.innerText
  }
  /**
   * 占位符填充
   * @param s 
   * @param o 
   */
  placeholder(s: string, o: object): string {
    if (typeof (o) == 'object') {
      for (var key in o) {
        s = s.replace(new RegExp("\\{" + key + "\\}", "g"), o[key]);
      }
      return s;
    } else {
      for (var i = 1; i < arguments.length; i++) {
        s = s.replace(new RegExp("\\{" + i + "\\}", "g"), arguments[i]);
      }
      return s;
    }
  }

  /**
   * 深度克隆
   * @param o 
   */
  deepClone(o: object): object {
    return JSON.parse(JSON.stringify(o));
  }
  
  /**
   * 参数化
   * @param obj 
   */
  toQueryString(obj: object): string {
    let result = [];
    for (let key in obj) {
      key = encodeURIComponent(key);
      let values = obj[key];
      if (values && values.constructor == Array) {
        let queryValues = [];
        for (let i = 0, len = values.length, value; i < len; i++) {
          value = values[i];
          queryValues.push(this.toQueryPair(key, value));
        }
        result = result.concat(queryValues);
      } else {
        result.push(this.toQueryPair(key, values));
      }
    }
    return result.join('&');
  }
  private toQueryPair(key, value) {
    if (typeof value == 'undefined') {
      return key;
    }
    return key + '=' + encodeURIComponent(value === null ? '' : String(value));
  }

}
