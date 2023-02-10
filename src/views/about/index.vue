<template>
  <div class="index-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-alert v-if="noticeList[0]" :closable="noticeList[0].closable">
          <div
            style="display: flex; align-items: center; justify-content: center"
          >
            <a
              target="_blank"
              href="https://github.com/SMAteam/document/blob/master/%E7%B3%BB%E7%BB%9F%E6%96%87%E6%A1%A3.md"
            >
              <img
                style="margin-right: 10px"
                src="https://cdn.jsdelivr.net/gh/ljx02263/Resources@master/ToGithub.jpg"
              />
            </a>
            {{ noticeList[0].title }}
          </div>
        </el-alert>
      </el-col>

      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-alert v-if="noticeList[0]" :closable="noticeList[0].closable">
          <div
            style="display: flex; align-items: center; justify-content: center"
          >
            <a
              target="_blank"
              href="https://github.com/ljx02263/Resources/tree/2.0"
            >
              <img
                style="margin-right: 10px"
                src="https://cdn.jsdelivr.net/gh/ljx02263/Resources@master/ToGithub.jpg"
              />
            </a>
            我们录制了关于我们系统使用说明的视频（Demo），并将其传至了github上；若有需求，可以点击链接至Resource仓库并下载观看
          </div>
        </el-alert>
      </el-col>

      <el-card class="card" shadow="never">
        <div class="markdown-container markdown-body">
          <div v-html="prettierList"></div>
        </div>
      </el-card>
      <el-col :xs="24" :sm="24" :md="24" :lg="11" :xl="11">
        <el-card class="card" shadow="hover">
          <div slot="header">系统结构</div>
          <div style="height: 400px">
            <vab-chart
              :autoresize="true"
              theme="vab-echarts-theme"
              :options="sunMap"
            />
          </div>
        </el-card>

        <el-card class="card" shadow="never">
          <div slot="header">
            <span>系统依赖信息</span>
            <div style="float: right">部署时间:{{ updateTime }}</div>
          </div>

          <table class="table">
            <tr>
              <td>@vue/cli版本</td>
              <td>{{ devDependencies["@vue/cli-service"] }}</td>
              <td>vue版本</td>
              <td>{{ dependencies["vue"] }}</td>
            </tr>
            <tr>
              <td>vuex版本</td>
              <td>{{ dependencies["vuex"] }}</td>
              <td>vue-router版本</td>
              <td>{{ dependencies["vue-router"] }}</td>
            </tr>
            <tr>
              <td>element-ui版本</td>
              <td>{{ dependencies["element-ui"] }}</td>
              <td>axios版本</td>
              <td>{{ dependencies["axios"] }}</td>
            </tr>
            <tr>
              <td>eslint版本</td>
              <td>{{ devDependencies["eslint"] }}</td>
              <td>prettier版本</td>
              <td>{{ devDependencies["prettier"] }}</td>
            </tr>
            <tr>
              <td>sass版本</td>
              <td>{{ devDependencies["sass"] }}</td>
              <td>mockjs版本</td>
              <td>{{ dependencies["mockjs"] }}</td>
            </tr>
            <tr>
              <td>zx-layouts版本</td>
              <td>{{ dependencies["zx-layouts"] }}</td>
              <td>lodash版本</td>
              <td>{{ dependencies["lodash"] }}</td>
            </tr>
          </table>
        </el-card>

        <el-card shadow="never">
          <div slot="header">
            <span>其他信息</span>
          </div>
          <div style="text-align: center">
            <vab-colorful-icon style="font-size: 140px" icon-class="vab" />
            <h1 style="font-size: 30px">基于多源社交媒体的灾害事件分析系统</h1>
          </div>
          <div v-for="(item, index) in noticeList" :key="index">
            <el-alert
              v-if="index !== 0"
              :title="item.title"
              :type="item.type"
              :closable="item.closable"
            ></el-alert>
            <br />
          </div>
          <el-alert :closable="false" :title="userAgent" type="info"></el-alert>
          <br />
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="13" :lg="13" :xl="13">
        <el-card class="card" shadow="never">
          <div slot="header">
            <span>版本更新内容</span>
          </div>

          <el-timeline :reverse="reverse">
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :timestamp="activity.timestamp"
              :color="activity.color"
            >
              {{ activity.content }}
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import marked from "marked";
  import "github-markdown-css/github-markdown.css";
  import { getList } from "@/api/markdown";
  import { getChangeLog } from "@/api/changeLog";

  import { dependencies, devDependencies } from "../../../package.json";
  import { getNoticeList } from "@/api/notice";
  import { getRepos, getStargazers } from "@/api/github";
  import VabChart from "@/plugins/echarts";

  export default {
    name: "Markdown",
    components: {
      VabChart,
    },
    data() {
      return {
        listLoading: true,
        elementLoadingText: "正在加载...",
        options: [
          {
            value: "0",
            label: "Prettier",
          },
        ],
        value: "0",
        prettierList: null,
        timer: 0,
        updateTime: process.env.VUE_APP_UPDATE_TIME,
        nodeEnv: process.env.NODE_ENV,
        dependencies: dependencies,
        devDependencies: devDependencies,
        reverse: true,
        activities: [],
        noticeList: [],
        //其他信息
        userAgent: navigator.userAgent,

        sunMap: {
          //旭日图
          visualMap: {
            type: "continuous",
            min: 0,
            max: 10,
            inRange: {
              color: ["#2F93C8", "#AEC48F", "#FFDB5C", "#F98862"],
            },
          },

          series: {
            type: "sunburst",
            data: [
              {
                name: "系统页",
                children: [
                  {
                    name: "地震事件",
                    value: 15,
                    children: [
                      {
                        name: "各月灾害数量",
                        value: 2,
                      },
                      {
                        name: "各月微博数量",
                        value: 5,
                      },
                      {
                        name: "震级分类",
                        value: 4,
                      },
                      {
                        name: "地震列表",
                        value: 4,
                        children: [
                          {
                            name: "地区分类",
                            value: 2,
                          },
                        ],
                      },
                    ],
                  },
                  {
                    name: "地震事件详情",
                    children: [
                      {
                        name: "热度曲线",
                        value: 4,
                      },
                      {
                        name: "词云",
                        value: 4,
                      },
                      {
                        name: "数值统计",
                        value: 4,
                      },
                      {
                        name: "分布地图",
                        value: 4,
                      },
                      {
                        name: "事件线",
                        value: 4,
                      },
                      {
                        name: "源数据",
                        value: 4,
                        children: [
                          {
                            name: "微博数据",
                            value: 2,
                          },
                          {
                            name: "新闻数据",
                            value: 2,
                          },
                        ],
                      },
                    ],
                  },
                  {
                    name: "舆情信息",
                    value: 10,
                    children: [
                      {
                        name: "微博信息",
                        value: 4,
                        itemStyle: {
                          color: "red",
                        },
                      },
                      {
                        name: "新闻信息",
                        value: 3,
                      },
                    ],
                  },
                ],
              },
              {
                name: "地震分布",
                children: [
                  {
                    name: "各省地震数量",
                    value: 6,
                  },
                  {
                    name: "各省微博数量",
                    value: 6,
                  },
                ],
              },
              {
                name: "地图标注",
                children: [
                  {
                    name: "全国地震分布",
                    value: 6,
                  },
                ],
              },
              {
                name: "关于",
                value: 4,
              },
            ],
            radius: [0, "95%"],
            center: ["50%", "46%"],
            label: {
              rotate: "radial",
            },
          },
        },
      };
    },
    created() {
      this.fetchData();
      this.fetchChangeLogData();
    },
    mounted() {},
    methods: {
      handleChange(val) {
        this.value = val;
        this.fetchData();
      },
      async fetchData() {
        this.listLoading = true;
        switch (this.value) {
          case "0":
            const { data } = await getList();
            this.prettierList = marked(data || "", {
              renderer: new marked.Renderer(),
              gfm: true,
              tables: true,
              breaks: false,
              pedantic: false,
              sanitize: false,
              smartLists: true,
              smartypants: false,
            });

            break;
        }
        setTimeout(() => {
          this.listLoading = false;
        }, 500);

        const res = await getNoticeList(); //获得关于列表数据
        this.noticeList = res.data;
      },

      async fetchChangeLogData() {
        const { data } = await getChangeLog();
        data.map((item, index) => {
          if (index === data.length - 1) {
            item.color = "#0bbd87";
          }
        });
        this.activities = data;
      },
    },
  };
</script>
<style lang="scss" scoped>
  .dropDownClass {
    float: right;
    width: 140px;
    margin: -7px 0px;
  }
  .index-container {
    padding: 0 !important;
    margin: 0 !important;
    background: #f5f7f8 !important;
    ::v-deep {
      .el-alert {
        padding: $base-padding;
        &--info.is-light {
          min-height: 82px;
          padding: $base-padding;
          margin-bottom: 15px;
          color: #909399;
          background-color: $base-color-white;
          border: 1px solid #ebeef5;
        }
      }
      .el-card__body {
        .echarts {
          width: 100%;
          height: 115px;
        }
      }
    }
    .card {
      ::v-deep {
        .el-card__body {
          .echarts {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .bottom {
      padding-top: 20px;
      margin-top: 5px;
      color: #595959;
      text-align: left;
      border-top: 1px solid $base-border-color;
    }
    .table {
      width: 100%;
      color: #666;
      border-collapse: collapse;
      background-color: #fff;
      td {
        position: relative;
        min-height: 20px;
        padding: 9px 15px;
        font-size: 14px;
        line-height: 20px;
        border: 1px solid #e6e6e6;
        &:nth-child(odd) {
          width: 20%;
          text-align: right;
          background-color: #f7f7f7;
        }
      }
    }
    .icon-panel {
      height: 117px;
      text-align: center;
      cursor: pointer;
      svg {
        font-size: 40px;
      }
      p {
        margin-top: 10px;
      }
    }
    .bottom-btn {
      button {
        margin: 5px 10px 0px 0;
      }
    }
  }
</style>
