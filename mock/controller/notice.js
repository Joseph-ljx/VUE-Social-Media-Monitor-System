const data = [
  {
    title:
      "基于多源社交媒体的灾害事件分析系统。在这里，你可以获得最新的、实时的、分析处理过的多样数据信息。（链接至系统文档）",
    closable: false,
    type: "success",
  },
  {
    title: "主要内容：这里可以写主Title。",
    closable: false,
    type: "warning",
  },
  {
    title: "相关内容：这里可以写副title。",
    closable: false,
    type: "success",
  },
  {
    title: "这里也可以随便写一点啥。",
    closable: false,
    type: "success",
  },
];
module.exports = [
  {
    url: "/notice/getList",
    type: "post",
    response() {
      return {
        code: 200,
        msg: "success",
        data,
      };
    },
  },
];
