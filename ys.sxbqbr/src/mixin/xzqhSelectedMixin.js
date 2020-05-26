import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import {getAreaList} from "../api/common";

export default {
  data() {
    return {
      geoOption: [],
      geoData: '',
    }
  },
  components: {
    Treeselect
  },
  methods: {
    normalizer(node) {
      return {
        id: node.xzqhdm,
        label: node.xzqhmc,
        children: node.children,
      }
    },
    initXzqhData() {
      let xzqhdm = this.$store.state.user.userInfo.xzqhdm;
      if(xzqhdm !== ""||xzqhdm !== undefined){
        let param = {xzqhdm: xzqhdm};
        this.geoData = this.$store.state.user.userInfo.xzqhdm;
        getAreaList(param).then(res => {
          if (res.status) {
            this.geoOption = res.result;
            this.geoOption = this.getTreeData(this.geoOption);
          }
        })
      }
    },
    getTreeData(data) {//把treedata的数据中空数组设为undefined,否则会导致bug
      // 循环遍历json数据
      for (let i = 0; i < data.length; i++) {
        data[i].label = data[i].xzqhmc;
        data[i].id = data[i].xzqhdm;
        if (data[i].children.length < 1) {
          // children若为空数组，则将children设为undefined
          data[i].children = undefined;
        } else {
          // children若不为空数组，则继续 递归调用 本方法
          this.getTreeData(data[i].children);
        }
      }
      return data;
    }
  },
  mounted() {
    this.initXzqhData();
  }
}
