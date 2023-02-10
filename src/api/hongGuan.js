import request from "@/utils/request";

export function getPie1(data) {
  return request({
    url: "http://49.232.229.126:8000/earthquake_macroscopic/pie1",
    method: "post",
    data,
  });
}
export function getWeiBo(data) {
  return request({
    url: "http://49.232.229.126:8000/earthquake_macroscopic/list2?media=1",
    method: "post",
    data,
  });
}
export function getNews(data) {
  return request({
    url: "http://49.232.229.126:8000/earthquake_macroscopic/list2?media=2",
    method: "post",
    data,
  });
}
