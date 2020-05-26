<template>
  <div class="leftContent">
    <el-row class="tac">
      <el-col :span="24">
      <el-menu
        :default-active="routePath"
        @select="handleSelect"
        background-color="#FAFBFD"
        text-color="#333"
        active-text-color="#4c8deb"
        value="">
        <template v-for="item in menuTree">
          <template v-if="item.children&&item.children.length">
            <el-submenu
              :key="item.zjlj"
              :index="item.zjlj">
              <template slot="title">
                <i :class="item.zjlj +' functionIcon'"></i>
                <span>{{item.label}}</span>
              </template>
              <el-menu-item-group v-for="subItem in item.children" :key="subItem.zjlj">
                <el-menu-item :index="subItem.zjlj" >{{subItem.label}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </template>
          <template v-else>
            <el-menu-item
              :index="item.zjlj"
              :key="item.id">
              <i :class="item.zjlj +' functionIcon'"></i>
              <span slot="title">{{item.label}}</span>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "LeftMenu",
    props: {
      menuTree: Array
    },
    data(){
      return {
        keyPath: ""
      }
    },
    computed:{
      routePath(){
        return this.$route.path.substr(1)
      }
    },
    methods: {
      handleSelect(key,data,elem) {
        if(this.keyPath !== key){
          this.keyPath = key;
          this.$router.push({ path: "/" + key });
        }

        //将当前菜单id存入全局变量中
        this.$store.dispatch('user/setMenuIdAct', elem.$el.id);
      },
    },
  }
</script>

<style scoped lang="scss">
  .leftContent {
    width: 225px;
    height: 100%;
  }
  .functionIcon{
    height: 17px;
    width: 24px;
    display: inline-block;
    margin-right: 5px;
  }
  .sy{
    background: url("../assets/images/menuIcon/ywdc.png") no-repeat center;
  }
  .sjlr{
    background: url("../assets/images/menuIcon/qcqf.png") no-repeat center;
  }
  .sjgl{
    background: url("../assets/images/menuIcon/xmxx.png") no-repeat center;
  }
  .sjtj{
    background: url("../assets/images/menuIcon/tjfx.png") no-repeat center;
  }
  .el-submenu .el-menu-item{
    position: relative;
    font-size: 14px;
    height:42px;
    line-height: 42px;
  }
  .el-submenu .el-menu-item::before{
    position: absolute;
    background-color: #4A8DF0;
    height: 100%;
    width: 3px;
    left: 0;
    top: 0;
    display: none;
    content: "";
  }
  .el-submenu .el-menu-item:hover{
    background-color: #EAEEFA !important;
    /*border-left: 2px solid #409EFF;*/
  }
  .el-submenu .el-menu-item.is-active {
    color: #4A8DF0 !important;
    background-color: #EAEEFA !important;
    font-weight: bold;
    /*border-left: 2px solid #409EFF;*/
  }
  .el-submenu .el-menu-item:hover::before,
  .el-submenu .el-menu-item.is-active::before{
    display: block;
  }
</style>
<style>
  .el-submenu .el-submenu__title{
    font-size: 16px;
  }
  .el-submenu .el-submenu__title:hover{
    background-color: #EAEEFA !important;
  }
</style>
