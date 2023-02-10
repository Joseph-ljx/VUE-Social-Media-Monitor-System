<template>
  <div class="echarts-container">
    <!-- <div class="echarts-container">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="8">
          <el-card shadow="hover">
            <div slot="header">柱状图</div>
            <div>
              <vab-chart autoresize :options="chart1" />
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div> -->

    <!--这里开始表格-->
    <div class="table container">
      <vab-query-form>
        <vab-query-form-left-panel>
          <el-tabs
            v-model="activeName"
            type="card"
            :tab-position="tabPosition"
            @tab-click="handleClickTab"
          >
            <el-tab-pane
              label="最新地震微博舆情"
              name="最新地震微博舆情"
            ></el-tab-pane>
            <el-tab-pane
              label="最新地震新闻舆情"
              name="最新地震新闻舆情"
            ></el-tab-pane>
          </el-tabs>
        </vab-query-form-left-panel>

        <vab-query-form-right-panel>
          <!--选择对应的相关程度-->
          <el-select
            v-model="value"
            placeholder="相关浏览选择"
            @change="currentState"
          >
            <el-option
              v-for="item in reliability"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </vab-query-form-right-panel>
      </vab-query-form>

      <el-table
        v-loading="listLoading"
        :data="list"
        :element-loading-text="elementLoadingText"
        @selection-change="setSelectRows"
      >
        <el-table-column
          show-overflow-tooltip
          label="用户信息"
          prop="user_name"
          width="200"
          align="center"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="相关程度"
          width="130"
          align="center"
        >
          <template slot-scope="scope">
            <el-tooltip
              :content="scope.row.label | relevanceFilter"
              class="item"
              effect="dark"
              placement="top-start"
            >
              <el-tag :type="scope.row.label | relevanceTagFilter">
                {{ scope.row.label | relevanceFilter }}
              </el-tag>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          label="发表日期"
          prop="post_time"
          width="165"
        ></el-table-column>
        <el-table-column
          v-if="showWB"
          label="评论数"
          prop="comment_num"
          width="90"
          sortable
        ></el-table-column>
        <el-table-column
          v-if="showWB"
          label="转发数"
          prop="forward_num"
          width="90"
          sortable
        ></el-table-column>
        <el-table-column
          v-if="showWB"
          label="点赞数"
          prop="like_num"
          width="90"
          sortable
        ></el-table-column>

        <!--时间-->

        <el-table-column
          v-if="showNews"
          label="标题"
          prop="title"
          width="250"
          sortable
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="post_content"
          label="事件简介"
        >
          <template slot-scope="scope">
            <!-- <router-link :to="'/distribution/test' + scope.row.post_content"> -->
            <a target="_blank" :href="scope.row.post_url" @click="handleClick">
              {{ scope.row.post_content }}
            </a>
          </template>
        </el-table-column>
      </el-table>
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
  </div>
</template>

<script>
  import * as echarts from "echarts";
  import VabChart from "@/plugins/echarts";
  import { getWeiBo, getNews } from "@/api/hongGuan";

  export default {
    name: "Echarts",
    components: {
      /* VabChart, */
    },
    filters: {
      relevanceFilter(relevance) {
        //展示Label的样式
        const relevanceMap = {
          1: "相关",
          0: "不相关",
        };
        return relevanceMap[relevance];
      },
      relevanceTagFilter(relevance) {
        //展示Label的样式
        const relevanceTagMap = {
          1: "success",
          0: "info",
        };
        return relevanceTagMap[relevance];
      },
    },
    data() {
      return {
        tabPosition: "top",
        activeName: "最新地震事件",
        showWB: null,
        showNews: null,
        Pie1: [],
        Pie1X: [], //饼状图的分类横坐标
        dataList: [], //原始数据
        list: [], //呈现数据
        listLoading: true,
        layout: "total, sizes, prev, pager, next, jumper",
        total: 0,
        background: true,
        selectRows: "",
        elementLoadingText: "正在加载...",

        value: "", //是否相关选择框

        reliability: [
          {
            value: "选项1",
            label: "默认",
          },
          {
            value: "选项2",
            label: "只看相关",
          },
          {
            value: "选项3",
            label: "只看不相关",
          },
        ],

        queryForm: {
          pageNo: 1,
          pageSize: 20,
        },
        myChart: {
          //尝试echarts：简单的饼图
          series: [
            {
              name: "访问来源",
              type: "pie",
              radius: "55%",
              roseType: "angle",
              data: null,
            },
          ],
        },

        chart1: {
          //左侧柱状图
          grid: {
            top: "25%",
            bottom: "10%",
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
              label: {
                show: true,
              },
            },
          },
          legend: {
            data: ["待接入3", "待接入4"],
          },
          xAxis: {
            data: ["a", "b", "c", "d", "e", "f", "g", "h"],
            axisLine: {
              show: true, //X轴轴线
            },
            axisTick: {
              show: true, //X轴刻度
            },
            axisLabel: {
              //x轴标记内容
              show: true,
            },
          },
          yAxis: [
            {
              type: "value",
              name: "待接入4",
              splitLine: {
                show: false,
              },
              axisTick: {
                show: true,
              },
              axisLine: {
                show: true,
              },
              axisLabel: {
                show: true,
              },
            },
            {
              type: "value",
              name: "待接入3",
              position: "right",
              splitLine: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              axisLine: {
                show: false,
              },
              axisLabel: {
                show: true,
                formatter: "{value} %", //右侧Y轴文字显示
              },
            },
            {
              type: "value",
              gridIndex: 0,
              min: 50,
              max: 100,
              splitNumber: 8,
              splitLine: {
                show: false,
              },
              axisLine: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              axisLabel: {
                show: false,
              },
              splitArea: {
                show: true,
                areaStyle: {
                  color: ["rgba(250,250,250,0.0)", "rgba(250,250,250,0.05)"],
                },
              },
            },
          ],
          series: [
            //销售水量是折线图
            {
              name: "待接入1",
              type: "line",
              smooth: true, //平滑曲线显示
              itemStyle: {
                color: "#058cff",
              },
              areaStyle: {
                color: "rgba(5,140,255, 0.2)",
              },
              data: [4.2, 3.8, 4.8, 3.5, 2.9, 2.8, 3, 5],
            },
            {
              //主营业务是条形图
              name: "待接入2",
              type: "bar",
              barWidth: 15,
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: "#00FFE3",
                    },
                    {
                      offset: 1,
                      color: "#4693EC",
                    },
                  ]),
                },
              },
              data: [5.0, 3.8, 4.8, 3.5, 2.9, 2.8, 3, 5],
            },
          ],
        },
      };
    },
    mounted() {},
    created() {
      this.fetchWeiboData();
    },
    methods: {
      currentState(value) {
        //搜索相关或者不相关
        this.listLoading = true; //开启加载效果
        let no = (this.queryForm.pageNo - 1) * this.queryForm.pageSize;
        let size = this.queryForm.pageNo * this.queryForm.pageSize;

        if (value == "只看相关") {
          //只看相关
          let search = this.dataList.filter(
            (item) => item.label.indexOf("1") >= 0
          );
          this.total = search.length;

          this.list = search.slice(no, size);
          setTimeout(() => {
            this.listLoading = false;
            this.value = "";
          }, 500);
        } else if (value == "只看不相关") {
          //只看不相关
          let search = this.dataList.filter(
            (item) => item.label.indexOf("0") >= 0
          );
          this.total = search.length;
          this.list = search.slice(no, size);
          setTimeout(() => {
            this.listLoading = false;
            this.value = "";
          }, 500);
        } else {
          //恢复默认
          this.total = this.dataList.length;
          this.initData();

          setTimeout(() => {
            this.listLoading = false;
            this.value = "";
          }, 500);
        }
      },

      handleClickTab(tab, event) {
        if (tab.name == "最新地震微博舆情") {
          // 触发微博
          this.fetchWeiboData();
        } else if (tab.name == "最新地震新闻舆情") {
          // 触发新闻
          this.fetchNewsData();
        }
      },
      handleClick(e) {
        this.$baseMessage(`请稍等，已为您跳转至原微博`);
      },
      setSelectRows(val) {
        //表格方法：整理行
        this.selectRows = val;
      },
      //表格两个change函数
      handleSizeChange(val) {
        this.queryForm.pageSize = val;
        this.fetchWeiboData();
      },
      handleCurrentChange(val) {
        this.queryForm.pageNo = val;
        this.fetchWeiboData();
      },
      handleQuery() {
        //表格方法：查询
        this.queryForm.pageNo = 1;
        this.fetchWeiboData();
      },

      async fetchWeiboData() {
        //获取微博列表数据
        this.listLoading = true; //开启加载效果
        const { data, totalCount } = await getWeiBo();

        this.dataList = data; //传输表格数据，所有数据给dataList
        this.total = totalCount;
        this.showWB = true; //展示weibo
        this.showNews = false; //不展示新闻

        this.initData(); //调用生成数据的方法
        setTimeout(() => {
          this.listLoading = false;
        }, 500);
      },
      async fetchNewsData() {
        //获取微博列表数据
        this.listLoading = true; //开启加载效果
        const { data, totalCount } = await getNews();

        this.dataList = data; //传输表格数据，所有数据给dataList
        this.total = totalCount;
        this.showWB = false;
        this.showNews = true;

        this.initData(); //调用生成数据的方法
        setTimeout(() => {
          this.listLoading = false;
        }, 500);
      },
      async initData() {
        //大神给的改写翻页和查询的方法
        let no = (this.queryForm.pageNo - 1) * this.queryForm.pageSize;
        let size = this.queryForm.pageNo * this.queryForm.pageSize;
        this.list = this.dataList.slice(no, size);
      },
    },
  };
</script>
<style lang="scss" scoped>
  .echarts {
    width: 100%;
  }
</style>
