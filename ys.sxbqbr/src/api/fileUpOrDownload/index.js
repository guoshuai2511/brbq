import request from '../request'
import imgRequest from '../imgRequest'

//获取省级未下达列表数据
export function searchFileList(params) {
  return request.post('api/ms-fileupdoload/updownLoad/getDownloadQueryNo', params);
}

//图片文件预览
export function imgFileLook(params) {
  return imgRequest.get('api/ms-fileupdoload/updownLoad/show', {params:params, responseType:"blob"});
}

//文件删除
export function delFile(params) {
  return request.get('api/ms-fileupdoload/updownLoad/delete', {params:params});
}

//文件下载
export function downloadFile(params) {
  return imgRequest.get('DisasterManageSystem/api/ms-fileupdoload/updownLoad/Download', {params:params,responseType:"blob"});
}
