import request from '../request'

//查询子集行政区划
export function updatePassword(params) {
  return request.post('api/ms-admin/user/updatePassword',params);
}
