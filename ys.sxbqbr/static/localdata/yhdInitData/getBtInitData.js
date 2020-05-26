// export default function() {
//   return {
//     zhdwybh: "", ////灾害点唯一编号,新增的话后面会赋值uuid
//     zhdmc: "", //灾害点名称
//     xmbh: "", //项目编号
//     tfbh: "", //图幅编号
//     tfmc: "", //图幅名称
//     ywbh: "", //野外编号
//     snbh: "", //室内编号
//     xsbh: "", //县市编号
//     s: "", //省
//     xsq: "", //县市区 
//     xz: "", //乡镇
//     c: "", //村
//     z: "", //组
//     dlwz: "", //地理位置
//     xzb: "", //X坐标
//     yzb: "", //Y坐标
//     zzb: "", //Z坐标
//     jd: "", //经度
//     wd: "", //纬度
//     xplx: "A", //斜坡类型
//     btlx: "A", //崩塌类型
//     pdbg: "", //坡顶标高（m）
//     pjbg: "", //坡脚标高（m）
//     fssj: "", //发生时间
//     dcsd: "", //地层时代
//     dcyx: "", //地层岩性
//     gzbw: "", //构造部位
//     dzld: "A", //地震烈度
//     dcqx: "", //地层倾向（°）
//     dcqj: "", //地层倾角（°）
//     wdm: [], //微地貌
//     dxslx: [], //地下水类型
//     njjyl: "", //年均降雨量(MM)
//     rzdjy: "", //日最大降雨(MM)
//     szdjy: "", //时最大降雨(MM)
//     fsw: "", //丰水位(M)
//     ksw: "", //枯水位（M）
//     xdhlwz: "A", //相对河流位置
//     tdly: [], //土地利用
//     fbgc: "", //分布高程（m）
//     pg: "", //坡高（m）
//     pk: "", //坡宽（m）
//     pc: "", //坡长（m）
//     hd: "", //厚度（m）
//     gmdj: "A", //规模等级
//     pd: "", //坡度（度）
//     px: "", //坡向（度）
//     gm: "", //规模（m3)
//     ytjglx: "D", //岩体结构类型
//     ythd: "", //岩体厚度（m）
//     ytlxzs: "", //岩体裂隙组数
//     ytkdc: "", //岩体块度（长）
//     ytkdk: "", //岩体块度（宽）
//     ytkdg: "", //岩体块度（高）
//     xpjglx: "A", //斜坡结构类型
//     xpjglx2: "f", //斜坡结构类型2
//     qfhdsd: "", //全风化带深度(m)
//     xhlfsd: "", //卸荷裂缝深度(m)
//     ttmc: "", //土体名称
//     ttmsd: "A", //土体密实度
//     ttcd: "", //土体稠度
//     xfjysd: "", //下伏基岩时代
//     xfjyyx: "", //下伏基岩岩性
//     xfjyqj: "", //下伏基岩倾角
//     xfjyqx: "", //下伏基岩倾向
//     xfjyms: "", //下伏基岩埋深(m)
//     dxsms: "", //地下水埋深(m)
//     dxslt: [], //地下水露头
//     dxsbjlx: [], //地下水补给类型
//     xcsj: "", //形成时间
//     fsbtcs: "", //发生崩塌次数
//     wyknswys: [], //危岩体特征_可能失稳因素
//     wymqwdcd: "A", //危岩体特征_目前稳定程度
//     wyjhbhqs: "A", //危岩体特征_今后变化趋势
//     dtcd: "", //堆体长度（m）
//     dtkd: "", //堆体宽度（m）
//     dthd: "", //堆体厚度（m）
//     dttj: "", //堆体体积（m3）
//     djtpd: "", //堆积体坡度
//     djtpx: "", //堆积体坡向
//     djtpmxt: "", //堆积体坡面形态
//     dtwdx: "", //堆体稳定性
//     djknswys: "", //堆积体_可能失稳因素
//     djmqwdcd: "", //堆积体_目前稳定程度
//     djjhbhqs: "", //堆积体_今后变化趋势
//     swrk: "", //死亡人口（人）
//     hhfwh: "", //毁坏房屋(户)
//     hhfwj: "", //毁坏房屋(间）
//     hhdl: "", //毁坏道路（m）
//     hhqd: "", //毁坏渠道（m）
//     qtwh: "", //其它危害
//     zjss: "", //直接损失（万元）
//     jjss: "", //间接损失（万元）
//     whdx: [], //危害对象
//     qtwhdx: "", //其他危害对象
//     zqdj: "A", //灾情等级
//     yfzhlx: "", //诱发灾害类型
//     yfzhbjfw: "", //诱发灾害波及范围
//     yfzhzcss: "", //诱发灾害造成损失（万元）
//     wxrk: "", //威胁人口（人）
//     wxfw: "", //威胁房屋（户）
//     wxcc: "", //威胁财产（万元）
//     wxdx: [], //威胁对象
//     qtwxdx: "", //其他威胁对象
//     xqdj: "A", //险情等级
//     jcjy: [], //监测建议
//     fzjy: [], //防治建议
//     jcsj: [], //群测群防
//     zyjc: [], //专业监测（防治监测）
//     bqbr: [], //搬迁避让
//     gczl: [], //工程治理(防治治理）
//     qcry: "", //群测人员
//     cz: "", //村长
//     czdh: "", //村长电话
//     szygjyd: 0, //这些都是必填  0：否，1：是
//     szkcd: 0,
//     szchd: 0,
//     szgcd: 0,
//     szbqd: 0,
//     szyhd: 0,
//     szfzya: 0,
//     ywjlxx: "", //野外记录信息
//     dcfzr: "", //调查负责人
//     tbr: "", //填表人
//     shr: "", //审核人
//     tbrq: "", //填表日期
//     dcdw: "", //调查单位
//     zlly: "A", //A
//     yxh: "", //1
//     gxsj: "", //更新时间
//     btqk: "", //崩塌情况
//     dmt: 0, //多媒体
//     lx: 0, //录像
//     pimsyt: 0, //平面示意图
//     pomsyt: 0, //剖面示意图
//     zgsmt: 0, //栅格素描图
//     slpimt: 0, //矢量平面图
//     slpomt: 0, //矢量剖面图
//     slsmt: 0, //矢量素描图
//     sfhx: 0, //是否核销
//     hxdw: "", //核销单位
//     hxyy: "", //核销原因
//     hxry: "", //核销人员
//     hxsj: "", //核销时间
//     swsjfzjy: "", //10万数据防治建议
//     bzsm: "", //备注说明
//     dcbtjglxs: [
//       {
//         wybh: "", //唯一编号
//         zhdwybh: "", //灾害点唯一编号
//         kzmjglx:"A", //控制面结构类型
//         qj: "", //倾角（度）
//         qx: "", //倾向（度）
//         cd: "", //长度（m）
//         jj: "", //间距（m）
//         bz: "", //备注
//         xmbh: "" //项目编号
//       },
//       {
//         wybh: "",
//         zhdwybh: "",
//         kzmjglx:"A",
//         qj: "",
//         qx: "",
//         cd: "",
//         jj: "",
//         bz: "",
//         xmbh: ""
//       }
//     ],
//     dcbtxpjxs: [
//       {
//         wybh: "", //唯一编号
//         zhdwybh: "", //灾害点唯一编号
//         mc: "A", //名称  字典
//         bw: "", //部位0
//         tz: "", //特征
//         cxsj: "", //初现时间
//         bz: "", //备注
//         xmbh: "" //项目编号
//       },
//       {
//         wybh: "",
//         zhdwybh: "",
//         mc: "A",
//         bw: "",
//         tz: "",
//         cxsj: "",
//         bz: "",
//         xmbh: ""
//       }
//     ],
//     dcbtfyss: [
//       {
//         wybh: "", //唯一编号
//         zhdwybh: "", //灾害点唯一编号
//         xh: "", //序号
//         fssj: "", //发生时间
//         fsgm: "", //规模
//         yfys: [], //诱发因素
//         qtyfys: "", //其他因素
//         swrs: "", //死亡人口
//         zjjjss: "", //直接经济损失
//         bz: "", //备注
//         xmbh: "" //项目编号
//       },
//       {
//         wybh: "",
//         zhdwybh: "",
//         xh: "",
//         fssj: "",
//         fsgm: "",
//         yfys: [],
//         qtyfys: "",
//         swrs: "",
//         zjjjss: "",
//         bz: "",
//         xmbh: ""
//       }
//     ]
//   };
// }

export default function() {
  return {
    zhdwybh: "", ////灾害点唯一编号,新增的话后面会赋值uuid
    zhdmc: "", //灾害点名称
    xmbh: "", //项目编号
    tfbh: "", //图幅编号
    tfmc: "", //图幅名称
    ywbh: "", //野外编号
    snbh: "", //室内编号
    xsbh: "", //县市编号
    s: "", //省
    xsq: "", //县市区 
    xz: "", //乡镇
    c: "", //村
    z: "", //组
    dlwz: "", //地理位置
    xzb: "", //X坐标
    yzb: "", //Y坐标
    zzb: "", //Z坐标
    jd: "", //经度
    wd: "", //纬度
    xplx: "", //斜坡类型
    btlx: "", //崩塌类型
    pdbg: "", //坡顶标高（m）
    pjbg: "", //坡脚标高（m）
    fssj: "", //发生时间
    dcsd: "", //地层时代
    dcyx: "", //地层岩性
    gzbw: "", //构造部位
    dzld: "", //地震烈度
    dcqx: "", //地层倾向（°）
    dcqj: "", //地层倾角（°）
    wdm: [], //微地貌
    dxslx: [], //地下水类型
    njjyl: "", //年均降雨量(MM)
    rzdjy: "", //日最大降雨(MM)
    szdjy: "", //时最大降雨(MM)
    fsw: "", //丰水位(M)
    ksw: "", //枯水位（M）
    xdhlwz: "", //相对河流位置
    tdly: [], //土地利用
    fbgc: "", //分布高程（m）
    pg: "", //坡高（m）
    pk: "", //坡宽（m）
    pc: "", //坡长（m）
    hd: "", //厚度（m）
    gmdj: "A", //规模等级
    pd: "", //坡度（度）
    px: "", //坡向（度）
    gm: "", //规模（m3)
    ytjglx: "", //岩体结构类型
    ythd: "", //岩体厚度（m）
    ytlxzs: "", //岩体裂隙组数
    ytkdc: "", //岩体块度（长）
    ytkdk: "", //岩体块度（宽）
    ytkdg: "", //岩体块度（高）
    xpjglx: "", //斜坡结构类型
    xpjglx2: "", //斜坡结构类型2
    qfhdsd: "", //全风化带深度(m)
    xhlfsd: "", //卸荷裂缝深度(m)
    ttmc: "", //土体名称
    ttmsd: "", //土体密实度
    ttcd: "", //土体稠度
    xfjysd: "", //下伏基岩时代
    xfjyyx: "", //下伏基岩岩性
    xfjyqj: "", //下伏基岩倾角
    xfjyqx: "", //下伏基岩倾向
    xfjyms: "", //下伏基岩埋深(m)
    dxsms: "", //地下水埋深(m)
    dxslt: [], //地下水露头
    dxsbjlx: [], //地下水补给类型
    xcsj: "", //形成时间
    fsbtcs: "", //发生崩塌次数
    wyknswys: [], //危岩体特征_可能失稳因素
    wymqwdcd: "", //危岩体特征_目前稳定程度
    wyjhbhqs: "", //危岩体特征_今后变化趋势
    dtcd: "", //堆体长度（m）
    dtkd: "", //堆体宽度（m）
    dthd: "", //堆体厚度（m）
    dttj: "", //堆体体积（m3）
    djtpd: "", //堆积体坡度
    djtpx: "", //堆积体坡向
    djtpmxt: "", //堆积体坡面形态
    dtwdx: "", //堆体稳定性
    djknswys: "", //堆积体_可能失稳因素
    djmqwdcd: "", //堆积体_目前稳定程度
    djjhbhqs: "", //堆积体_今后变化趋势
    swrk: "", //死亡人口（人）
    hhfwh: "", //毁坏房屋(户)
    hhfwj: "", //毁坏房屋(间）
    hhdl: "", //毁坏道路（m）
    hhqd: "", //毁坏渠道（m）
    qtwh: "", //其它危害
    zjss: "", //直接损失（万元）
    jjss: "", //间接损失（万元）
    whdx: [], //危害对象
    qtwhdx: "", //其他危害对象
    zqdj: "A", //灾情等级
    yfzhlx: "", //诱发灾害类型
    yfzhbjfw: "", //诱发灾害波及范围
    yfzhzcss: "", //诱发灾害造成损失（万元）
    wxrk: "", //威胁人口（人）
    wxfw: "", //威胁房屋（户）
    wxcc: "", //威胁财产（万元）
    wxdx: [], //威胁对象
    qtwxdx: "", //其他威胁对象
    xqdj: "A", //险情等级
    jcjy: [], //监测建议
    fzjy: [], //防治建议
    qcqf: [], //群测群防
    zyjc: [], //专业监测（防治监测）
    bqbr: [], //搬迁避让
    gczl: [], //工程治理(防治治理）
    qcry: "", //群测人员
    cz: "", //村长
    czdh: "", //村长电话
    szygjyd: 0, //这些都是必填  0：否，1：是
    szkcd: 0,
    szchd: 0,
    szgcd: 0,
    szbqd: 0,
    szyhd: 0,
    szfzya: 0,
    ywjlxx: "", //野外记录信息
    dcfzr: "", //调查负责人
    tbr: "", //填表人
    shr: "", //审核人
    tbrq: "", //填表日期
    dcdw: "", //调查单位
    zlly: "", //A
    yxh: "", //1
    gxsj: "", //更新时间
    btqk: "", //崩塌情况
    dmt: 0, //多媒体
    lx: 0, //录像
    pimsyt: 0, //平面示意图
    pomsyt: 0, //剖面示意图
    zgsmt: 0, //栅格素描图
    slpimt: 0, //矢量平面图
    slpomt: 0, //矢量剖面图
    slsmt: 0, //矢量素描图
    sfhx: 0, //是否核销
    hxdw: "", //核销单位
    hxyy: "", //核销原因
    hxry: "", //核销人员
    hxsj: "", //核销时间
    swsjfzjy: "", //10万数据防治建议
    bzsm: "", //备注说明
    dcbtjglxs: [
      {
        wybh: "", //唯一编号
        zhdwybh: "", //灾害点唯一编号
        kzmjglx:"", //控制面结构类型
        qj: "", //倾角（度）
        qx: "", //倾向（度）
        cd: "", //长度（m）
        jj: "", //间距（m）
        bz: "", //备注
        xmbh: "" //项目编号
      },
      {
        wybh: "",
        zhdwybh: "",
        kzmjglx:"",
        qj: "",
        qx: "",
        cd: "",
        jj: "",
        bz: "",
        xmbh: ""
      }
    ],
    dcbtxpjxs: [
      {
        wybh: "", //唯一编号
        zhdwybh: "", //灾害点唯一编号
        mc: "", //名称  字典
        bw: "", //部位0
        tz: "", //特征
        cxsj: "", //初现时间
        bz: "", //备注
        xmbh: "" //项目编号
      },
      {
        wybh: "",
        zhdwybh: "",
        mc: "",
        bw: "",
        tz: "",
        cxsj: "",
        bz: "",
        xmbh: ""
      }
    ],
    dcbtfyss: [
      {
        wybh: "", //唯一编号
        zhdwybh: "", //灾害点唯一编号
        xh: "", //序号
        fssj: "", //发生时间
        fsgm: "", //规模
        yfys: [], //诱发因素
        qtyfys: "", //其他因素
        swrs: "", //死亡人口
        zjjjss: "", //直接经济损失
        bz: "", //备注
        xmbh: "" //项目编号
      },
      {
        wybh: "",
        zhdwybh: "",
        xh: "",
        fssj: "",
        fsgm: "",
        yfys: [],
        qtyfys: "",
        swrs: "",
        zjjjss: "",
        bz: "",
        xmbh: ""
      }
    ]
  };
}
