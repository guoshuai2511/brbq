import request from '../request'

//根据用户id获取token
export function listTjByXzqh(params) {
  return request.post('/api/ms-bqbr/tj/listTjByXzqh', params);
}
