function countDown(times) {
    times = (new Date(times) - new Date().getTime())/1000;
    var timer = null;
    timer = setInterval(function () {
        var day = 0,
            hour = 0,
            minute = 0,
            second = 0;//时间默认值
        if (times > 0) {
            day = Math.floor(times / (60 * 60 * 24));
            hour = Math.floor(times / (60 * 60)) - (day * 24);
            minute = Math.floor(times / 60) - (day * 24 * 60) - (hour * 60);
            second = Math.floor(times) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
        }
        if (day <= 9) day = '0' + day;
        if (hour <= 9) hour = '0' + hour;
        if (minute <= 9) minute = '0' + minute;
        if (second <= 9) second = '0' + second;
        //
        var html = '<text>' + day + '</text> 天'
            + '<text>' + hour + '</text> 时'
            + '<text>' + minute + '</text> 分'
            + '<text>' + second + '</text> 秒'
            // console.log(day + "天:" + hour + "小时：" + minute + "分钟：" + second + "秒");
        times--;
        console.log(html)
        
        return html;
    }, 1000);
    if (times <= 0) {
        clearInterval(timer);
    }
}
function isBlank(str) {
    if (Object.prototype.toString.call(str) === '[object Undefined]') {//空
        return true
    } else if (
        Object.prototype.toString.call(str) === '[object String]' ||
        Object.prototype.toString.call(str) === '[object Array]') { //字条串或数组
        return str.length == 0 ? true : false
    } else if (Object.prototype.toString.call(str) === '[object Object]') {
        return JSON.stringify(str) == '{}' ? true : false
    } else {
        return true
    }

}

function checkPhone($poneInput) {
    var myreg = /^1[3|4|5|7|8|9][0-9]{9}$/;
    if (!myreg.test($poneInput)) {
        return false;
    } else {
        return true;
    }
}

module.exports =  {
    countDown: countDown,
    isBlank: isBlank,
    checkPhone: checkPhone
}