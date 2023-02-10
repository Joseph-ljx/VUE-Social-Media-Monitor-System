const data = [
  {
    title:
      " Website system for Natural Disaster Monitoring base on multiple social media - Version 1.3",
    url:
      "https://github.com/SMAteam/document/blob/master/%E7%B3%BB%E7%BB%9F%E6%96%87%E6%A1%A3.md",
  },
];
module.exports = [
  {
    url: "/ad/getList",
    type: "get",
    response() {
      return {
        code: 200,
        msg: "success",
        data,
      };
    },
  },
];
