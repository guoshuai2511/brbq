<template>
  <div class="container">
    <div class="container-body">
      <div class="container-body-header">
        <home-header :userName="userName"></home-header>
      </div>
      <div class="container-body-content">
        <div class="content-left">
          <left-menu :menuTree="menuTree"></left-menu>
        </div>
        <div class="content-right">
          <div class="content-right-content">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeHeader from "@/components/HomeHeader";
import LeftMenu from "@/components/LeftMenu";
import { getUserInfo, getUserMenu } from "../api/login";
import { getXzqhTreeList } from "@/api/common";

export default {
  name: "Home",
  data() {
    return {
      menuTree: [],
      userName: "admin"
    };
  },
  components: {
    HomeHeader,
    LeftMenu
  },
  methods: {},
  beforeMount() {
    //对菜单信息进行写死，后面接口可使用时可以删除
    let data = [
      {
        id: 1,
        label: "首页",
        zjlj: "sy",
        children: []
      },
      {
        id: 2,
        label: "数据录入",
        zjlj: "sjlr",
        children: []
      },
      {
        id: 3,
        label: "数据管理",
        zjlj: "sjgl",
        children: []
      },
      {
        id: 4,
        label: "数据统计",
        zjlj: "sjtj",
        children: []
      }
    ];

    this.menuTree = data;
    this.$store.dispatch("user/setUserMenuAct", data);

    //默认加载第一个菜单项
    if (data[0].children.length > 0) {
      let page = data[0].children[0].zjlj;
      this.$router.push({ path: "/" + page });
    } else {
      this.$router.push({ path: "/" + data[0].zjlj });
    }
    //以上部分可删除

    getUserInfo().then(res => {
      if (res.status) {
        this.userName = res.result.yhm;
        //给行政区划级别，方便全局使用
        if (res.result.xzqhdm) {
          if (res.result.xzqhdm.length === 4) {
            res.result.xzqhjb = "市级";
          } else if (res.result.xzqhdm.length === 6) {
            res.result.xzqhjb = "县级";
          }
        }

        this.$store.dispatch("user/setUserInfoAct", res.result);

        let params = {
          xzqhdm: res.result.xzqhdm
        };
        getXzqhTreeList(params).then(xzqhRes => {
          if (res && res.status) {
            this.$store.dispatch("user/setUserListAct", xzqhRes.result[0]);
          }
        });

        //根据用户信息查询菜单数据
        // let params = {
        //   userId: res.result.yhid,
        //   systemId: this.$store.state.user.systemId,
        // };
        // getUserMenu(params).then(menuRes => {
        //   if(menuRes.status){
        //     this.menuTree = menuRes.result;
        //     this.$store.dispatch('user/setUserMenuAct', menuRes.result);

        //     //默认加载第一个菜单项
        //     if(menuRes.result[0].children.length > 0){
        //       let page = menuRes.result[0].children[0].zjlj;
        //       this.$router.push({ path: "/" + page });
        //     }else{
        //       this.$router.push({ path: "/" + menuRes.result[0].zjlj });
        //     }
        //   }
        // });
      }
    });
  }
};
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  .container-body {
    width: 100%;
    height: 100%;
    .container-body-header {
      height: 62px;
      width: 100%;
    }
    .container-body-content {
      height: calc(100% - 62px);
      width: 100%;
      background-color: #eef1f6;
      .content-left {
        float: left;
        height: 100%;
        width: 224px;
        overflow: hidden auto;
        background-color: #fafbfd;
      }
      .content-right {
        float: right;
        height: 100%;
        width: calc(100% - 226px);
        .content-right-content {
          width: calc(100% - 24px);
          height: calc(100% - 24px);
          padding: 12px;
        }
      }
    }
  }
}
</style>
