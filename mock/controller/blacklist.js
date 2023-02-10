const data = [
  {
    name: "1111111",
    qq: "8222222",
    excuse: "333333333",
  },
];
module.exports = [
  {
    url: "/blacklist/getList",
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
