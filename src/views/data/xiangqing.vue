<template>
  <div class="index-container">
    <el-row :gutter="20">
      <el-card shadow="never">
        <span style="font-weight: 600">地震事件地址：</span>
        <router-link
          :to="{
            name: 'dizhi',
            params: {
              province: province,
            },
          }"
        >
          <el-tag type="danger" size="big">省份： {{ province }}</el-tag>
        </router-link>
        -
        <router-link
          :to="{
            name: 'dizhi',
            params: {
              province: province,
              city: city,
            },
          }"
        >
          <el-tag v-show="city != null" type="success" size="big">
            地级市： {{ city }}
          </el-tag>
        </router-link>
        -
        <el-tag v-show="area != null" type="info" size="big">
          县区： {{ area }}
        </el-tag>
      </el-card>

      <el-col :xs="24" :sm="24" :md="12" :lg="14" :xl="16">
        <el-card shadow="hover">
          <div slot="header">
            <span style="font-weight: 400">热度 - 主题河流</span>
          </div>
          <div style="height: 400px">
            <vab-chart
              :autoresize="true"
              theme="vab-echarts-theme"
              :options="themeRiver"
            />
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="10" :xl="8">
        <el-card shadow="hover">
          <div slot="header">
            <span style="font-weight: 400">
              词云数量:
              <vab-count
                :start-val="config3.startVal"
                :end-val="config3.endVal"
                :duration="config3.duration"
                :separator="config3.separator"
                :prefix="config3.prefix"
                :suffix="config3.suffix"
                :decimals="config3.decimals"
              />
            </span>
            <div class="cyClass">
              <!--选择对应的词云类型-->
              <el-select
                v-model="value"
                placeholder="词云类型"
                @change="changeCY"
              >
                <el-option
                  v-for="item in CYCategory"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
                ></el-option>
              </el-select>
            </div>
          </div>

          <vab-chart
            :autoresize="true"
            theme="vab-echarts-theme"
            :options="cy"
            @click="handleClick"
          />
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="11" :xl="12">
        <el-card class="card" shadow="hover">
          <div slot="header">
            <el-tag type="danger">微博总数：{{ WeiboNumber }}</el-tag>
            <el-tag type="warning">新闻总数：{{ NewsNumber }}</el-tag>
            <el-tag type="success">统计用户数：{{ NewsNumber }}</el-tag>
          </div>
          <vab-chart
            :autoresize="true"
            theme="vab-echarts-theme"
            :options="piePicture"
          />
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="24" :md="12" :lg="13" :xl="12">
        <el-card class="card" shadow="hover">
          <div slot="header">
            <span>地震灾害统计地图</span>
          </div>
          <vab-chart
            :autoresize="true"
            theme="vab-echarts-theme"
            :options="zgdt"
          />
        </el-card>
      </el-col>

      <el-card v-show="ifShow" class="relationalCard" shadow="hover">
        <div slot="header">关系图</div>
        <div>
          <vab-chart
            ref="myLine1"
            theme="vab-echarts-theme"
            autoresize
            :options="chart3"
          />
        </div>
      </el-card>

      <el-card class="card" shadow="hover">
        <div slot="header">
          <span style="font-weight: 400">事件脉络</span>
        </div>

        <vue-horizontal-timeline
          :items="items"
          :clickable="true"
          :autoresize="true"
          @click="timeLineClick"
        />
      </el-card>

      <div class="table-container">
        <el-col :span="24">
          <vab-query-form>
            <vab-query-form-left-panel>
              <el-button
                type="success"
                size="medium"
                plain
                @click="fetchWBData"
              >
                数据来源：微博
              </el-button>
              <el-button
                type="danger"
                size="medium"
                plain
                @click="fetchNewsData"
              >
                数据来源：新闻
              </el-button>
            </vab-query-form-left-panel>
          </vab-query-form>
        </el-col>
        <el-col
          v-for="(item, index) in list"
          :key="index"
          :xs="24"
          :sm="24"
          :md="24"
          :lg="24"
          :xl="24"
        >
          <el-card shadow="hover">
            <div slot="header">
              <!-- <el-tag :type="labelTagClass(item.label)">
                -相关程度-: {{ labelClass(item.label) }}
              </el-tag> -->
              <el-tag type="info">-发表时间-: {{ item.post_time }}</el-tag>
              <el-tag v-show="item.comment_num != null">
                -评论数-: {{ item.comment_num }}
              </el-tag>
              <el-tag v-show="item.forward_num != null" type="warning">
                -转发量-: {{ item.forward_num }}
              </el-tag>
              <el-tag v-show="item.like_num != null" type="danger">
                -点赞量-: {{ item.like_num }}
              </el-tag>
              <el-tag :type="mediaClass(item.media)">
                -数据来源-: {{ typeClass(item.media) }}
              </el-tag>
            </div>
            <div class="gray">
              <h3 v-show="item.user_name != null || item.title != null">
                {{ item.user_name }} : {{ item.title }}
              </h3>
              <!-- 判断div的样式 -->

              <!-- <router-link :to="'/distribution/test' + scope.row.post_content"> -->
              <a target="_blank" :href="item.post_url">
                {{ item.post_content }}
              </a>
            </div>
            <!-- <div style="width: 100%; height: 200px"> 原来这里放图片的
            <vab-image
              :big-src="item.img"
              :percent="item.percent"
              :small-src="item.smallImg"
              @clickBig="bigClick(item)"
              @clickSmall="smallClick(item)"
            ></vab-image>
          </div> -->
          </el-card>
        </el-col>
      </div>
    </el-row>
    <el-pagination
      :background="background"
      :current-page="queryForm.pageNo"
      :layout="layout"
      :page-size="queryForm.pageSize"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    ></el-pagination>
  </div>
</template>

<script>
  //默认长度：xs:24, sm:8, md:8, lg:8, xl:4
  import {
    getDefault, //基本数据
    getDefaultCY, //词云数据
    getDefaultHeat, //热度曲线
    getDefaultBasic, //基础饼图数据
  } from "@/api/table";
  import axios from "axios";
  import VabChart from "@/plugins/echarts";
  import { VueHorizontalTimeline } from "vue-horizontal-timeline";

  export default {
    name: "Card",
    components: {
      VabChart,
    },
    data() {
      return {
        lineX: [],
        lineY: [],
        Pie1X: [],
        Pie1: [],
        province: null,
        city: null,
        area: null,

        number: null, //用来判断事件

        cyLength: null,
        currentDate: new Date(),
        list: null,
        dataList: [],
        weiboPie: [],
        xinwenPie: [],
        userPie: [],

        WeiboNumber: "微博数量",
        NewsNumber: "新闻数量",
        UserNumber: "用户数量",

        listLoading: true,
        ifShow: false, //先不显示，避免链接失败：知识图谱存在性判断
        layout: "total, sizes, prev, pager, next, jumper",
        total: 0,
        background: true,
        height: 0,
        elementLoadingText: "正在加载...",
        dialogFormVisible: false,
        queryForm: {
          pageNo: 1,
          pageSize: 20,
        },
        config3: {
          startVal: 0,
          endVal: null,
          decimals: 0,
          prefix: "",
          suffix: "",
          separator: ",",
          duration: 8000,
        },
        CYCategory: [
          {
            value: "选项1",
            label: "热度云",
          },
          {
            value: "选项2",
            label: "话题云",
          },
        ],
        value: "",
        items: [
          //添加历史事件 - 事件线的数组
        ],
        color: function (number) {
          //判断是否需要加重显示的样式
          if (number >= 30) {
            return "gray";
          } else {
            return "gray";
          }
        },
        mediaClass: function (number) {
          if (number == 1) {
            return "success";
          } else {
            return "danger";
          }
        },
        typeClass: function (number) {
          if (number == 1) {
            return "微博";
          } else {
            return "新闻";
          }
        },
        labelClass: function (number) {
          if (number == 1) {
            return "相关";
          } else {
            return "不相关";
          }
        },
        labelTagClass: function (number) {
          if (number == 1) {
            return "success";
          } else {
            return "info";
          }
        },
        //词云
        cy: {
          grid: {
            top: "4%",
            left: "2%",
            right: "4%",
            bottom: "0%",
          },
          series: [
            {
              type: "wordCloud",
              gridSize: 15,
              sizeRange: [14, 40],
              rotationRange: [0, 0],
              width: "100%",
              height: "100%",
              textStyle: {
                normal: {
                  color() {
                    const arr = [
                      "#1890FF",
                      "#36CBCB",
                      "#4ECB73",
                      "#FBD437",
                      "#F2637B",
                      "#975FE5",
                    ];
                    let index = Math.floor(Math.random() * arr.length);
                    return arr[index];
                  },
                },
              },
              data: [],
            },
          ],
        },
        piePicture: {
          //饼状图信息
          tooltip: {
            trigger: "item",
          },
          legend: {
            data: null,
            orient: "horizontal",
          },

          series: [
            {
              name: "微博数据",
              type: "pie", // 设置图表类型为饼图
              roseType: "area",
              radius: "30%", // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
              center: ["28%", "40%"],
              dataRange: null,
              data: [
                //这里是地图饼状图的数据
              ],
              itemStyle: {
                normal: {
                  borderWidth: "2",
                  borderColor: "#FFF",
                }, //给饼图每一块之间加个白色分割线
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                },
              },
            },
            {
              name: "新闻数据",
              type: "pie", // 设置图表类型为饼图
              roseType: "area",
              radius: "30%", // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
              center: ["50%", "80%"],
              dataRange: null,
              data: [
                //这里是地图饼状图的数据
              ],
              itemStyle: {
                normal: {
                  borderWidth: "2",
                  borderColor: "#FFF",
                }, //给饼图每一块之间加个白色分割线
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                },
              },
            },
            {
              name: "用户数据",
              type: "pie", // 设置图表类型为饼图
              roseType: "area",
              radius: "30%", // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
              center: ["73%", "50%"],
              dataRange: null,
              data: [
                //这里是地图饼状图的数据
              ],
              itemStyle: {
                normal: {
                  borderWidth: "2",
                  borderColor: "#FFF",
                }, //给饼图每一块之间加个白色分割线
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                },
              },
            },
          ],
        },

        zgdt: {
          //地图分布

          title: {
            text: "地震微博来由分布",
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
            min: 0,
            max: 20,
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
              zoom: 1.1,
              mapType: "china",
              mapType: "china",
              layoutCenter: ["60%", "50%"], //距离左右，上下距离的百分比
              layoutSize: "110%", //map百分比大小

              label: {
                show: true,
              },
              data: null,
            },
          ],
        },

        heatMap: {
          //热度表
          legend: {},
          tooltip: {
            trigger: "axis",
            showContent: true,
          },
          dataset: {},
          xAxis: [{ type: "category", gridIndex: 0, data: [] }],
          yAxis: [{ gridIndex: 0 }], //max:对应最大的坐标值
          grid: [{ bottom: "10%" }, { top: "55%" }],
          series: [
            {
              type: "line",
              smooth: true,
              seriesLayoutBy: "row",
              name: "事件热度",
              data: [7.2, 2.4, 0.2, 1.6, 2.8, 9.4, 2.2, 6.7, 2.2, 3.4, 1.0],
              xAxisIndex: 0,
              yAxisIndex: 0,
            },
            /* {
              type: "line",
              smooth: true,
              seriesLayoutBy: "row",
              name: "线性对比热度1",
              data: [
                71.2,
                22.4,
                9.2,
                11.6,
                29.8,
                90.4,
                20.2,
                62.7,
                28.2,
                37.4,
                16.0,
              ],
              xAxisIndex: 0,
              yAxisIndex: 0,
            }, */
            /* {
              type: "line",
              smooth: true,
              seriesLayoutBy: "row",
              name: "线性对比热度2",
              data: [24.1, 67.2, 79.5, 86.4, 65.2, 82.5, 22.3, 24.3, 11.2, 0],
              xAxisIndex: 0,
              yAxisIndex: 0,
            }, */
            /*  {
              type: "line",
              smooth: true,
              seriesLayoutBy: "row",
              name: "线性对比热度3",
              data: [56.1, 34.1, 98.2, 39.1, 55.6, 74.7, 90.8, 29.4, 38.1],
              xAxisIndex: 0,
              yAxisIndex: 0,
            }, */
            /* { type: "bar", xAxisIndex: 1, yAxisIndex: 1 },
            { type: "bar", xAxisIndex: 1, yAxisIndex: 1 },
            { type: "bar", xAxisIndex: 1, yAxisIndex: 1 },
            { type: "bar", xAxisIndex: 1, yAxisIndex: 1 },
            { type: "bar", xAxisIndex: 1, yAxisIndex: 1 },
            { type: "bar", xAxisIndex: 1, yAxisIndex: 1 },
            { type: "bar", xAxisIndex: 1, yAxisIndex: 1 }, */
            /* {
              type: "bar",
              color: "peru",
              data: [20, 30, 40, 50, 60],
              barWidth: 40, //控制条宽度
              itemStyle: {
                normal: {
                  label: {
                    show: true, //开启显示
                    position: "top", //在上方显示
                    textStyle: {
                      //数值样式
                      color: "peru",
                      fontSize: 14,
                      fontWeight: 450,
                    },
                  },
                },
              },

              xAxisIndex: 1,
              yAxisIndex: 1,
            }, */

            /* {
              type: "pie",
              id: "pie",
              radius: "30%",
              center: ["50%", "25%"],
              label: {
                formatter: "{b}: {@2012} ({d}%)",
              },
              encode: {
                itemName: "product",
                value: "2012",
                tooltip: "2012",
              },
            }, */
          ],
        },
        themeRiver: {
          //主题河流
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "line",
              lineStyle: {
                color: "rgba(0,0,0,0.2)",
                width: 1,
                type: "solid",
              },
            },
          },

          legend: {
            data: ["DQ", "TY", "SS", "QG"],
          },

          singleAxis: {
            top: 50,
            bottom: 50,
            axisTick: {},
            axisLabel: {},
            type: "time",
            axisPointer: {
              animation: true,
              label: {
                show: true,
              },
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: "dashed",
                opacity: 0.2,
              },
            },
          },

          series: [
            {
              type: "themeRiver",
              emphasis: {
                itemStyle: {
                  shadowBlur: 20,
                  shadowColor: "rgba(0, 0, 0, 0.8)",
                },
              },
              data: null,
            },
          ],
        },
        chart3: {
          //可以转换成为知识图谱
          series: [
            {
              type: "graph",
              layout: "force",
              symbolSize: 60,
              zoom: 0.45,
              draggable: true,
              roam: true,
              categories: [
                {
                  name: "地震",
                  itemStyle: {
                    color: "#006acc",
                  },
                },
                {
                  name: "时间",
                  itemStyle: {
                    color: "#ff7d18",
                  },
                },
              ],
              edgeSymbol: ["", "arrow"],
              edgeLabel: {
                normal: {
                  show: true,
                  textStyle: {
                    fontSize: 18,
                  },
                  formatter(x) {
                    return x.data.name;
                  },
                },
              },
              label: {
                show: true,
              },
              force: {
                repulsion: 2000,
                edgeLength: 150,
              },
              data: null,
              links: null,
            },
          ],
        },
      };
    },
    created() {
      this.number = this.$route.params.number;

      this.fetchBasic();
      this.fetchWBData();
      this.fetchCY();

      /* this.fetchHeat(); */
      this.fetchThemeRiver();
      this.fetchDistribution();
      this.fetchTimeLine();
      this.fetchKMData(); //

      this.height = this.$baseTableHeight(1);
    },
    mounted() {},
    methods: {
      openVn() {
        const h = this.$createElement;
        this.$message({
          message: h("p", null, [
            h("span", null, "此为 "),
            h("i", { style: "color: teal" }, "最新地震地址，"),
            h("span", null, "其他地址请手动跳转 "),
          ]),
        });
      },
      changeCY(value) {
        //搜索高可信度或低可信度
        const Loading = this.$baseLoading();
        if (value == "热度云") {
          //热度云
          this.fetchCY();
          setTimeout(() => {
            Loading.close();
          }, 500);
        } else if (value == "话题云") {
          //话题云
          this.fetchHTCY();
          setTimeout(() => {
            Loading.close();
          }, 500);
        }
      },
      handleClick(e) {
        this.$baseMessage(`请稍等，正在为您在微博搜索: ${e.name}`);
        setTimeout(() => {
          let new_window = window.open("", "_blank")
          new_window.location.href =
            "https://s.weibo.com/weibo?q=" +
            e.name +
            "&wvr=6&b=1&Refer=SWeibo_box";
        }, 900);
      },

      timeLineClick(e) {
        this.$baseMessage(`请稍等，正在为您在微博搜索`);
        setTimeout(() => {
          window.open("https://www.baidu.com", "_blank")
        }, 900);
        //点击事件线
        // this.$baseMessage(`请稍等，正在为您搜索对应事件内容`);

        // setTimeout(() => {
        //   this.number = e.number;

        //   this.fetchBasic();
        //   this.fetchWBData();
        //   this.fetchCY();

        //   this.fetchHeat();
        //   this.fetchDistribution();
        //   this.fetchTimeLine();
        //   this.height = this.$baseTableHeight(0);

        //   this.$baseMessage(`已为您更新所有数据块内容`);
        // }, 600);
      },

      handleSizeChange(val) {
        this.queryForm.pageSize = val;
        this.initData();
      },
      handleCurrentChange(val) {
        this.queryForm.pageNo = val;
        this.initData();
      },
      async fetchWBData() {
        const Loading = this.$baseLoading();
        /* const { data, totalCount } = await getDefault({}); */
        if (this.number == null) {
          axios
            .get(
              "http://49.232.229.126:8000/earthquake_microcosmic/list1?media=1"
            )
            .then((res) => {
              this.dataList = res.data.data;
              this.total = res.data.totalCount;
              this.openVn();

              this.initData();
              setTimeout(() => {
                Loading.close();
              }, 500);
            });
        } else {
          axios
            .get(
              "http://49.232.229.126:8000/earthquake_microcosmic/list1?media=1&number=" +
                this.number
            )
            .then((res) => {
              this.dataList = res.data.data;
              this.total = res.data.totalCount;

              this.initData();
              setTimeout(() => {
                Loading.close();
              }, 500);
            });
        }
      },
      async fetchNewsData() {
        const Loading = this.$baseLoading();
        /* const { data, totalCount } = await getDefault({}); */
        if (this.number == null) {
          axios
            .get(
              "http://49.232.229.126:8000/earthquake_microcosmic/list1?media=2"
            )
            .then((res) => {
              this.dataList = res.data.data;
              this.total = res.data.totalCount;
              this.openVn();

              this.initData();
              setTimeout(() => {
                Loading.close();
              }, 500);
            });
        } else {
          axios
            .get(
              "http://49.232.229.126:8000/earthquake_microcosmic/list1?media=2&number=" +
                this.number
            )
            .then((res) => {
              this.dataList = res.data.data;
              this.total = res.data.totalCount;

              this.initData();
              setTimeout(() => {
                Loading.close();
              }, 500);
            });
        }
      },
      async initData() {
        //处理数据
        //大神给的改写翻页和查询的方法
        const Loading = this.$baseLoading();
        let no = (this.queryForm.pageNo - 1) * this.queryForm.pageSize;
        let size = this.queryForm.pageNo * this.queryForm.pageSize;
        this.list = this.dataList.slice(no, size);
        setTimeout(() => {
          Loading.close();
        }, 500);
      },
      async fetchCY() {
        //获取对应词云
        if (this.number == null) {
          axios
            .get("http://49.232.229.126:8000/earthquake_microcosmic/wordcloud1")
            .then((res) => {
              this.cy.series[0].data = res.data.data;
              this.config3.endVal = res.data.data.length;
            });
        } else {
          axios
            .get(
              "http://49.232.229.126:8000/earthquake_microcosmic/wordcloud1?number=" +
                this.number
            )
            .then((res) => {
              this.cy.series[0].data = res.data.data;
              this.config3.endVal = res.data.data.length;
            });
        }
      },
      async fetchDistribution() {
        //获取对应微博分布
        if (this.number == null) {
          axios
            .get("http://49.232.229.126:8000/earthquake_microcosmic/postlocmap1")
            .then((res) => {
              this.zgdt.series[0].data = res.data.data;
            });
        } else {
          axios
            .get(
              "http://49.232.229.126:8000/earthquake_microcosmic/postlocmap1?number=" +
                this.number
            )
            .then((res) => {
              this.zgdt.series[0].data = res.data.data;
            });
        }
      },
      async fetchHTCY() {
        //获取对应词云
        if (this.number == null) {
          axios
            .get("http://49.232.229.126:8000/earthquake_microcosmic/topiccloud1")
            .then((res) => {
              this.cy.series[0].data = res.data.data;
              this.config3.endVal = res.data.data.length;
            });
        } else {
          axios
            .get(
              "http://49.232.229.126:8000/earthquake_microcosmic/topiccloud1?number=" +
                this.number
            )
            .then((res) => {
              this.cy.series[0].data = res.data.data;
              this.config3.endVal = res.data.data.length;
            });
        }
      },

      async fetchHeat() {
        //获取热度曲线
        if (this.number == null) {
          axios
            .get("http://49.232.229.126:8000/earthquake_microcosmic/heattrend1")
            .then((res) => {
              for (let i = 0; i < res.data.data.length; i++) {
                this.lineX.push(res.data.data[i].time);
                this.lineY.push(res.data.data[i].heatCount);
              }
              this.heatMap.xAxis[0].data = this.lineX;
              this.heatMap.series[0].data = this.lineY;
            });
        } else {
          axios
            .get(
              "http://49.232.229.126:8000/earthquake_microcosmic/heattrend1?number=" +
                this.number
            )
            .then((res) => {
              for (let i = 0; i < res.data.data.length; i++) {
                this.lineX.push(res.data.data[i].time);
                this.lineY.push(res.data.data[i].heatCount);
              }
              this.heatMap.xAxis[0].data = this.lineX;
              this.heatMap.series[0].data = this.lineY;
            });
        }
      },

      async fetchThemeRiver() {
        //获取主题河热
        if (this.number == null) {
          axios
            .get("http://49.232.229.126:8000/earthquake_microcosmic/heattrend1")
            .then((res) => {
              var list = [];
              var compare1 = [];
              var compare2 = [];
              var listArray = [];
              for (let i = 0; i < res.data.data.length; i++) {
                list[i] = [
                  res.data.data[i].time,
                  res.data.data[i].heatCount,
                  "ThemeHeat",
                ];
                /* compare1[i] = [
                  res.data.data[i].time,
                  Math.random(),
                  "CompareTheme1",
                ];
                compare2[i] = [
                  res.data.data[i].time,
                  Math.random(),
                  "CompareTheme2",
                ]; */
              }
              /* listArray = list.concat(compare1, compare2); */
              this.themeRiver.series[0].data = list;
            });
        } else {
          axios
            .get(
              "http://49.232.229.126:8000/earthquake_microcosmic/heattrend1?number=" +
                this.number
            )
            .then((res) => {
              var list = [];
              var compare1 = [];
              var compare2 = [];
              var listArray = [];
              for (let i = 0; i < res.data.data.length; i++) {
                list[i] = [
                  res.data.data[i].time,
                  res.data.data[i].heatCount,
                  "ThemeHeat",
                ];
                /* compare1[i] = [
                  res.data.data[i].time,
                  Math.random(),
                  "CompareTheme1",
                ];
                compare2[i] = [
                  res.data.data[i].time,
                  Math.random(),
                  "CompareTheme2",
                ]; */
              }
              /* listArray = list.concat(compare1, compare2); */
              this.themeRiver.series[0].data = list;
            });
        }
      },

      async fetchTimeLine() {
        if (this.number == null) {
          axios
            .get("http://49.232.229.126:8000/earthquake_microcosmic/list2")
            .then((res) => {
              var timeLine = [];
              for (let i = 0; i < res.data.data.length; i++) {
                timeLine.push({
                  title:
                    res.data.data[i].province +
                    res.data.data[i].city +
                    res.data.data[i].area,
                  content:
                    // res.data.data[i].time + " 发生: " + 
                    res.data.data[i].info,
                  number: res.data.data[i].number, //放number数组
                  href: "www.baidu.com",
                });
              }
              this.items = timeLine;
            });
        } else {
          axios
            .get(
              "http://49.232.229.126:8000/earthquake_microcosmic/list2?number=" +
                this.number
            )
            .then((res) => {
              var timeLine = [];
              for (let i = 0; i < res.data.data.length; i++) {
                timeLine.push({
                  title:
                    res.data.data[i].province +
                    res.data.data[i].city +
                    res.data.data[i].area,
                  content:
                    // res.data.data[i].time + " 发生: " + 
                    res.data.data[i].info,
                  number: res.data.data[i].number, //放number数组
                  href: "www.baidu.com",
                });
              }
              this.items = timeLine;
            });
        }


        //构建事件线信息
        // if (this.number == null) {
        //   axios
        //     .get("http://49.232.229.126:8000/earthquake_microcosmic/list2")
        //     .then((res) => {
        //       var timeLine = [];
        //       for (let i = 0; i < res.data.data.length; i++) {
        //         timeLine.push({
        //           title:
        //             res.data.data[i].province +
        //             res.data.data[i].city +
        //             res.data.data[i].area,
        //           content:
        //             res.data.data[i].time + " 发生: " + res.data.data[i].info,
        //           number: res.data.data[i].number, //放number数组
        //           href: "http://49.232.229.126:8000/earthquake_microcosmic/list2",
        //         });
        //       }
        //       this.items = timeLine;
        //     });
        // } else {
        //   axios
        //     .get(
        //       "http://49.232.229.126:8000/earthquake_microcosmic/list2?number=" +
        //         this.number
        //     )
        //     .then((res) => {
        //       var timeLine = [];
        //       for (let i = 0; i < res.data.data.length; i++) {
        //         timeLine.push({
        //           title:
        //             res.data.data[i].province +
        //             res.data.data[i].city +
        //             res.data.data[i].area,
        //           content:
        //             res.data.data[i].time + " 发生: " + res.data.data[i].info,
        //           number: res.data.data[i].number, //放number数组
        //           href: "http://49.232.229.126:8000/earthquake_microcosmic/list2",
        //         });
        //       }
        //       this.items = timeLine;
        //     });
        // }
      },
      async fetchBasic() {
        //基础信息
        if (this.number == null) {
          axios
            .get(
              "http://49.232.229.126:8000/earthquake_microcosmic/basestatistics1" //如果没有Number就是默认最新
            )
            .then((res) => {
              this.weiboPie.push({
                value: res.data.data.mediaCount,
                name: "新闻媒体数",
              });

              this.weiboPie.push({
                value: res.data.data.originalCount,
                name: "原创微博数",
              });
              this.weiboPie.push({
                value: res.data.data.forwardCount,
                name: "转发量",
              });
              this.userPie.push({
                value: res.data.data.authorityCount,
                name: "认证用户数",
              });
              this.userPie.push({
                value: res.data.data.userCount - res.data.data.authorityCount,
                name: "普通用户数",
              });
              this.UserNumber = res.data.data.userCount;

              this.xinwenPie.push({
                value: res.data.data.xinwenCount,
                name: "新闻数",
              });
              this.NewsNumber = res.data.data.xinwenCount;

              this.xinwenPie.push({
                value: res.data.data.weiboCount,
                name: "微博总数",
              });
              this.WeiboNumber = res.data.data.weiboCount;

              this.piePicture.series[0].data = this.weiboPie;
              this.piePicture.series[1].data = this.xinwenPie;
              this.piePicture.series[2].data = this.userPie;
              this.province = res.data.data.province;
              this.city = res.data.data.city;
              this.area = res.data.data.area;
              this.weiboPie = [];
              this.xinwenPie = [];
              this.userPie = [];
            });
        } else {
          axios
            .get(
              "http://49.232.229.126:8000/earthquake_microcosmic/basestatistics1?number=" +
                this.number
            )
            .then((res) => {
              this.weiboPie.push({
                value: res.data.data.mediaCount,
                name: "新闻媒体数",
              });

              this.weiboPie.push({
                value: res.data.data.originalCount,
                name: "原创微博数",
              });
              this.weiboPie.push({
                value: res.data.data.forwardCount,
                name: "转发量",
              });
              this.userPie.push({
                value: res.data.data.authorityCount,
                name: "认证用户数",
              });
              this.userPie.push({
                value: res.data.data.userCount - res.data.data.authorityCount,
                name: "普通用户数",
              });
              this.UserNumber = res.data.data.userCount;

              this.xinwenPie.push({
                value: res.data.data.xinwenCount,
                name: "新闻数",
              });
              this.NewsNumber = res.data.data.xinwenCount;
              this.xinwenPie.push({
                value: res.data.data.weiboCount,
                name: "微博总数",
              });
              this.WeiboNumber = res.data.data.weiboCount;

              this.piePicture.series[0].data = this.weiboPie;
              this.piePicture.series[1].data = this.xinwenPie;
              this.piePicture.series[2].data = this.userPie;
              this.province = res.data.data.province;
              this.city = res.data.data.city;
              this.area = res.data.data.area;
              this.weiboPie = [];
              this.xinwenPie = [];
              this.userPie = [];
            });
        }
      },
      async fetchKMData() {
        //获取知识图谱数据
        if (this.number == null) {
          axios
            .get("http://49.232.229.126:8000/earthquake_microcosmic/entitymatch")
            .then((res) => {
              if (res.data.code == 200) {
                this.ifShow = true;
                this.chart3.series[0].data = res.data.data.node;
                this.chart3.series[0].links = res.data.data.links;
              } else {
                this.ifShow = false;
              }
            });
        } else {
          axios
            .get(
              "http://49.232.229.126:8000/earthquake_microcosmic/entitymatch?number=" +
                this.number
            )
            .then((res) => {
              if (res.data.code == 200) {
                this.ifShow = true;
                this.chart3.series[0].data = res.data.data.node;
                this.chart3.series[0].links = res.data.data.links;
              } else {
                this.ifShow = false;
              }
            });
        }
      },
    },
  };
</script>
<style lang="scss" scoped>
  .comment {
    //控制评论数样式
    color: blue;
    font-weight: bold;
  }
  .like {
    //控制喜爱量样式
    color: peru;
    font-weight: bold;
  }
  .forward {
    //控制转发量样式
    color: rgb(192, 63, 192);
    font-weight: bold;
  }
  .from {
    //控制转发量样式
    color: rgb(163, 238, 188);
    font-weight: bold;
  }
  .time {
    //控制发送时间样式
    color: rgb(78, 77, 77);
    font-weight: bold;
  }
  .red {
    //控制发送时间样式
    color: red;
    font-weight: 500;
  }
  .gray {
    color: gray;
    font-weight: 500;
    height: 100px;
    overflow: auto;
  }

  .el-row {
    display: flex;
    flex-wrap: wrap;
  }
  .el-card {
    min-width: 100%;
    height: 94%;
  }
  .cyClass {
    float: right;
    width: 106px;
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
        //控制E-charts的样式的图表
        .echarts {
          width: 100%;
          height: 400px;
        }
      }
    }

    .card {
      min-height: 400px;

      ::v-deep {
        .el-card__body {
          .echarts {
            width: 100%;
            height: 305px;
          }
        }
      }
    }

    .relationalCard {
      min-height: 400px;

      ::v-deep {
        .el-card__body {
          .echarts {
            width: 100%;
            height: 500px;
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
          background-color: #f7f7f7; //#f7f7f7
        }
      }
    }

    .icon-panel {
      height: 100px;
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
        margin: 5px 10px 15px 0;
      }
    }
  }
  @import url("https://cdn.staticfile.org/echarts/4.3.0/echarts.min.js");
  @import url("https://cdn.staticfile.org/jquery/2.2.4/jquery.min.js");
</style>
