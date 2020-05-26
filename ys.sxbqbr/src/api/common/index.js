import request from "../request";

//查询子集行政区划
export function getXZQH(params) {
  return request.post("api/ms-admin/administrativeArea/getXZQH", params);
}
//查询子集行政区划
export function xzqhData(params) {
  return request.get("api/ms-common/xzqh/getXzqhTreeList", { params: params });
}

export function getXzqhTreeList(params) {
  return request.get("api/ms-common/xzqh/getLimitXjXzqhTreeList", {
    params: params
  });
}

//查询隐患点列表数据
export function queryDzjbxxPage(params) {
  return request.post('api/ms-dcpj/dzjbxx/queryDzjbxxPage', params); 
}

//获取行政区划
export function getAreaList(params) {
  return request.get('/api/ms-common/xzqh/getLimitXjXzqhTreeList',{params:params});
}
