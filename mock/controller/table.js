const { mock } = require("mockjs");
const { handleRandomImage } = require("../utils");

const List = [];
const count = 100;
for (let i = 0; i < count; i++) {
  List.push(
    mock({
      uuid: "@uuid",
      id: "@id",
      title: "@csentence(1, 2)",
      "province|1": [
        "浙江",
        "北京市",
        "广东",
        "西藏",
        "新疆",
        "黑龙江",
        "湖北",
        "香港",
        "澳门",
        "台湾",
      ], //三个属性三选一
      author: "@cname",
      datetime: "@datetime",
      pageViews: "@integer(300, 5000)",
      switch: "@boolean",
      percent: "@integer(80,99)",
    })
  );
}

module.exports = [
  {
    url: "/table/getList",
    type: "post",
    response(config) {
      if (!config.body) {
        return {
          code: 200,
          msg: "success",
          totalCount: count,
          data: mock({
            "data|50": [
              {
                id: "@id",
                title: "@csentence(1, 2)",
                /* "status|1": ["published", "draft", "deleted"], */
                "province|1": [
                  "浙江",
                  "北京",
                  "广东",
                  "西藏",
                  "新疆",
                  "黑龙江",
                  "湖北",
                  "香港",
                  "澳门",
                  "台湾",
                ], //三个属性三选一
                author: "@cname",
                datetime: "@datetime",
                pageViews: "@integer(300, 5000)",
                img: handleRandomImage(200, 200),
                smallImg: handleRandomImage(40, 40),
                switch: "@boolean",
                percent: "@integer(80,99)",
              },
            ],
          }).data,
        };
      }
      const { title = "", pageNo = 1, pageSize = 20 } = config.body;
      let mockList = List.filter((item) => {
        return !(title && item.title.indexOf(title) < 0);
      });
      const pageList = mockList.filter(
        (item, index) =>
          index < pageSize * pageNo && index >= pageSize * (pageNo - 1)
      );
      return {
        code: 200,
        msg: "success",
        totalCount: count,
        data: pageList,
      };
    },
  },
  {
    url: "/table/doEdit",
    type: "post",
    response() {
      return {
        code: 200,
        msg: "模拟保存成功",
      };
    },
  },
  {
    url: "/table/doDelete",
    type: "post",
    response() {
      return {
        code: 200,
        msg: "模拟删除成功",
      };
    },
  },
];
