import request from "@/utils/request";

export function getLocation(data) {
  return request({
    url: "http://49.232.229.126:8000/earthquake_macroscopic/map3",
    method: "post",
    data,
  });
}
