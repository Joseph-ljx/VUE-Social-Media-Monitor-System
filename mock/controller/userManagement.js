const totalCount = 3;
const List = [
  {
    id: "13001137866", //电话
    username: "admin",
    password: "123456",
    email: "1298508511@qq.com",
    permissions: ["admin"],
    datatime: "2021-03-16 07:46:55",
  },
  {
    id: "13001137866", //电话
    username: "editor",
    password: "123456",
    email: "2017212938@bupt.edu.cn",
    permissions: ["editor"],
    datatime: "2021-03-19 07:46:55",
  },
  {
    id: "13001137866", //电话
    username: "ljx02263",
    password: "123456",
    email: "2017212938@bupt.edu.cn",
    permissions: ["admin", "editor"],
    datatime: "2021-03-21 07:46:55",
  },
];
module.exports = [
  {
    url: "/userManagement/getList",
    type: "post",
    response(config) {
      const { title = "", pageNo = 1, pageSize = 20 } = config.body;
      let mockList = List.filter((item) => {
        if (title && item.title.indexOf(title) < 0) return false;
        return true;
      });
      const pageList = mockList.filter(
        (item, index) =>
          index < pageSize * pageNo && index >= pageSize * (pageNo - 1)
      );
      return {
        code: 200,
        msg: "success",
        totalCount,
        data: pageList,
      };
    },
  },
  {
    //进入这里来操作 - 模拟编辑
    url: "/userManagement/doEdit",
    type: "post",
    response() {
      return {
        code: 200,
        msg: "保存成功",
      };
    },
  },
  {
    //进入这里来操作 - 模拟删除
    url: "/userManagement/doDelete",
    type: "post",
    response() {
      return {
        code: 200,
        msg: "删除成功",
      };
    },
  },
];
