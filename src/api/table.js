import request from "@/utils/request";

export function getList(data) {
  return request({
    url: "/table/getList",
    method: "post",
    data,
  });
}

export function doEdit(data) {
  return request({
    url: "/table/doEdit",
    method: "post",
    data,
  });
}

export function doDelete(data) {
  return request({
    url: "/table/doDelete",
    method: "post",
    data,
  });
}

export function getList1(data) {
  return request({
    url: "http://49.232.229.126:8000/earthquake_macroscopic/list1",
    method: "post",
    data,
  });
}

export function getListHot(data) {
  return request({
    url: "http://49.232.229.126:8000/earthquake_macroscopic/listHot",
    method: "post",
    data,
  });
}
export function getLine1(data) {
  return request({
    url: "http://49.232.229.126:8000/earthquake_macroscopic/line1",
    method: "post",
    data,
  });
}
export function getDefault(data) {
  return request({
    url: "http://49.232.229.126:8000/earthquake_microcosmic/list1?number=1",
    method: "post",
    data,
  });
}
export function getDefaultCY(data) {
  return request({
    url: "http://49.232.229.126:8000/earthquake_microcosmic/wordcloud1?number=1",
    method: "post",
    data,
  });
}
export function getDefaultHeat(data) {
  return request({
    url: "http://49.232.229.126:8000/earthquake_microcosmic/heattrend1?number=1",
    method: "post",
    data,
  });
}
export function getDefaultBasic(
  totalCount,
  userCount,
  originalCount,
  forwardCount,
  authority_num
) {
  return request({
    url:
      "http://49.232.229.126:8000/earthquake_microcosmic/basestatistics1?number=1",
    method: "post",
    totalCount,
    userCount,
    originalCount,
    forwardCount,
    authority_num,
  });
}
