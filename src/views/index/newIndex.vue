<template>
  <div class="index-container">
    <el-row :gutter="20">
      <!-- <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
        <el-card shadow="never">
          <div slot="header">
            <span>访问量</span>
          </div>
          <vab-chart
            :autoresize="true"
            theme="vab-echarts-theme"
            :options="fwl"
          />
          <div class="bottom">
            <span>
              日均访问量:

              <vab-count
                :start-val="config1.startVal"
                :end-val="config1.endVal"
                :duration="config1.duration"
                :separator="config1.separator"
                :prefix="config1.prefix"
                :suffix="config1.suffix"
                :decimals="config1.decimals"
              />
            </span>
          </div>
        </el-card>
      </el-col> -->

      <!-- <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
        <el-card shadow="never">
          <div slot="header">
            <span>统计Weibo数</span>
          </div>
          <vab-chart
            :autoresize="true"
            theme="vab-echarts-theme"
            :options="sqs"
          />
          <div class="bottom">
            <span>
              当日总Weibo数:
              <vab-count
                :start-val="config2.startVal"
                :end-val="config2.endVal"
                :duration="config2.duration"
                :separator="config2.separator"
                :prefix="config2.prefix"
                :suffix="config2.suffix"
                :decimals="config2.decimals"
              />
            </span>
          </div>
        </el-card>
      </el-col> -->

      <el-col
        v-for="(item, index) in iconList"
        :key="index"
        :xs="24"
        :sm="24"
        :md="6"
        :lg="6"
        :xl="6"
      >
        <router-link :to="item.link">
          <el-card class="icon-panel" shadow="never">
            <vab-icon
              :style="{ color: item.color }"
              :icon="['fas', item.icon]"
            ></vab-icon>
            <p>{{ item.title }}</p>
          </el-card>
        </router-link>
      </el-col>

      <el-col :xs="24" :sm="24" :md="18" :lg="24" :xl="24">
        <el-card class="card" shadow="hover">
          <div style="text-align: center">
            <!-- <a>
                <el-button type="danger" size="big">舆情数：xxxxx</el-button>
              </a>
              <a>
                <el-button type="warning" size="big">
                  舆情 - 新闻数：xxxxx
                </el-button>
              </a>
              <a>
                <el-button type="warning" size="big">
                  舆情 - 微博数：xxxxx
                </el-button>
              </a> -->
            <a>
              <span style="font-size: 24px">累计统计地震数量：</span>
              <span style="font-size: 40px; font-weight: bold; color: #8f6e6e">
                {{ earthquakeNumber }}
              </span>
              <span style="font-size: 24px">，</span>
            </a>
            <a>
              <span style="font-size: 24px">累计统计舆情数量：</span>
              <span style="font-size: 40px; font-weight: bold; color: #8f6e6e">
                {{ opinionNumber }}
              </span>
            </a>
          </div>

          <!-- <div style="height: 400px">
            <vab-chart
              :autoresize="true"
              theme="vab-echarts-theme"
              :options="zyData"
            />
          </div> -->
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="24" :md="12" :lg="7" :xl="8">
        <el-card shadow="hover">
          <div slot="header">
            <span>全国地震灾害数的时间分布</span>
          </div>
          <vab-chart
            :autoresize="true"
            theme="vab-echarts-theme"
            :options="fwl"
          />
          <div class="bottom">
            <span>
              平均每月地震灾害数:
              <vab-count
                style="font-weight: bold"
                :start-val="config1.startVal"
                :end-val="config1.endVal"
                :duration="config1.duration"
                :separator="config1.separator"
                :prefix="config1.prefix"
                :suffix="config1.suffix"
                :decimals="config1.decimals"
              />
            </span>
          </div>
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="24" :md="12" :lg="7" :xl="8">
        <el-card shadow="hover">
          <div slot="header">
            <span>全国舆情量的时间分布</span>
          </div>
          <vab-chart
            :autoresize="true"
            theme="vab-echarts-theme"
            :options="zzt"
          />
          <div class="bottom">
            <span>
              平均每月舆情量:
              <vab-count
                style="font-weight: bold"
                :start-val="config2.startVal"
                :end-val="config2.endVal"
                :duration="config2.duration"
                :separator="config2.separator"
                :prefix="config2.prefix"
                :suffix="config2.suffix"
                :decimals="config2.decimals"
              />
            </span>
          </div>
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="24" :md="12" :lg="10" :xl="8">
        <el-card shadow="hover">
          <div slot="header">全国地震震级分布</div>
          <div>
            <vab-chart
              ref="myCircle"
              theme="vab-echarts-theme"
              :options="myChart1"
              class="my-circle"
            />
            <div class="bottom">
              <span>
                历史地震平均震级:
                <vab-count
                  style="font-weight: bold"
                  :start-val="config3.startVal"
                  :end-val="config3.endVal"
                  :duration="config3.duration"
                  :separator="config3.separator"
                  :prefix="config3.prefix"
                  :suffix="config3.suffix"
                  :decimals="config3.decimals"
                />
              </span>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-card class="card" shadow="never">
          <div slot="header">
            <span>地震灾害统计地图</span>
          </div>
          <div style="height: 500px">
            <vab-chart
              :autoresize="true"
              theme="vab-echarts-theme"
              :options="dzdt"
            />
          </div>
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-card class="card" shadow="never">
          <div slot="header">
            <span>地震舆情统计地图</span>
          </div>
          <div style="height: 500px">
            <vab-chart
              :autoresize="true"
              theme="vab-echarts-theme"
              :options="wbdt"
            />
          </div>
        </el-card>
      </el-col>

      <!-- <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-card class="card" shadow="hover">
          <div slot="header">播放器MP4 -</div>
          <vab-player-hls
            :config="config4"
            @player="Player1 = $event"
          ></vab-player-hls>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-card class="card" shadow="hover">
          <div slot="header">播放器MP4 -</div>
          <vab-player-mp4 :config="config5" @player="Player2 = $event" />
        </el-card>
      </el-col> -->
    </el-row>
  </div>
</template>

<script>
  import VabChart from "@/plugins/echarts";
  import * as echarts from "echarts";
  import { dependencies, devDependencies } from "../../../package.json";

  import { getChangeLog } from "@/api/changeLog";

  import { getNoticeList } from "@/api/notice";
  import { getRepos, getStargazers } from "@/api/github";

  /* import { VabPlayerMp4, VabPlayerHls } from "@/plugins/vabPlayer.js"; */

  import { getLine1 } from "@/api/table";
  import { getPie1 } from "@/api/hongGuan";
  import { getBar1, getBar2 } from "@/api/bar";

  import { getEarthQuakeData, getWeiboData } from "@/api/getMapData";

  export default {
    name: "Index",
    components: {
      VabChart,
      /* VabPlayerMp4,
      VabPlayerHls, */
    },
    data() {
      return {
        value: "",
        timer: 0,
        updateTime: process.env.VUE_APP_UPDATE_TIME,
        nodeEnv: process.env.NODE_ENV,
        dependencies: dependencies,
        devDependencies: devDependencies,
        Player1: null,
        Player2: null,

        list: [], //展示集
        dataList: [], //原始集
        middleList: [], //中间集
        Pie1: [], //饼状图数据
        Pie1X: [], //饼状图的分类横坐标
        line: [],
        line1X: [],
        line1Y: [],
        bar1X: [],
        bar1: [],
        bar1Y: [],
        ZYDataArray: [], //统计数据数组
        earthquakeNumber: 8401, //总计地震数
        opinionNumber: 2182349, //舆情数量
        listLoading: true,

        config1: {
          startVal: 0,
          endVal: 0, //平均数
          decimals: 0,
          prefix: "",
          suffix: "",
          separator: ",",
          duration: 5000,
        },

        config2: {
          startVal: 0,
          endVal: 0, //平均数
          decimals: 0,
          prefix: "",
          suffix: "",
          separator: ",",
          duration: 5000,
        },

        config3: {
          startVal: 0,
          endVal: 0,
          decimals: 0,
          prefix: "",
          suffix: "",
          separator: ",",
          duration: 5000,
        },
        /* config4: {
          //介绍视频
          id: "mse1",
          url: "https://cdn.jsdelivr.net/gh/ljx02263/Resources@1.7/about.m3u8",
          volume: 1,
          autoplay: false,
        },
        config5: {
          //介绍视频
          id: "mse2",
          url: "https://cdn.jsdelivr.net/gh/ljx02263/Resources@1.7/about.mp4",
          volume: 1,
          autoplay: false,
        }, */

        CYCategory: [
          {
            value: "选项1",
            label: "地震事件",
          },
          {
            value: "选项2",
            label: "台风信息",
          },
          {
            value: "选项3",
            label: "暴雨信息",
          },
          {
            value: "选项4",
            label: "疫情信息",
          },
        ],

        //访问量
        fwl: {
          tooltip: {
            trigger: "axis",
            showContent: true,
            position: function (point, params, dom, rect, size) {
              //设置提示框位置，显得合理不会不显示
              var x = 0;
              var y = 0;
              var pointX = point[0];
              var pointY = point[1];
              var boxWidth = size.contentSize[0];
              var boxHeight = size.contentSize[1];
              if (boxWidth > pointX) {
                x = 5;
              } else {
                x = pointX - boxWidth;
              }
              if (boxHeight > pointY) {
                y = 5;
              } else {
                y = pointY - boxHeight;
              }
              return [x, y];
            },
          },
          grid: {
            top: "4%",
            left: "2%",
            right: "4%",
            bottom: "0%",
            containLabel: true,
          },
          xAxis: [
            {
              type: "category",

              boundaryGap: false,
              data: [],
              axisTick: {
                alignWithLabel: true,
              },
            },
          ],
          yAxis: [
            {
              type: "value",
            },
          ],
          series: [
            {
              name: "全国各月地震灾害数量",
              type: "line",
              data: [],
              smooth: true,
              areaStyle: {},
            },
          ],
        },

        //授权数
        sqs: {
          tooltip: {
            trigger: "item",
            showContent: true,
            position: function (point, params, dom, rect, size) {
              //设置提示框位置，显得合理不会不显示
              var x = 0;
              var y = 0;
              var pointX = point[0];
              var pointY = point[1];
              var boxWidth = size.contentSize[0];
              var boxHeight = size.contentSize[1];
              if (boxWidth > pointX) {
                x = 5;
              } else {
                x = pointX - boxWidth;
              }
              if (boxHeight > pointY) {
                y = 5;
              } else {
                y = pointY - boxHeight;
              }
              return [x, y];
            },
          },
          grid: {
            top: "4%",
            left: "2%",
            right: "4%",
            bottom: "0%",
            containLabel: true,
          },
          xAxis: [
            {
              type: "category",
              /*boundaryGap: false,*/
              data: ["0时", "4时", "8时", "12时", "16时", "20时", "24时"],
              axisTick: {
                alignWithLabel: true,
              },
            },
          ],
          yAxis: [
            {
              type: "value",
            },
          ],
          series: [
            {
              name: "Weibo数",
              type: "bar",
              barWidth: "60%",
              data: [10, 52, 20, 33, 39, 33, 22],
            },
          ],
        },

        myChart1: {
          //尝试第二种 Echarts，对应饼状图
          baseOption: {
            tooltip: {
              trigger: "item",
              formatter: "{a} <br/>{b} : {c} ({d}%)",
            },

            legend: {
              data: null,
              orient: "vertical",
              x: "35px",
              y: "18px",
            },
            toolbox: {
              show: true,
              feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                magicType: {
                  show: true,
                  type: ["pie", "funnel"],
                },
                restore: { show: true },
                saveAsImage: { show: true },
              },
            },
            calculable: true,
            series: [
              {
                name: "震级分类",
                radius: "65%",
                center: ["55%", "50%"],
                type: "pie",
                data: null,
              },
            ],
          },
        },

        //柱状图
        zzt: {
          tooltip: {
            trigger: "item",
            showContent: true,
            position: function (point, params, dom, rect, size) {
              //设置提示框位置，显得合理不会不显示
              var x = 0;
              var y = 0;
              var pointX = point[0];
              var pointY = point[1];
              var boxWidth = size.contentSize[0];
              var boxHeight = size.contentSize[1];
              if (boxWidth > pointX) {
                x = 5;
              } else {
                x = pointX - boxWidth;
              }
              if (boxHeight > pointY) {
                y = 5;
              } else {
                y = pointY - boxHeight;
              }
              return [x, y];
            },
          },
          grid: {
            top: "4%",
            left: "2%",
            right: "4%",
            bottom: "0%",
            containLabel: true,
          },
          xAxis: [
            {
              type: "category",
              /*boundaryGap: false,*/
              data: null,
              axisTick: {
                alignWithLabel: true,
              },
            },
          ],
          yAxis: [
            {
              type: "value",
            },
          ],
          series: [
            {
              name: "地震舆情数",
              type: "bar",
              barWidth: "60%",
              data: [10, 52, 20, 33, 39, 33, 22],
            },
          ],
        },

        dzdt: {
          title: {
            text: "2020-2021 国内各省地震总量",
            /* sublink:
              "http://zh.wikipedia.org/wiki/%E9%A6%99%E6%B8%AF%E8%A1%8C%E6%94%BF%E5%8D%80%E5%8A%83#cite_note-12", */
          },
          tooltip: {
            trigger: "item",
            formatter: "{b}<br/>{c} (次)",
          },
          toolbox: {
            show: true,
            orient: "vertical",
            left: "right",
            top: "center",
            feature: {
              dataView: { readOnly: false },
              restore: {},
              saveAsImage: {},
            },
          },
          visualMap: {
            min: 0,
            max: 200,
            text: ["High", "Low"],
            realtime: false,
            calculable: true,
            inRange: {
              color: ["lightskyblue", "yellow", "orangered"],
            },
          },
          series: [
            {
              name: "地震数量",
              type: "map",
              zoom: 1.2,
              mapType: "china",
              label: {
                show: true,
              },
              data: null,
            },
          ],
        },

        wbdt: {
          title: {
            text: "2020-2021 国内各省舆情总量",
            /* sublink:
              "http://zh.wikipedia.org/wiki/%E9%A6%99%E6%B8%AF%E8%A1%8C%E6%94%BF%E5%8D%80%E5%8A%83#cite_note-12", */
          },
          tooltip: {
            trigger: "item",
            formatter: "{b}<br/>{c} (条)",
          },
          toolbox: {
            show: true,
            orient: "vertical",
            left: "right",
            top: "center",
            feature: {
              dataView: { readOnly: false },
              restore: {},
              saveAsImage: {},
            },
          },
          visualMap: {
            min: 500,
            max: 15000,
            text: ["High", "Low"],
            realtime: false,
            calculable: true,
            inRange: {
              color: ["lightskyblue", "yellow", "orangered"],
            },
          },
          series: [
            {
              name: "微博数量",
              type: "map",
              zoom: 1.2,
              mapType: "china",
              label: {
                show: true,
              },
              data: null,
            },
          ],
        },

        /* zyData: {
          //总计条形图
          title: {
            text: "数量统计",
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
          legend: {
            data: ["2020-2021年"],
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          xAxis: {
            type: "value",
            boundaryGap: [0, 0.01],
          },
          yAxis: {
            type: "category",
            data: ["舆情 - 新闻", "舆情 - 微博", "总舆情数", "相关舆情"],
          },
          series: [
            {
              name: "2020-2021年",
              type: "bar",
              color: "#6596df",
              data: null,
            },
          ],
        }, */

        //更新日志
        reverse: true,
        activities: [],
        noticeList: [],
        //其他信息
        userAgent: navigator.userAgent,
        //卡片图标
        iconList: [
          {
            icon: "mountain",
            title: "地震事件",
            link: "/data/index",
            color: "#ffc069",
          },
          {
            icon: "blog",
            title: "热门事件",
            link: "/data/hot",
            color: "#5cdbd3",
          },
          {
            icon: "list",
            title: "舆情信息",
            link: "/data/zuixin",
            color: "#b37feb",
          },
          {
            icon: "puzzle-piece",
            title: "地震分布",
            link: "/distribution/index",
            color: "#69c0ff",
          },
        ],
      };
    },
    created() {
      this.fetchData();
      this.fetchLineData();
      this.fetchBarData();
      this.fetchPie1Data(); //获取饼状图数据
      this.fetchZYData();

      this.fetchEarthQuakeData(); //默认先拿地震数据
      this.fetchWeiboData();
    },
    beforeDestroy() {
      clearInterval(this.timer);
    },
    mounted() {},
    methods: {
      handleClick(e) {
        this.$baseMessage(`点击了${e.name},这里可以写跳转`);
      },
      handleZrClick(e) {},
      handleChangeTheme() {
        this.$baseEventBus.$emit("theme");
      },
      async fetchData() {
        const { data } = await getChangeLog();
        data.map((item, index) => {
          if (index === data.length - 1) {
            item.color = "#0bbd87";
          }
        });
        this.activities = data;

        const res = await getNoticeList();
        this.noticeList = res.data;
        /* getRepos({
        token: "1061286824f978ea3cf98b7b8ea26fe27ba7cea1",
      }).then((res) => {
        const per_page = Math.ceil(res.data.stargazers_count / 100);
        alert(per_page);
        getStargazers({
          token: "1061286824f978ea3cf98b7b8ea26fe27ba7cea1",
          page: 1,
          per_page: res.per_page,
        }).then((res) => {
          alert(JSON.stringify(res));
        });
      }); */
      },
      async fetchLineData() {
        //获取曲线列表
        //查询赋值给折线图
        const { data } = await getLine1();
        this.line = data;
        let sumx = 0;
        for (let i = 0; i < this.line.length; i++) {
          //提取所有name值并赋值给x轴
          let a = this.line[i].name;
          this.line1X.push(a);
        }
        for (let j = 0; j < this.line.length; j++) {
          //提取所有value值并赋值给y轴
          let b = this.line[j].value;
          this.line1Y.push(b);
          sumx += this.line[j].value;
        }
        this.fwl.xAxis[0].data = this.line1X;
        this.fwl.series[0].data = this.line1Y;
        this.config1.endVal = Math.ceil(sumx / this.line.length);
      },
      async fetchBarData() {
        //获取条形图数据
        const { data } = await getBar1();
        this.bar1 = data;
        let sumb = 0;
        for (let i = 0; i < this.bar1.length; i++) {
          //提取所有name值并赋值给x轴
          let a = this.bar1[i].name;
          let b = this.bar1[i].value;
          this.bar1X.push(a);
          this.bar1Y.push(b);

          sumb += this.bar1[i].value;
        }
        this.config2.endVal = Math.ceil(sumb / this.bar1.length);
        this.zzt.xAxis[0].data = this.bar1X;
        this.zzt.series[0].data = this.bar1Y;
      },
      async fetchPie1Data() {
        //获取饼状图数据
        const { data } = await getPie1();
        this.Pie1 = data;
        this.myChart1.baseOption.series[0].data = data;
        let sum = 0;
        for (let i = 0; i < this.Pie1.length; i++) {
          //将纵坐标放进数组展示
          this.Pie1X.push(this.Pie1[i].name);
          sum += this.Pie1[i].value;
        }
        this.myChart1.baseOption.legend.data = this.Pie1X;

        this.config3.endVal = Math.round(
          (this.Pie1[0].value * 3 +
            this.Pie1[1].value * 4.5 +
            this.Pie1[2].value * 6 +
            this.Pie1[3].value * 7) /
            sum
        );
      },
      async fetchZYData() {
        //获取zydata以及对应条形图数据的方法
        const res = await getBar2();
        this.earthquakeNumber = res.data.countEvent;
        this.opinionNumber = res.data.countTotal;
      },

      async fetchWeiboData() {
        //获取微博地图数据
        this.listLoading = true;
        const { data } = await getWeiboData();
        this.wbdt.series[0].data = data;
        setTimeout(() => {
          this.listLoading = false;
        }, 300);
      },

      async fetchEarthQuakeData() {
        //获取地震地图数据
        this.listLoading = true;
        const { data } = await getEarthQuakeData();
        this.dzdt.series[0].data = data;
        setTimeout(() => {
          this.listLoading = false;
        }, 300);
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
