import request from "@/utils/request";

export function getBar1(data) {
  //第一个舆情时间分布柱状图
  return request({
    url: "http://49.232.229.126:8000/earthquake_macroscopic/bar1",
    method: "post",
    data,
  });
}
export function getBar2(data) {
  //总计条形柱状图
  return request({
    url: "http://49.232.229.126:8000/earthquake_macroscopic/basestatistics",
    method: "post",
    data,
  });
}
