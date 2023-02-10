const accessTokens = {
  //添加用户以及对应权限的位置：添加新用户
  admin: "admin-accessToken",
  editor: "editor-accessToken",
  test: "test-accessToken",
  ljx02263: "test-accessToken",
};

module.exports = [
  {
    //对应给予accessToken的公钥
    url: "/publicKey",
    type: "post",
    response() {
      return {
        code: 200,
        msg: "success",
        data: {
          mockServer: true,
          publicKey:
            "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDBT2vr+dhZElF73FJ6xiP181txKWUSNLPQQlid6DUJhGAOZblluafIdLmnUyKE8mMHhT3R+Ib3ssZcJku6Hn72yHYj/qPkCGFv0eFo7G+GJfDIUeDyalBN0QsuiE/XzPHJBuJDfRArOiWvH0BXOv5kpeXSXM8yTt5Na1jAYSiQ/wIDAQAB",
        },
      };
    },
  },
  {
    url: "/login", //登录验证
    type: "post",
    response(config) {
      const { username } = config.body; //输入的名称
      const accessToken = accessTokens[username]; //对应accessToken的名字

      if (!accessToken) {
        return {
          code: 500,
          msg: "帐户或密码不正确。",
        };
      }
      return {
        code: 200,
        msg: "success",
        data: { accessToken },
      };
    },
  },

  {
    url: "/register", //注册验证
    type: "post",
    response() {
      return {
        code: 200,
        msg: "模拟注册成功",
      };
    },
  },

  {
    url: "/userInfo", //用户信息验证
    type: "post",
    response(config) {
      const { accessToken } = config.body;
      let permissions = ["admin"];
      let username = "admin";
      if ("admin-accessToken" === accessToken) {
        permissions = ["admin"];
        username = "admin";
      }
      if ("editor-accessToken" === accessToken) {
        permissions = ["editor"];
        username = "editor";
      }
      if ("test-accessToken" === accessToken) {
        permissions = ["admin", "editor"];
        username = "test";
      }
      return {
        code: 200,
        msg: "success",
        data: {
          permissions,
          username,
          "avatar|1": [
            "https://i.gtimg.cn/club/item/face/img/2/15922_100.gif",
            "https://i.gtimg.cn/club/item/face/img/8/15918_100.gif",
          ],
        },
      };
    },
  },
  {
    url: "/logout",
    type: "post",
    response() {
      return {
        code: 200,
        msg: "success",
      };
    },
  },
];
