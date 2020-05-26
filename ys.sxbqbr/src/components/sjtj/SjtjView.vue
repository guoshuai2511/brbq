<template>
  <div class="container">
    <div class="top-form">
      <el-form size="small" :inline="true">
        <el-row>
          <el-form-item label="行政区划：">
            <div class="treeselect-container">
              <treeselect
                class="treeSelect"
                :multiple="false"
                :options="geoOption"
                :flat="false"
                :default-expand-level="1"
                placeholder="请选择"
                v-model="geoData"
              ></treeselect>
            </div>
          </el-form-item>
          <el-button type="primary" @click="initData" size="mini">查询</el-button>
        </el-row>
      </el-form>
    </div>
    <div class="middle-radio">
      <span class="title">搬迁避让统计图</span>
      <span class="label">统计方式：</span>
      <el-radio label="xzqh" v-model="type" class="radio">按行政区划统计</el-radio>
      <el-radio label="yhlx" v-model="type" class="radio">按隐患类型统计</el-radio>
      <el-radio label="zqdj" v-model="type" class="radio">按规模等级统计</el-radio>
      <span class="label">统计内容：</span>
      <!--<el-radio-group class="radio">-->
      <el-radio label="gcsl"  v-model="content" size="mini">工程数量</el-radio>
      <el-radio label="ghbq"  v-model="content" size="mini">规划搬迁</el-radio>
      <el-radio label="ybq"  v-model="content" size="mini">已搬迁</el-radio>
      <el-radio label="wbq"  v-model="content" size="mini">未搬迁</el-radio>
      <!--</el-radio-group>-->
    </div>
    <div class="bottom-chart">
      <chart :option="option" :id="zqtjChart" ref="zqtjChart"></chart>
    </div>
  </div>
</template>

<script>
  import Chart from "../common/Chart";
  // import {CountByLevel, CountByTime, CountByType, CountByXzqh} from "../../api/zxqtj";
  import {getXzqhTreeList} from "../../api/common";
  import xzqhSelectMixin from '@/mixin/xzqhSelectedMixin'
  import {listTjByXzqh} from "../../api/sjtj";
  export default {
    name: "sjtjView",
    components: {Chart},
    mixins: [xzqhSelectMixin],
    data(){
      return{
        startTime:"",
        endTime:"",
        zqtjChart:"zqtjChart",
        xzqhOptions:[],
        xzqhdm:"",
        xzqhShortName: {
          "5223": "黔西南",
          "5226": "黔东南",
          "5227": "黔南",
          "520325": "道真",
          "520326": "务川",
          "520622": "玉屏",
          "520625": "印江",
          "520627": "沿河",
          "520628": "松桃",
          "522732": "三都",
          "520526": "威宁",
          "520423": "镇宁",
          "520424": "关岭",
          "520425": "紫云"
        },
        option: {//系统访问情况统计图数据与设置
          title: {
            show:false
          },
          tooltip: {
            trigger: 'axis',
            formatter: function (params) {
             /* delete by guoshuai start 2020-5-25
              var res='<p>'+params[0].name+':';
              res+=''+params[0].data[params[0].seriesName]+ '</p>';
              return res;
              delete by guoshuai end 2020-5-25*/
              let res = '<p>' + '已搬迁户数：'+ params[0].data[params[0].seriesName] + ' 户' + '<br/>' +
               '已搬迁人数：'+  params[0].data[ 'ybqr'] + ' 人'+ '</p>';
              return res;
            },
          },
          toolbox:{
            right:'5%',
            top:10,
            feature:{
              magicType: {
                type: ['line', 'bar']
              },
              restore:{},
              saveAsImage:{},
            }
          },
          legend: {
            show:false
          },
          grid: {//直角坐标系内绘图网格
            show: true,//是否显示直角坐标系网格。[ default: false ]
            left: "5%",//grid 组件离容器左侧的距离。
            right: "5%",
            bottom: "5%",
            top: "10%",
          },
          dataset:{dimensions:[],
            source:[]
          },
          xAxis: {
            type: 'category',
            gridIndex: 0,
            boundaryGap: true,
          },
          yAxis: {
            type: 'value',
            name:"数量（个）",
            nameLocation:"end"
          },
          series: [
            {
            name: '',
            type: 'bar',
            barMaxWidth:"20",
            // barGap:"30%",
              label:{
                show:true,
                position:"top"
              },
            itemStyle: {
              color:{
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#FFB37F' // 0% 处的颜色
                }, {
                  offset: 1, color: '#FD865C' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              },
            },
            areaStyle:{

            }
          },
          ]
        },
        type:"xzqh",
        content:"gcsl",
        seriesItem:{
          name: '',
          type: 'bar',
          barMaxWidth:"20",
          // barGap:"30%",
          label:{
            show:true,
            position:"top"
          },
          itemStyle: {
            color:{
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: '#FFB37F' // 0% 处的颜色
              }, {
                offset: 1, color: '#FD865C' // 100% 处的颜色
              }],
              global: false // 缺省为 false
            },
          },
          areaStyle:{

          }
        },
      }
    },
    watch:{
      content(val){
        let xDimensions=this.getXDimensions(val);
        this.option.dataset.dimensions=[this.type];
        this.option.dataset.dimensions=this.option.dataset.dimensions.concat(xDimensions);
        this.$refs.zqtjChart.drawLine(this.option)
      },
      type(){
        this.initData()
      }
    },
    methods:{
      initData(){
        let params={
          "userXzqh": this.geoData,    //用户区划
          "generalParamOne":"", //按行政区划统计传 0
          //按隐患类型统计传1
          //按规模等级查询传2   （0 1 2 必传一个）

      };
        if(!params.userXzqh){
          params.userXzqh=this.$store.state.user.userInfo.xzqhdm
        }
        switch (this.type) {
          case "xzqh":
            params.generalParamOne=0;
            listTjByXzqh(params).then(res=>{
              let xDimensions=this.getXDimensions(this.content);
              this.option.dataset.dimensions=[this.type];
              this.option.dataset.dimensions=this.option.dataset.dimensions.concat(xDimensions);
              this.option.dataset.source=res.result;
              console.log(this.option.series,this.option.dataset.dimensions,)
            }).then(()=>{
              this.$refs.zqtjChart.drawLine(this.option)
            });
            break;
          case "yhlx":
            params.generalParamOne=1;
            listTjByXzqh(params).then(res=>{
              for(let i=0;i<res.result.length;i++){
                switch (res.result[i].zhlx) {
                  case "00":
                    res.result[i].yhlx="不稳定斜坡";
                    break;
                  case "01":
                    res.result[i].yhlx="滑坡";
                    break;
                  case "02":
                    res.result[i].yhlx="崩塌";
                    break;
                  case "03":
                    res.result[i].yhlx="泥石流";
                    break;
                  case "04":
                    res.result[i].yhlx="地面塌陷";
                    break;
                  case "06":
                    res.result[i].yhlx="地裂缝";
                    break;
                  case "07":
                    res.result[i].yhlx="其他";
                    break;
                  default :
                    res.result[i].yhlx="未知";
                    break;
                }
              }
              let xDimensions=this.getXDimensions(this.content);
              this.option.dataset.dimensions=[this.type];
              this.option.dataset.dimensions=this.option.dataset.dimensions.concat(xDimensions);
              this.option.dataset.source=res.result
            }).then(()=>{
              this.$refs.zqtjChart.drawLine(this.option)
            });
            break;
          case "zqdj":
            params.generalParamOne=2;
            listTjByXzqh(params).then(res=>{
              for(let i=0;i<res.result.length;i++){
                switch (res.result[i].gmdj) {
                  case "A":
                    res.result[i].zqdj="巨型";
                    break;
                  case "B":
                    res.result[i].zqdj="大型";
                    break;
                  case "C":
                    res.result[i].zqdj="小型";
                    break;
                  case "D":
                    res.result[i].zqdj="中型";
                    break;
                  case "E":
                    res.result[i].zqdj="特大型";
                    break;
                  default :
                    res.result[i].zqdj="其他";
                    break;
                }
              }
              let xDimensions=this.getXDimensions(this.content);
              this.option.dataset.dimensions=[this.type];
              this.option.dataset.dimensions=this.option.dataset.dimensions.concat(xDimensions);
              this.option.dataset.source=res.result
            }).then(()=>{
              this.$refs.zqtjChart.drawLine(this.option)
            });
            break;
        }
      },
      //获取x轴的柱子名称,改变柱子的数量
      getXDimensions(content){
        switch (content) {
          case "gcsl":
            this.option.series=[this.seriesItem];
            return ["gcsl"];
          case "ghbq":
            this.option.series=[this.seriesItem,this.seriesItem];
            return ["ghbqh","ghbqr"];
          case "ybq":
            this.option.series=[this.seriesItem,this.seriesItem];
            return ["ybqh","ybqr"];
          case "wbq":
            this.option.series=[this.seriesItem,this.seriesItem];
            return ["wbqh","wbqr"];

        }
      }
    },
    mounted(){
      this.initData()
    }
  }
</script>

<style scoped>
  .container {
    width: calc(100% - 24px);
    height: calc(100% - 24px);
    overflow: auto;
    background-color: white;
    padding: 12px;
  }
  .top-form{
    border-bottom: 1px solid #d7d7d7;
    margin-bottom: 10px;
  }
  .title{
    color: #00afff;
    font-size: 20px;
    font-weight: bold;
  }
  .label{
    font-size: 14px;
  }
  /deep/ .el-radio{
    margin-right: 15px;
  }
  .bottom-chart{
    height:85%;
  }
  .treeselect-container{
    display: inline-block;
    width:230px;
    height:20px;
  }
  /deep/ .vue-treeselect__control{
    height:25px;
    vertical-align: middle;
  }
  /deep/.treeSelect .vue-treeselect, .vue-treeselect--single, .vue-treeselect--searchable, .vue-treeselect--has-value, .vue-treeselect--open-below{
    height:28px;
    line-height: 28px !important;
    vertical-align: baseline;
  }
  /deep/ .vue-treeselect__single-value{
    line-height: 28px !important;
  }
</style>
