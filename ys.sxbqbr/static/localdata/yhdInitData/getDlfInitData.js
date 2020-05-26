// export default function(){
//     return {
//       zhdwybh:"", //灾害点唯一编号
//       zhdmc:"",//灾害点名称
//       xmbh:"",//项目编号
//       tfbh:"",//图幅编号
//       tfmc:"",//图幅名称
//       ywbh:"",//野外编号
//       xsbh: "", //县市编号
//       s: "", //省
//       xsq: "", //县市区
//       xz: "", //乡镇
//       c: "", //村
//       z: "", //组
//       dlwz:"",//地理位置
//       xzb: "", //X坐标
//       yzb: "", //Y坐标
//       zzb: "", //Z坐标
//       jd: "", //经度
//       wd: "", //纬度
//       bg:"",//标高
//       qftzfs:"",//缝数
//       qftzfbmj:"",//面积
//       qftzjj:"",//间距

//       //缝隙规模
//       qflfzdc:"",//长1
//       qflfzxc:"",//长2
//       qflfzdk:"",//宽2
//       qflfzxk:"",//宽1
//       qflfzds:"",//深2
//       qflfzxs:"",//深1
//       qfqfplxs:[],//排列形式
//       // 平行
//       qftzpxqj:"",
//       qftzpxqx:"",
//       qfpxjbzx:"",
//       // 斜列
//       qftzxlqj:"",
//       qftzxlqx:"",
//       qfxljbzx:"",

//       // 环围
//       qfyxwzjd:"",//经度
//       qfyxwzwd:"",//纬度

//       // 发展情况
//       qftzsfsj:"",//始发时间
//       qfsfkssj:"",//盛发时间1
//       qfsfjzsj:"",//盛发时间2
//       qftztzsj:"",//停止时间

//       qfszfzqk:"A",//尚在发展情况
//       gmdj:"A",//规模等级
//       cylx:[],//成因类型
//       lfqdmtz:[],//裂缝区地貌特征
//       lfzxgx:[],//....山脚或平原土坎的走向关系
//       lfjytcsd:"",//时代
//       lfjytcyx:"",//岩性
//       sltcsj:"",//受裂土层时间
//       sltctx:"",//受裂土层
//       slxfcsj:"",//下伏层时间
//       slxfcyx:"",//下伏层岩性
//       slytcsd:"",//土层时代
//       slytcyx:"",//土层岩性
//       slyzsttz:"",//胀缩土特征
//       slytcpzx:"A",//膨胀性
//       slytchsl:"",//含水量

//       // 裂缝区构造断裂
//       lfqyzzx:"",//走向1
//       lfqyzqx:"",//倾向1
//       lfqyzqj:"",//倾角1
//       lfqezzx:"",//走向2
//       lfqezqx:"",//倾向2
//       lfqezqj:"",//倾角2
//       // 岩层中的主要断裂状态
//       yczdlqj:"",//倾角
//       yczdlqx:"",//倾向
//       tczywxdl:"",//土层中有无新断裂
//       yczdlxqj:"",//倾角
//       yczdlxqx:"",//倾向
//       // 主要构造断裂产状
//       zgzqjyzx:"",
//       zgzqjyqx:"",
//       zgzqjyqj:"",
//       zgzqjezx:"",
//       zgzqjeqx:"",
//       zgzqjeqj:"",
//       zgzqjxdl:"",//有无新的构造断裂
//       zgzqjxqj:"",//倾角
//       zgzqjxqx:"",//倾向

//       //表二
//       yfdlys:[],//引发动力因素
//       dxdsms:"",//洞室埋深
//       dxdsgm:"",//洞室规模
//       dxdskwc:"",//长
//       dxdskwk:"",//宽
//       dxdskwg:"",//高
//       dxdswzgx:"",//与裂缝区位置关系
//       dxdskwsj:"",//开挖时间
//       dxdskwfs:"",//开挖方式
//       dxdskwqd:"",//开挖强度

//       cpdxslx:[],//抽排地下水
//       cpdxsms:"",//井深或坑道深埋
//       cpdxssl:"",//水量
//       cpdxssw:"",//水位
//       cpdxsrsl:"",//日出水量
//       cpdxsksj:"",//抽排水开始时间check
//       cpdxsjsj:"",//止于时间
//       cpszt:[],//抽排水时间状态check
//       yfdldzld:"",//地震烈度
//       dzfssj:"",//地震发生时间

//       // 断层活动
//       dchd:"0",//断层活动 0 ,1
//       dchdwz:"",//断层活动位置
//       dzdcqj:"",//产状倾角
//       dzdcqx:"",//产状倾向
//       dzdccd:"0",//长度
//       dzdcxz:"",//性质
//       hddchdsj:"",//活动时间
//       dzdchdsl:"",//活动速率
//       dzdcdj:"",//断距

//       //水理作用
//       slzysy:[],
//       yfdlkwxh:"",//开挖卸荷
//       slzysj:"",//作用时间
//       slzysz:"",//水质
//       slzykwfs:"",//水理作用开挖方式
//       slzykwsd:"",//水理作用开挖深度

//       qtzygsbh:"0",//其它作用引起的干湿变化

//       hf:"0",//毁房(间)
//       zdjtc:"0",//阻断交通
//       zdjth:"0",//小时
//       swrk:"0",//死亡人口
//       zjss:"0",//直接损失

//       //潜在威胁
//       wxfwh:"0",//威胁房屋(户)
//       wxfwj:"0",//威胁毁房(间)

//       CHone:'',//威胁交通 （数据库表不存在此值）

//       wxrk:"0",//威胁人口
//       wxcc:"0",//威胁财产
//       lffzyc:[],//裂缝发展预测
//       whdx:[],//危害对象
//       qtwhdx:[],//其他危害对象
//       wxdx:[],////威胁对象
//       qtwxdx:[],//其他威胁对象

//       zhdj:"A",//灾情等级
//       xqdj:"A",//险情等级
//       fzcsjxg:"",//防治措施及效果
//       yfjy:[],//今后防治建议
//       dcfzr:"",//调查负责人
//       ywjlxx:"",//野外记录信息
//       tbr:"",//填表人
//       tbrq:"",//填表日期
//       dcdw:"",//调查单位
//       dmt: 0, //多媒体
//       lx: 0, //录像
//       szygjyd: 0, //这些都是必填  0：否，1：是
//       szkcd: 0,//勘察点
//       szchd: 0,//测绘点
//       szgcd: 0,//治理工程点
//       szbqd: 0,//搬迁避让点
//       szyhd: 0,//隐患点
//       szfzya: 0,//防灾预案/群测群防点

//       pimsyt: 0, //平面示意图
//       pomsyt: 0, //剖面示意图
//       zgsmt: 0, //栅格素描图
//       slpimt: 0, //矢量平面图
//       slpomt: 0, //矢量剖面图
//       slsmt: 0, //矢量素描图


//       yxh:'',//元序号
//       sfhx: 0, //是否核销
//       hxdw:"",//核销单位
//       hxyy:"",//核销原因
//       hxry:"",//核销人员
//       hxsj:"",//核销时间
//       swsjfzjy:"",//10万数据防治建议
//       bzsm:"",//备注说明
//       dlfdf:[
//         {
//           wybh:"",//唯一编号
//           zhdwybh:"",
//           fh:"",
//           xt:"A",//形态
//           ysfx:"",
//           qx:"",
//           qj:"",
//           cd:"",
//           kd:"",
//           sd:"",
//           gmdj:"A",//规模等级
//           xz:"A",//性质
//           ywfx:"",
//           ywjl:"",
//           tcw:"",
//           cxsj:"",
//           hdx:"A",//活动性
//           bz:"",
//           xmbh:""},
//         {
//           wybh:"",//唯一编号
//           zhdwybh:"",
//           fh:"",
//           xt:"A",//形态
//           ysfx:"",
//           qx:"",
//           qj:"",
//           cd:"",
//           kd:"",
//           sd:"",
//           gmdj:"A",//规模等级
//           xz:"A",//性质
//           ywfx:"",
//           ywjl:"",
//           tcw:"",
//           cxsj:"",
//           hdx:"A",//活动性
//           bz:"",
//           xmbh:""},
//           {wybh:"",//唯一编号
//             zhdwybh:"",
//             fh:"",
//             xt:"A",//形态
//             ysfx:"",
//             qx:"",
//             qj:"",
//             cd:"",
//             kd:"",
//             sd:"",
//             gmdj:"A",//规模等级
//             xz:"A",//性质
//             ywfx:"",
//             ywjl:"",
//             tcw:"",
//             cxsj:"",
//             hdx:"A",//活动性
//             bz:"",
//             xmbh:""}
//       ]
// }
// }



export default function(){
    return {
      zhdwybh:"", //灾害点唯一编号
      zhdmc:"",//灾害点名称
      xmbh:"",//项目编号
      tfbh:"",//图幅编号
      tfmc:"",//图幅名称
      ywbh:"",//野外编号
      xsbh: "", //县市编号
      s: "", //省
      xsq: "", //县市区
      xz: "", //乡镇
      c: "", //村
      z: "", //组
      dlwz:"",//地理位置
      xzb: "", //X坐标
      yzb: "", //Y坐标
      zzb: "", //Z坐标
      jd: "", //经度
      wd: "", //纬度
      bg:"",//标高
      qftzfs:"",//缝数
      qftzfbmj:"",//面积
      qftzjj:"",//间距

      //缝隙规模
      qflfzdc:"",//长1
      qflfzxc:"",//长2
      qflfzdk:"",//宽2
      qflfzxk:"",//宽1
      qflfzds:"",//深2
      qflfzxs:"",//深1
      qfqfplxs:[],//排列形式
      // 平行
      qftzpxqj:"",
      qftzpxqx:"",
      qfpxjbzx:"",
      // 斜列
      qftzxlqj:"",
      qftzxlqx:"",
      qfxljbzx:"",

      // 环围
      qfyxwzjd:"",//经度
      qfyxwzwd:"",//纬度

      // 发展情况
      qftzsfsj:"",//始发时间
      qfsfkssj:"",//盛发时间1
      qfsfjzsj:"",//盛发时间2
      qftztzsj:"",//停止时间

      qfszfzqk:"",//尚在发展情况
      gmdj:"A",//规模等级
      cylx:[],//成因类型
      lfqdmtz:[],//裂缝区地貌特征
      lfzxgx:[],//....山脚或平原土坎的走向关系
      lfjytcsd:"",//时代
      lfjytcyx:"",//岩性
      sltcsj:"",//受裂土层时间
      sltctx:"",//受裂土层
      slxfcsj:"",//下伏层时间
      slxfcyx:"",//下伏层岩性
      slytcsd:"",//土层时代
      slytcyx:"",//土层岩性
      slyzsttz:"",//胀缩土特征
      slytcpzx:"",//膨胀性
      slytchsl:"",//含水量

      // 裂缝区构造断裂
      lfqyzzx:"",//走向1
      lfqyzqx:"",//倾向1
      lfqyzqj:"",//倾角1
      lfqezzx:"",//走向2
      lfqezqx:"",//倾向2
      lfqezqj:"",//倾角2
      // 岩层中的主要断裂状态
      yczdlqj:"",//倾角
      yczdlqx:"",//倾向
      tczywxdl:"",//土层中有无新断裂
      yczdlxqj:"",//倾角
      yczdlxqx:"",//倾向
      // 主要构造断裂产状
      zgzqjyzx:"",
      zgzqjyqx:"",
      zgzqjyqj:"",
      zgzqjezx:"",
      zgzqjeqx:"",
      zgzqjeqj:"",
      zgzqjxdl:"",//有无新的构造断裂
      zgzqjxqj:"",//倾角
      zgzqjxqx:"",//倾向

      //表二
      yfdlys:[],//引发动力因素
      dxdsms:"",//洞室埋深
      dxdsgm:"",//洞室规模
      dxdskwc:"",//长
      dxdskwk:"",//宽
      dxdskwg:"",//高
      dxdswzgx:"",//与裂缝区位置关系
      dxdskwsj:"",//开挖时间
      dxdskwfs:"",//开挖方式
      dxdskwqd:"",//开挖强度

      cpdxslx:[],//抽排地下水
      cpdxsms:"",//井深或坑道深埋
      cpdxssl:"",//水量
      cpdxssw:"",//水位
      cpdxsrsl:"",//日出水量
      cpdxsksj:"",//抽排水开始时间check
      cpdxsjsj:"",//止于时间
      cpszt:"",//抽排水时间状态check
      yfdldzld:"",//地震烈度
      dzfssj:"",//地震发生时间

      // 断层活动
      dchd:"",//断层活动 0 ,1
      dchdwz:"",//断层活动位置
      dzdcqj:"",//产状倾角
      dzdcqx:"",//产状倾向
      dzdccd:"",//长度
      dzdcxz:"",//性质
      hddchdsj:"",//活动时间
      dzdchdsl:"",//活动速率
      dzdcdj:"",//断距

      //水理作用
      slzysy:[],
      yfdlkwxh:"",//开挖卸荷
      slzysj:"",//作用时间
      slzysz:"",//水质
      slzykwfs:"",//水理作用开挖方式
      slzykwsd:"",//水理作用开挖深度

      qtzygsbh:"",//其它作用引起的干湿变化

      hf:"",//毁房(间)
      zdjtc:"",//阻断交通
      zdjth:"",//小时
      swrk:"",//死亡人口
      zjss:"",//直接损失

      //潜在威胁
      wxfwh:"",//威胁房屋(户)
      wxfwj:"",//威胁毁房(间)

      CHone:'',//威胁交通 （数据库表不存在此值）

      wxrk:"",//威胁人口
      wxcc:"",//威胁财产
      lffzyc:[],//裂缝发展预测
      whdx:[],//危害对象
      qtwhdx:"",//其他危害对象
      wxdx:[],////威胁对象
      qtwxdx:"",//其他威胁对象

      zhdj:"",//灾情等级
      xqdj:"A",//险情等级
      fzcsjxg:"",//防治措施及效果
      yfjy:[],//今后防治建议
      dcfzr:"",//调查负责人
      ywjlxx:"",//野外记录信息
      tbr:"",//填表人
      tbrq:"",//填表日期
      dcdw:"",//调查单位
      dmt: 0, //多媒体
      lx: 0, //录像
      szygjyd: 0, //这些都是必填  0：否，1：是
      szkcd: 0,//勘察点
      szchd: 0,//测绘点
      szgcd: 0,//治理工程点
      szbqd: 0,//搬迁避让点
      szyhd: 0,//隐患点
      szfzya: 0,//防灾预案/群测群防点

      pimsyt: 0, //平面示意图
      pomsyt: 0, //剖面示意图
      zgsmt: 0, //栅格素描图
      slpimt: 0, //矢量平面图
      slpomt: 0, //矢量剖面图
      slsmt: 0, //矢量素描图


      yxh:'',//元序号
      sfhx: 0, //是否核销
      hxdw:"",//核销单位
      hxyy:"",//核销原因
      hxry:"",//核销人员
      hxsj:"",//核销时间
      swsjfzjy:"",//10万数据防治建议
      bzsm:"",//备注说明
      dlfdf:[
        {
          wybh:"",//唯一编号
          zhdwybh:"",
          fh:"",
          xt:"",//形态
          ysfx:"",
          qx:"",
          qj:"",
          cd:"",
          kd:"",
          sd:"",
          gmdj:"",//规模等级
          xz:"",//性质
          ywfx:"",
          ywjl:"",
          tcw:"",
          cxsj:"",
          hdx:"",//活动性
          bz:"",
          xmbh:""},
        {
          wybh:"",//唯一编号
          zhdwybh:"",
          fh:"",
          xt:"",//形态
          ysfx:"",
          qx:"",
          qj:"",
          cd:"",
          kd:"",
          sd:"",
          gmdj:"",//规模等级
          xz:"",//性质
          ywfx:"",
          ywjl:"",
          tcw:"",
          cxsj:"",
          hdx:"",//活动性
          bz:"",
          xmbh:""},
          {wybh:"",//唯一编号
            zhdwybh:"",
            fh:"",
            xt:"",//形态
            ysfx:"",
            qx:"",
            qj:"",
            cd:"",
            kd:"",
            sd:"",
            gmdj:"",//规模等级
            xz:"",//性质
            ywfx:"",
            ywjl:"",
            tcw:"",
            cxsj:"",
            hdx:"",//活动性
            bz:"",
            xmbh:""}
      ]
}
}

