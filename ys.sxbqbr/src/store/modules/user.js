/**
 * 管理登录用户信息
 */
const state = {
  userInfo: JSON.parse(sessionStorage.getItem("userInfo")) || {},
  token: sessionStorage.getItem("token") || "",
  menuTree: JSON.parse(sessionStorage.getItem("menuTree")) || {},
  userXzqhList: [],
  menuId: "", //路由点击的菜单id
  systemId: "0.86", //系统id
  systemUrl: window.location.href.split("?")[0], //系统路径
  loginUrl: "http://117.187.130.186:3013/cas/login?redirectUrl=", //登录跳转地址
  outLoginUrl: "http://117.187.130.186:3013/cas/logout?logoutUrl=" //退出登录跳转地址
};
const getters = {
  //实时监听state值的变化(最新状态)
  token(state) {
    return state.token;
  },
  userInfo(state) {
    return state.userInfo;
  },
  menuTree(state) {
    return state.menuTree;
  },
  menuId(state) {
    return state.menuId;
  }
};
const mutations = {
  // 设置token
  setToken(state, dataStr) {
    state.token = dataStr;
  },
  // 设置用户信息
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo;
  },
  //设置用户功能树
  setUserMenu(state, menuTree) {
    state.menuTree = menuTree;
  },
  // 设置用户信息
  setUserXzqhList(state, userInfo) {
    state.userXzqhList = userInfo;
  },
  //设置用户点击的菜单id
  setUserMenuId(state, menuId) {
    state.menuId = menuId;
  }
};
const actions = {
  // 登录保存touken
  setTokenAct(context, token) {
    sessionStorage.setItem("token", token);
    context.commit("setToken", token);
  },
  // 用户信息
  setUserInfoAct(context, userInfo) {
    sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
    context.commit("setUserInfo", userInfo);
  },
  //用户功能树
  setUserMenuAct(context, menuTree) {
    sessionStorage.setItem("menuTree", JSON.stringify(menuTree));
    context.commit("setUserMenu", menuTree);
  },
  // 用户行政区划
  setUserListAct(context, userXzqhList) {
    sessionStorage.setItem("userXzqhList", JSON.stringify(userXzqhList));
    context.commit("setUserXzqhList", userXzqhList);
  },
  //菜单功能id
  setMenuIdAct(context, menuId) {
    sessionStorage.setItem("menuId", menuId);
    context.commit("setUserMenuId", menuId);
  },
  // 退出登录
  logoutAct(context) {
    sessionStorage.clear();
    context.commit("setToken", "");
    context.commit("setUserInfo", {});
  }
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
