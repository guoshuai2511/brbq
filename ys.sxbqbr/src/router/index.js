import Vue from 'vue'
import store from '../store'
import Router from 'vue-router'
import Home from '@/components/AppHome'
import { getCookie, setCookie} from '../utils/cookie'

Vue.use(Router);
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

let router = new Router({
  base: "/", //项目名称 访问路由页面都需要加上这个,访问的根路径为http://ip:port/webSite
  mode: "history", //消去#
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: 'sy',
          name: "首页",
          component: () => import("@/components/sy/SyView")

        },
        {
          path: 'sjlr',
          name: "数据录入",
          component: () => import("@/components/sjlr/SjlrView")
        },
        {
          path: 'sjgl',
          name: "数据管理",
          component: () => import("@/components/sjgl/SjglView")
        },
        {
          path: 'sjtj',
          name: "数据统计",
          component: () => import("@/components/sjtj/SjtjView")
        },
      ]
    },
  ]
});

router.beforeEach((to, from, next) => {
  let token = store.state.user.token;
  if(!token){  //判断系统是否存在token
    token = location.href.split("?").length>1?location.href.split("?")[1]:getCookie('token');
    if(token){//若取到 则进行缓存
      token = token.split('#')[0];//清除末尾的#/号
      setCookie('token',token,'h12');//存到cookie，第三个参数为时间 具体格式setCookie方法中有
      store.dispatch('user/setTokenAct', "Bearer "+token);//存到系统状态中 添加Bearer 字符
      next();
    }else{ //否则 跳转登录
      store.dispatch('user/logoutAct');
      window.location.href = store.state.user.loginUrl + store.state.user.systemUrl;
    }
  }else{
    next();
  }
});

export default router
