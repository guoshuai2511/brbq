let mixin = {
  methods: {
    //控制输入框只输入整数
    onlyIntMixin(event) {
      this.controlNumberMixin(event.target, "value", true);
    },
    //控制输入框只输入数字(可小数)
    onlyNumberMixin(event) {
      if (event.target.value === ".") {
        event.target.value = "";
      } else {
        this.controlNumberMixin(event.target, "value", false, true);
      }
    },

    //离开输入框时确保字段为纯数字
    onlyNumberBlurMixin(
      /*传入对象名*/ obj,
      /*传入字段名*/ key,
      /*是否必须整数*/ isInt
    ) {
      if (obj === null) {
        obj = this._data;
      }

      //是否为纯整数
      if (isInt) {
        this.controlNumberMixin(obj, key, true);
      } else {
        //可以带小数点
        this.controlNumberMixin(obj, key);
        this.controlNumberMixin(obj, key);
      }
    },
    //控制整数部分
    controlNumberMixin(
      /*传入对象*/ obj,
      /*对象键名*/ key,
      /*是否为整数*/ isInt,
      /*失去焦点*/ notBlur
    ) {
      if (obj[key]) {
        obj[key] = obj[key].toString();

        // 清除字符
        let reg = null;
        if (isInt) {
          reg = /[^0-9]/;
        } else {
          reg = /[^0-9.]/;
        }

        if (reg.test(obj[key])) {
          let index = obj[key].search(reg);
          obj[key] = obj[key].slice(0, index);
        }

        if (!isInt) {
          let pointIndex = obj[key].indexOf(".");
          if (pointIndex >= 0) {
            //清除最后一个小数点
            if (pointIndex === obj[key].length - 1 && !notBlur) {
              obj[key] = obj[key].slice(0, pointIndex);
              //清楚第二个小数点及其后的字符
            } else {
              let str = obj[key].slice(pointIndex + 1);

              let reg = /[^0-9]/;
              if (reg.test(str)) {
                let index = str.search(reg);
                obj[key] = obj[key].slice(0, pointIndex + index + 1);
              }
            }
          }
        }
        obj[key] = Number(obj[key]);
      }
    }
  }
};
export default mixin;
