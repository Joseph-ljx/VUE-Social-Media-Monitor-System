const totalCount = 31;
const data = [
  { name: "西藏", value: 500.0 },
  { name: "青海", value: 8000.0 },
  { name: "宁夏", value: 1424.0 },
  { name: "海南", value: 3234.0 },
  { name: "甘肃", value: 3028.0 },
  { name: "贵州", value: 3000.0 },
  { name: "新疆", value: 200.0 },
  { name: "云南", value: 29371.0 },
  { name: "重庆", value: 8000.0 },
  { name: "吉林", value: 100.0 },
  { name: "山西", value: 498.0 },
  { name: "天津", value: 600.0 },
  { name: "江西", value: 11702.82 },
  { name: "广西", value: 7000.0 },
  { name: "陕西", value: 200.0 },
  { name: "黑龙江", value: 14342 },
  { name: "内蒙古", value: 132 },
  { name: "安徽", value: 679.98 },
  { name: "北京", value: 15463, selected: true },
  { name: "福建", value: 17560.18 },
  { name: "上海", value: 19195.69 },
  { name: "湖北", value: 8988 },
  { name: "湖南", value: 19899 },
  { name: "四川", value: 2102.68 },
  { name: "辽宁", value: 222.7 },
  { name: "河北", value: 2451.76 },
  { name: "河南", value: 2693.03 },
  { name: "浙江", value: 32318.85 },
  { name: "山东", value: 4536.85 },
  { name: "江苏", value: 4911.27 },
  { name: "广东", value: 53210.28 },
];
module.exports = [
  {
    url: "/typhoon/getTyphoonData",
    type: "post",
    response() {
      return {
        code: 200,
        msg: "success",
        totalCount,
        data: data,
      };
    },
  },
];
