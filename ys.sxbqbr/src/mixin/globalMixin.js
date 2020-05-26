import { getXzqhTreeList, queryCountyByZhen } from "@/api/common/index";

import getDmtxInitData from "../../static/localdata/yhdInitData/getDmtxInitData";
import getBwdxpInitData from "../../static/localdata/yhdInitData/getBwdxpInitData";
import getBtInitData from "../../static/localdata/yhdInitData/getBtInitData";
import getHpInitData from "../../static/localdata/yhdInitData/getHpInitData";
import getNslInitData from "../../static/localdata/yhdInitData/getNslInitData";
import getDmcjInitData from "../../static/localdata/yhdInitData/getDmcjInitData";
import getDlfInitData from "../../static/localdata/yhdInitData/getDlfInitData";

import { Message } from 'element-ui';

let mixin = {
  methods: {
    //获取村以上的行政区划数据
    async getXzqhDataMixin(xzqhdm) {
      let params = {
        xzqhdm: xzqhdm
      };
      let result = await getXzqhTreeList(params).then(res => {
        if (res && res.status) {
          return res.result[0];
        } else {
          return [];
        }
      });
      return result;
    },

    //通过镇获取村的行政区划数据
    async getCountyByZhen(xzqhdm) {
      let params = {
        xzqh: xzqhdm
      };
      let result = await queryCountyByZhen(params).then(res => {
        if (res && res.status) {
          return res.result;
        } else {
          return [];
        }
      });
      return result;
    },
    //xmbh和子表唯一编号要求十六位随机数字的字符串
    xmbhGuidMixin() {
      return Math.floor(Math.random() * 100000).toString();
    },
    //处理隐患点的多选，将字符串换回数组
    handleYhdDetailDataMixin(type, data) {
      let initData = null;
      //00：不稳定斜坡，01：滑坡，02：崩塌，03：泥石流，04：地面塌陷,06：地裂缝，07：地面沉降；10-其他调查
      switch (type) {
        case "bwdxp":
          initData = getBwdxpInitData();
          break;
        case "hp":
          initData = getHpInitData();
          break;
        case "bt":
          initData = getBtInitData();
          break;
        case "nsl":
          initData = getNslInitData();
          break;
        case "dmtx":
          initData = getDmtxInitData();
          break;
        case "dlf":
          initData = getDlfInitData();
          break;
        case "dmcj":
          initData = getDmcjInitData();
          break;

        case "00":
          initData = getBwdxpInitData();
          break;
        case "01":
          initData = getHpInitData();
          break;
        case "02":
          initData = getBtInitData();
          break;
        case "03":
          initData = getNslInitData();
          break;
        case "04":
          initData = getDmtxInitData();
          break;
        case "06":
          initData = getDlfInitData();
          break;
        case "07":
          initData = getDmcjInitData();
          break;
      }
      //由于参数要求将所有多选的值变为用逗号隔开的字符串,即把数组转化为字符串
      for (let i in initData) {
        if (Array.isArray(initData[i])) {
          //所有子表，将子表内的数组也转化成字符串
          if (
            i === "dcbwdjgs" ||
            i === "dcbwdjxs" ||
            i === "dcbtjglxs" ||
            i === "dcbtxpjxs" ||
            i === "dcbtfyss" ||
            i === "dchpjglxs" ||
            i === "dchpbxjxs" ||
            i === "dlfdf" ||
            i === "nslzhs" ||
            i === "dmtxdf" ||
            i === "dmtxxk"
          ) {
            initData[i].forEach(item => {
              for (let j in item) {
                if (Array.isArray(item[j])) {
                  data[i].forEach(innerItem => {
                    if (!Array.isArray(innerItem[j])) {
                      innerItem[j] = innerItem[j].split(",");
                    }
                  });
                }
              }
            });
          } else {
            //非子表
            if (data[i]) {
              if (!Array.isArray(data[i])) {
                data[i] = data[i].split(",");
              }
            } else {
              data[i] = [];
            }
          }
        }
      }
      if(data.xdhlwz){
        let arr = data.xdhlwz.split(",");
        if(arr.length===1){
          data.xdhlwz1=data.xdhlwz;
        }else if(arr.length===2){

          if(arr.indexOf("A")){
            data.xdhlwz1 = "A"
          }else{
            data.xdhlwz1 = "B"
          }

          if(arr.indexOf("C")){
            data.xdhlwz2 = "C"
          }else{
            data.xdhlwz2 = "D"
          }
        }
      }

      return data;
    },

    //控制输入框只输入整数
    onlyIntMixin(event) {
      this.controlNumberMixin(event.target, "value", true);
    },
    //控制输入框只输入数字(可小数)
    onlyNumberMixin(event) {
      if(event.target.value==="."){
        event.target.value = ""
      }else{
        this.controlNumberMixin(event.target, "value", false, true);
      }
    },

    //离开输入框时确保字段为纯数字
    onlyNumberBlurMixin(
      /*传入对象名*/ obj,
      /*传入字段名*/ key,
      /*是否必须整数*/ isInt,
      /*经纬度范围*/ coodRange
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

      //此处判断经纬度值是否在其地区范围内
      //经度
      if(key==="jd"||key==="cjzxjd"||key==="qfyxwzjd"){
        if(coodRange&&Array.isArray(coodRange)&&coodRange.length===2){
          if(obj[key]<coodRange[0]||obj[key]>coodRange[1]){
            Message({
              type:"warning",
              message:"注意,输入的经度值并不在该地区",
              offset:80,
              customClass:"messageZIndex"
            })
          }
        }
      }
      //纬度
      if(key==="wd"||key==="cjzxwd"||key==="qfyxwzwd"){
        if(coodRange&&Array.isArray(coodRange)&&coodRange.length===2){
          if(obj[key]<coodRange[0]||obj[key]>coodRange[1]){
            Message({
              type:"warning",
              message:"注意,输入的纬度值并不在该地区",
              offset:80,
              customClass:"messageZIndex"
            })
          }
        }
      }
    },
    //控制整数部分
    controlNumberMixin(
      /*传入对象*/ obj,
      /*对象键名*/ key,
      /*是否为整数*/ isInt,
      /*失去焦点*/ notBlur
    ) {
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
    }
  }
};
export default mixin;
