// 生成唯一ID
export function guid() {
  return 'xxxxxxxxxxxxxxxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

//对时间进行格式化
export function dateFormat(date){
  let t = date;
  return t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate()+" "+t.getHours()+":"+t.getMinutes()+":"+t.getSeconds();
}

// 生成当前时间的字符串
export function timeString() {
  let myDate = new Date();
  let year = myDate.getFullYear()+ "";    //获取完整的年份(4位,1970-????)
  let month = myDate.getMonth() + 1;       //获取当前月份(0-11,0代表1月)
  let day = myDate.getDate();        //获取当前日(1-31)
  let hour = myDate.getHours();       //获取当前小时数(0-23)
  let min = myDate.getMinutes();     //获取当前分钟数(0-59)
  let second = myDate.getSeconds();     //获取当前秒数(0-59)
  let Millisecond = myDate.getMilliseconds();    //获取当前毫秒数(0-999)

  //自动补零
  month = month>9?month:'0'+ month;
  day = day>9?day:'0'+day;
  hour = hour>9?hour:'0'+hour;
  min = min>9?min:'0'+min;
  second = second>9?second:'0'+second;

  return (year+month+day+hour+min+second+Millisecond);
}

// 生成当前时间(YY-MM-DD)
export function time() {
  let myDate = new Date();
  let year = myDate.getFullYear()+ "";    //获取完整的年份(4位,1970-????)
  let month = myDate.getMonth() + 1;       //获取当前月份(0-11,0代表1月)
  let day = myDate.getDate();        //获取当前日(1-31)
  let hour = myDate.getHours();       //获取当前小时数(0-23)
  let min = myDate.getMinutes();     //获取当前分钟数(0-59)
  let second = myDate.getSeconds();     //获取当前秒数(0-59)

  //自动补零
  month = month>9?month:'0'+ month;
  day = day>9?day:'0'+day;
  hour = hour>9?hour:'0'+hour;
  min = min>9?min:'0'+min;
  second = second>9?second:'0'+second;

  return (year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + second);
}
