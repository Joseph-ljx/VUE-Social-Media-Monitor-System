import request from "axios";

export function getList() {
  return request({
    url: "https://cdn.jsdelivr.net/gh/ljx02263/Resources@2.0/Description.md",
    method: "get",
  });
}
