import request from "../request";

//新增搬迁避让明细
export function insertBqbrmx(params) {
  return request.post("api/ms-bqbr/bqbrmx/insertBqbrmx", params);
}

//修改搬迁避让明细
export function updateBqbrmx(params) {
  return request.post("api/ms-bqbr/bqbrmx/updateBqbrmx", params);
}

//删除搬迁避让明细
export function deleteBqbrmx(params) {
  return request.get("api/ms-bqbr/bqbrmx/deleteBqbrmx", { params });
}

//查询搬迁避让明细
export function getBqbrmx(params) {
  return request.get("api/ms-bqbr/bqbrmx/getBqbrmx", { params });
}

//分页查询搬迁避让明细
export function pageBqbrmx(params) {
  return request.post("api/ms-bqbr/bqbrmx/pageBqbrmx", params);
}
