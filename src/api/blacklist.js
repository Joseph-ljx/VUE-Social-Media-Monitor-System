import request from "@/utils/request";

export function getList(data) {
  return request({
    url: "/blacklist/getList",
    method: "post",
    data,
  });
}

//自己加的测试方法，随时可以删掉
export function getTestList(data) {
  return request({
    url: "http://49.232.229.126:8000/ceshi/test",
    method: "get",
    data,
  });
}
