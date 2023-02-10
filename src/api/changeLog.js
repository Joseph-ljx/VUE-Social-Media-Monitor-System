import request from "@/utils/request";

export function getChangeLog(data) {
  return request({
    url: "/changeLog/getList",
    method: "post",
    data,
  });
}
