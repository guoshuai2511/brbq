import request from "../request";

//查询搬迁避让隐患点
export function listBqbrPointByParams(params) {
  return request.post("api/ms-bqbr/sy/listBqbrPointByParams", params);
}
