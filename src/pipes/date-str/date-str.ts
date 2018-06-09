import { Pipe, PipeTransform } from '@angular/core';


/**
 * 毫秒转换友好的显示格式
 * 输出格式：21小时前
 */
@Pipe({
    name: 'dateStr',
})
export class DateStrPipe implements PipeTransform {
    /**
     * Takes a value and makes it lowercase.
     */
    transform(value: Date, ...args) {
        value = new Date(value);
        let dateTimeStamp = value.getTime();
        var minute = 1000 * 60;      //把分，时，天，周，半个月，一个月用毫秒表示
        var hour = minute * 60;
        var day = hour * 24;
        var week = day * 7;
        // var halfamonth = day * 15;
        var month = day * 30;
        var now = new Date().getTime();   //获取当前时间毫秒
        var diffValue = now - dateTimeStamp;//时间差

        if (diffValue < 0) {
            return;
        }
        var minC = parseInt(String(diffValue / minute));  //计算时间差的分，时，天，周，月
        var hourC = parseInt(String(diffValue / hour));
        var dayC = parseInt(String(diffValue / day));
        var weekC = parseInt(String(diffValue / week));
        var monthC = parseInt(String(diffValue / month));
        let result;
        if (monthC >= 1 && monthC <= 3) {
            result = " " + monthC + "月前"
        } else if (weekC >= 1 && weekC <= 3) {
            result = " " + weekC + "周前"
        } else if (dayC >= 1 && dayC <= 6) {
            result = " " + dayC + "天前"
        } else if (hourC >= 1 && hourC <= 23) {
            result = " " + hourC + "小时前"
        } else if (minC >= 1 && minC <= 59) {
            result = " " + minC + "分钟前"
        } else if (diffValue >= 0 && diffValue <= minute) {
            result = "刚刚"
        } else {
            var datetime = new Date();
            datetime.setTime(dateTimeStamp);
            var Nyear = datetime.getFullYear();
            var Nmonth = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
            var Ndate = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
            // var Nhour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
            // var Nminute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
            // var Nsecond = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
            result = Nyear + "-" + Nmonth + "-" + Ndate
        }
        return result;
    }
}
