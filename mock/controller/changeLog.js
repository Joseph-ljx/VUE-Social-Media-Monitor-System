const data = [
  {
    content: "增加更换主题功能",
    timestamp: "2020-09-10",
  },
  {
    content: "大幅精简代码",
    timestamp: "2020-09-14",
  },

  {
    content: "添加maptalks地图图层",
    timestamp: "2020-09-17",
  },
  {
    content: "了解视频播放器组件",
    timestamp: "2020-09-20",
  },
  {
    content: "添加地震分布功能 完善地图配色",
    timestamp: "2020-09-22",
  },
  {
    content: "修复全局axios拦截 修复异域问题 实现数据传输与格式约定",
    timestamp: "2020-09-24",
  },
  {
    content: "简化权限与登录逻辑 更新mock内容，明白交互原理",
    timestamp: "2020-09-25",
  },
  {
    content: "优化页面交互 代码更清晰 重载路由形式 初步构建地震事件页面",
    timestamp: "2020-09-26",
  },
  {
    content: "大幅优化地震事件页面内容展示以及功能",
    timestamp: "2020-10-02",
  },
  {
    content: "增添地址详情功能",
    timestamp: "2020-10-03",
  },
  {
    content: "增添地震事件详情功能",
    timestamp: "2020-10-04",
  },
  {
    content: "添加地图标注版块，结合MapTalks组件运行",
    timestamp: "2020-10-10",
  },
  {
    content: "添加炫酷地震事件详情相关组件",
    timestamp: "2020-10-20",
  },
  {
    content: "地震事件详情添加词云展示，同期添加双类型词云选择功能",
    timestamp: "2020-10-25",
  },
  {
    content: "添加菜单管理，重构sidebar路由逻辑",
    timestamp: "2020-11-7",
  },
  {
    content: "添加地址详情功能，同期添加筛选、分类、跳转等功能",
    timestamp: "2020-11-7",
  },
  {
    content: "优化页面可点击逻辑，增添用户交互体验",
    timestamp: "2020-2-10",
  },
  {
    content: "添加vue-amap组件，补充/重构详情页饼状分类以及对比信息",
    timestamp: "2020-2-13",
  },
  {
    content:
      "修重构地震事件详情相关内容，增添事件线以及新闻内容展示，同期事件线完善可点击",
    timestamp: "2020-2-20",
  },
  {
    content: "全局axios请求全面支持Status Code拦截处理",
    timestamp: "2020-2-25",
  },
  {
    content: "构建系统主页，添加按钮指引及系统信息",
    timestamp: "2021-03-10",
  },
  {
    content: "提升用户选择自由度，补充各类选择框体，优化页面跳转逻辑",
    timestamp: "2021-04-05",
  },
  {
    content:
      "重构详情页面，提升数据价值；补充条件渲染知识图谱；更换各地图为彩色",
    timestamp: "2021-04-05",
  },
  {
    content: "重构主页，改变数据布局；移动地图分布至主页",
    timestamp: "2021-04-06",
  },
  {
    content: "更改热度曲线为主题河流；修改数据质量",
    timestamp: "2021-04-12",
  },
  {
    content: "粗略写了点系统更新的功能时间线，撰写报告以及report",
    timestamp: "2021-04-16",
  },
];

module.exports = [
  {
    url: "/changeLog/getList",
    type: "post",
    response() {
      return {
        code: 200,
        msg: "success",
        totalCount: 999,
        data: data,
      };
    },
  },
];
