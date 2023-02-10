import request from "@/utils/request";

export function getEarthQuakeData(data) {
  return request({
    url: "http://49.232.229.126:8000/earthquake_macroscopic/map1",
    method: "post",
    data,
  });
}
export function getWeiboData(data) {
  return request({
    url: "http://49.232.229.126:8000/earthquake_macroscopic/map2",
    method: "post",
    data,
  });
}
export function getStormData(data) {
  return request({
    url: "/storm/getStormData",
    method: "post",
    data,
  });
}
export function getTyphoonData(data) {
  return request({
    url: "/typhoon/getTyphoonData",
    method: "post",
    data,
  });
}
