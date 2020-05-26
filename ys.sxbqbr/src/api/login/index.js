import request from '../request'

//根据用户id获取token
export function getUserInfo(params) {
  return request.get('/api/ms-admin/user/getUser', {params:params});
}

//获取用户菜单
export function getUserMenu(params) {
  return request.get('/api/ms-admin/user/getUserMenuBySystemId', {params:params});
}
