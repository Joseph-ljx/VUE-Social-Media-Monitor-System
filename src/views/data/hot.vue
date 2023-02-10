<template>
  <!-- 这里开始放表格 -->
  <div class="table-container">
    <vab-query-form>
      <!-- 左选择框体 -->
      <vab-query-form-left-panel>
        <el-button type="info" plain @click="handleWest">华西</el-button>
        <el-button type="danger" plain @click="handleNorth">
          华北(东北)
        </el-button>
        <el-button type="warning" plain @click="handleMiddle">华中</el-button>
        <el-button type="primary" plain @click="handleEast">华东</el-button>
        <el-button type="success" plain @click="handleSouth">华南</el-button>
        <el-button type="success" plain @click="handleSpecial">
          特别行政区
        </el-button>
        <el-button type="info" @click="fetchTableData">全地区</el-button>
      </vab-query-form-left-panel>
      <!--右选择框体-->
      <vab-query-form-right-panel>
        <template>
          <!--选择对应的可信度-->
          <el-select
            v-model="value"
            placeholder="可信度"
            @change="currentState"
          >
            <el-option
              v-for="item in reliability"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </template>
        <el-form
          ref="form"
          :model="queryForm"
          :inline="true"
          @submit.native.prevent
        >
          <el-form-item>
            <el-input v-model="queryForm.province" placeholder="省份" />
          </el-form-item>
          <el-form-item>
            <el-button
              icon="el-icon-search"
              type="primary"
              native-type="submit"
              @click="handleQuery"
            >
              查询
            </el-button>
          </el-form-item>
        </el-form>
      </vab-query-form-right-panel>
    </vab-query-form>

    <el-table
      v-loading="listLoading"
      :data="list"
      :element-loading-text="elementLoadingText"
      @selection-change="setSelectRows"
    >
      <!-- 可信度-->
      <el-table-column
        show-overflow-tooltip
        label="可信度"
        width="175"
        align="center"
      >
        <template slot-scope="scope">
          <el-tooltip
            :content="scope.row.authority | authorityNameFilter"
            class="item"
            effect="dark"
            placement="top-start"
          >
            <el-tag :type="scope.row.authority | authorityFilter">
              {{ scope.row.authority | authorityNameFilter }}
            </el-tag>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="市级地区"
        prop="city"
        width="280"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="县级地区"
        prop="area"
        width="190"
      ></el-table-column>
      <!-- 地区具有对应颜色 -->
      <el-table-column
        show-overflow-tooltip
        label="地区"
        align="left"
        width="250"
      >
        <template slot-scope="scope">
          <el-tooltip
            :content="scope.row.province"
            class="item"
            effect="dark"
            placement="top-start"
          >
            <el-tag :type="scope.row.province | provinceFilter">
              {{ scope.row.province }}
            </el-tag>
          </el-tooltip>
        </template>
      </el-table-column>

      <!--时间-->
      <el-table-column
        show-overflow-tooltip
        label="时间"
        prop="time"
        width="250"
        sortable
      ></el-table-column>
      <el-table-column show-overflow-tooltip prop="info" label="事件简介">
        <template slot-scope="scope">
          <!-- <router-link :to="'/distribution/test' + scope.row.post_content"> 此处进行跳转 -->
          <router-link
            :to="{
              name: 'xiangqing',
              params: {
                number: scope.row.number,
                province: scope.row.province,
                city: scope.row.city,
                area: scope.row.area,
              },
            }"
          >
            <span>
              {{ scope.row.info }}
            </span>
          </router-link>
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
  <!-- 表格结束 -->
</template>

<script>
  import VabChart from "@/plugins/echarts";
  import { dependencies, devDependencies } from "../../../package.json";
  import { getclList } from "@/api/changeLog";
  import { getNoticeList } from "@/api/notice";
  import { getRepos, getStargazers } from "@/api/github";
  import { getList, doDelete, getList1, getLine1, getListHot } from "@/api/table";

  export default {
    name: "Index",
    components: {},
    filters: {
      //表格要用的过滤器: 主要是针对返回内容的状态（status），更改对应组件的格式
      statusFilter(status) {
        const statusMap = {
          //创建一个map，key-value的对应格式，对应status对应格式
          published: "success",
          draft: "danger",
          deleted: "danger",
        };
        return statusMap[status];
      },
      authorityFilter(authority) {
        //展示Label的样式
        const authorityMap = {
          1: "danger",
          0: "success",
        };
        return authorityMap[authority];
      },
      authorityNameFilter(authority) {
        //展示高可信度或者低可信度
        const authorityNameMap = {
          1: "高可信度",
          0: "低可信度",
        };
        return authorityNameMap[authority];
      },
      provinceFilter(province) {
        const provinceMap = {
          //创建一个map，key-value的对应格式，对应province所在的地区
          //华北+东北
          北京市: "danger",
          天津市: "danger",
          河北省: "danger",
          山西省: "danger",
          内蒙古自治区: "danger",
          辽宁省: "danger",
          吉林省: "danger",
          黑龙江省: "danger",

          //华东
          上海市: "primary",
          江苏省: "primary",
          浙江省: "primary",
          安徽省: "primary",
          福建省: "primary",
          江西省: "primary",
          山东省: "primary",

          //华中
          河南省: "warning",
          湖北省: "warning",
          湖南省: "warning",

          //华西
          重庆市: "info",
          四川省: "info",
          贵州省: "info",
          云南省: "info",
          西藏自治区: "info",
          新疆维吾尔自治区: "info",
          宁夏回族自治区: "info",
          青海省: "info",
          甘肃省: "info",
          陕西省: "info",

          //华南
          广东省: "success",
          广西省: "success",
          海南: "success",

          //特别行政区
          香港: "success",
          澳门: "success",
          台湾: "success",
        };
        return provinceMap[province];
      },
    },
    data() {
      return {
        //表格数据
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
        listLoading: true,
        layout: "total, sizes, prev, pager, next, jumper",
        total: 0,
        background: true,
        selectRows: "",
        elementLoadingText: "正在加载...",
        queryForm: {
          pageNo: 1,
          pageSize: 20,
          province: "", //限定想要搜索的标题内容
        },
        querySouth: {
          pageNo: 1,
          pageSize: 20,
          provinceList: ["广东省", "广西省", "海南市"],
        },
        queryWest: {
          pageNo: 1,
          pageSize: 20,
          provinceList: [
            "重庆市",
            "四川省",
            "贵州省",
            "云南省",
            "云南省",
            "西藏自治区",
            "新疆维吾尔自治区",
            "宁夏回族自治区",
            "青海省",
            "甘肃省",
            "陕西省",
          ],
        },
        querySpecial: {
          pageNo: 1,
          pageSize: 20,
          provinceList: ["香港", "澳门", "台湾"],
        },
        queryMiddle: {
          pageNo: 1,
          pageSize: 20,
          provinceList: ["河南省", "湖北省", "湖南省"],
        },
        queryEast: {
          pageNo: 1,
          pageSize: 20,
          provinceList: [
            "上海市",
            "江苏省",
            "浙江省",
            "安徽省",
            "福建省",
            "江西省",
            "山东省",
          ],
        },
        queryNorth: {
          pageNo: 1,
          pageSize: 20,
          provinceList: [
            "北京市",
            "天津市",
            "河北省",
            "山西省",
            "内蒙古自治区",
            "辽宁省",
            "吉林省",
            "黑龙江",
          ],
        },
        reliability: [
          {
            value: "选项1",
            label: "高可信度",
          },
          {
            value: "选项2",
            label: "低可信度",
          },
        ],
        value: "",

        //图表数据：动态显示
        timer: 0,
        updateTime: process.env.VUE_APP_UPDATE_TIME,
        nodeEnv: process.env.NODE_ENV,
        dependencies: dependencies,
        devDependencies: devDependencies,

        //更新日志
        reverse: true,
        activities: [],
        noticeList: [],
        //其他信息
        userAgent: navigator.userAgent,
      };
    },
    created() {
      /* this.fetchData(); */
      this.fetchTableData(); //查询表格数据
    },
    beforeDestroy() {
      clearInterval(this.timer);
    },
    mounted() {
      /* let base = +new Date(2020, 1, 1);
        let oneDay = 24 * 3600 * 1000;
        let date = []; //创建日期数组

        let data = [Math.random() * 1500];
        let now = new Date(base);

        const addData = (shift) => {
          now = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join("/");
          date.push(now);
          data.push(this.$baseLodash.random(20000, 60000));

          if (shift) {
            //数据相应的也平移
            date.shift();  //移除第一个值
            data.shift();
          }
          now = new Date(+new Date(now) + oneDay);
        };

        for (let i = 1; i < 6; i++) {
          //间隔3秒转移到新的数据
          addData();
        }
        addData(true);
        this.fwl.xAxis[0].data = date; //横轴赋值为新的日期数据
        this.fwl.series[0].data = data; //纵轴赋值为新的量值数据
        this.timer = setInterval(() => {
          addData(true);
          this.fwl.xAxis[0].data = date; //添加横轴数据
          this.fwl.series[0].data = data; //添加纵轴数据
        }, 3000); */
    },
    methods: {
      currentState(value) {
        //搜索高可信度或低可信度
        this.listLoading = true; //开启加载效果
        let no = (this.queryForm.pageNo - 1) * this.queryForm.pageSize;
        let size = this.queryForm.pageNo * this.queryForm.pageSize;

        if (value == "高可信度") {
          //高可信度
          let search = this.dataList.filter(
            (item) => item.authority.indexOf("1") >= 0
          );
          this.total = search.length;
          this.list = search.slice(no, size);
          setTimeout(() => {
            this.listLoading = false;
          }, 500);
        } else if (value == "低可信度") {
          //低可信度
          let search = this.dataList.filter(
            (item) => item.authority.indexOf("0") >= 0
          );
          this.total = search.length;
          this.list = search.slice(no, size);
          setTimeout(() => {
            this.listLoading = false;
          }, 500);
        }
      },
      setSelectRows(val) {
        //表格方法：整理行
        this.selectRows = val;
      },
      //表格两个change函数
      handleSizeChange(val) {
        //更改当前页面显示条数的多少
        this.queryForm.pageSize = val;
        this.initData();
        /* this.fetchTableData(); */
      },
      handleCurrentChange(val) {
        //更改当前显示页面
        this.queryForm.pageNo = val;
        this.initData();
        /* this.fetchTableData(); */
        /* this.listLoading = true; //开启加载效果

        let no = (this.queryForm.pageNo - 1) * this.queryForm.pageSize;
        let size = this.queryForm.pageNo * this.queryForm.pageSize;
        this.list = this.list.slice(no, size);

        setTimeout(() => {
          this.listLoading = false;
        }, 500); */
      },
      handleQuery() {
        //表格方法：查询
        this.queryForm.pageNo = 1;
        let no = (this.queryForm.pageNo - 1) * this.queryForm.pageSize;
        let size = this.queryForm.pageNo * this.queryForm.pageSize;
        this.listLoading = true; //开启加载效果
        if (!this.queryForm.province) {
          //如果没有要查找的省份
          this.list = this.dataList.slice(no, size); //当前页显示的内容
        } else {
          let search = this.middleList.filter(
            //查找想要检索的省份
            (item) => item.province.indexOf(this.queryForm.province) >= 0
          );
          this.total = search.length;
          this.list = search.slice(no, size); //当前页显示的内容
        }
        setTimeout(() => {
          this.listLoading = false;
        }, 500);
        /* this.initData(); */
      },

      handleClick(e) {
        this.$baseMessage(`点击了${e.name},这里可以写跳转`);
      },
      handleZrClick(e) {},

      async fetchData() {
        const { data } = await getList();
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

      async fetchTableData() {
        //查询表格的内容
        const { data, totalCount } = await getListHot(this.queryForm); //网页测试数据
        this.queryForm.pageNo = 1;
        this.dataList = data; //传输表格数据，所有数据给dataList（最原始的获得的ajax数据）
        this.middleList = data; //也把初始化
        this.total = totalCount; //给总数
        this.initData(); //调用生成数据的方法

        /* data.map((item, index) => {
            if (index === data.length - 1) {
              item.color = "#0bbd87";
            }
          });
          this.activities = data;
          const res = await getNoticeList();
          this.noticeList = res.data; */
      },
      async initData() {
        //产生数据显示
        this.listLoading = true; //开启加载效果
        let no = (this.queryForm.pageNo - 1) * this.queryForm.pageSize;
        let size = this.queryForm.pageNo * this.queryForm.pageSize;

        this.list = this.middleList.slice(no, size); //当前页显示的内容

        setTimeout(() => {
          this.listLoading = false;
        }, 500);
      },
      handleSouth() {
        //南方
        this.listLoading = true; //开启加载效果
        this.queryForm.pageNo = 1; //页码初始化为1

        //开始处理数据
        let no = (this.queryForm.pageNo - 1) * this.queryForm.pageSize;
        let size = this.queryForm.pageNo * this.queryForm.pageSize;
        let result = [];

        for (let i = 0; i < this.querySouth.provinceList.length; i++) {
          let search = this.dataList.filter(
            (item) =>
              item.province.indexOf(this.querySouth.provinceList[i]) >= 0
          );
          result = result.concat(search);
        }
        this.middleList = result; //把result赋值给middleList中间集
        this.total = result.length;
        this.list = result.slice(no, size);

        setTimeout(() => {
          this.listLoading = false;
        }, 500);
      },
      handleNorth() {
        //北方
        this.listLoading = true; //开启加载效果
        this.queryForm.pageNo = 1; //页码初始化为1

        //开始处理数据
        let no = (this.queryForm.pageNo - 1) * this.queryForm.pageSize;
        let size = this.queryForm.pageNo * this.queryForm.pageSize;
        let result = [];

        for (let i = 0; i < this.queryNorth.provinceList.length; i++) {
          let search = this.dataList.filter(
            (item) =>
              item.province.indexOf(this.queryNorth.provinceList[i]) >= 0
          );
          result = result.concat(search);
        }
        this.middleList = result; //把result赋值给middleList中间集
        this.total = result.length;
        this.list = result.slice(no, size);

        setTimeout(() => {
          this.listLoading = false;
        }, 500);
      },
      handleEast() {
        //东方
        this.listLoading = true; //开启加载效果
        this.queryForm.pageNo = 1; //页码初始化为1

        //开始处理数据
        let no = (this.queryForm.pageNo - 1) * this.queryForm.pageSize;
        let size = this.queryForm.pageNo * this.queryForm.pageSize;
        let result = [];

        for (let i = 0; i < this.queryEast.provinceList.length; i++) {
          let search = this.dataList.filter(
            (item) => item.province.indexOf(this.queryEast.provinceList[i]) >= 0
          );
          result = result.concat(search);
        }
        this.middleList = result; //把result赋值给middleList中间集
        this.total = result.length;
        this.list = result.slice(no, size);

        setTimeout(() => {
          this.listLoading = false;
        }, 500);
      },
      handleWest() {
        //西方
        this.listLoading = true; //开启加载效果
        this.queryForm.pageNo = 1; //页码初始化为1

        //开始处理数据
        let no = (this.queryForm.pageNo - 1) * this.queryForm.pageSize;
        let size = this.queryForm.pageNo * this.queryForm.pageSize;
        let result = [];

        for (let i = 0; i < this.queryWest.provinceList.length; i++) {
          let search = this.dataList.filter(
            (item) => item.province.indexOf(this.queryWest.provinceList[i]) >= 0
          );
          result = result.concat(search);
        }
        this.middleList = result; //把result赋值给middleList中间集
        this.total = result.length;
        this.list = result.slice(no, size);

        setTimeout(() => {
          this.listLoading = false;
        }, 500);
      },
      handleMiddle() {
        //中部
        this.listLoading = true; //开启加载效果
        this.queryForm.pageNo = 1; //页码初始化为1

        //开始处理数据
        let no = (this.queryForm.pageNo - 1) * this.queryForm.pageSize;
        let size = this.queryForm.pageNo * this.queryForm.pageSize;
        let result = [];

        for (let i = 0; i < this.queryMiddle.provinceList.length; i++) {
          let search = this.dataList.filter(
            (item) =>
              item.province.indexOf(this.queryMiddle.provinceList[i]) >= 0
          );
          result = result.concat(search);
        }
        this.middleList = result; //把result赋值给middleList中间集
        this.total = result.length;
        this.list = result.slice(no, size);

        setTimeout(() => {
          this.listLoading = false;
        }, 500);
      },
      handleSpecial() {
        //特别行政区
        this.listLoading = true; //开启加载效果
        this.queryForm.pageNo = 1; //页码初始化为1

        //开始处理数据
        let no = (this.queryForm.pageNo - 1) * this.queryForm.pageSize;
        let size = this.queryForm.pageNo * this.queryForm.pageSize;
        let result = [];

        for (let i = 0; i < this.querySpecial.provinceList.length; i++) {
          let search = this.dataList.filter(
            (item) =>
              item.province.indexOf(this.querySpecial.provinceList[i]) >= 0
          );
          result = result.concat(search);
        }
        this.middleList = result; //把result赋值给middleList中间集
        this.total = result.length;
        this.list = result.slice(no, size);

        setTimeout(() => {
          this.listLoading = false;
        }, 500);
      },
    },
  };
</script>
<style lang="scss" scoped>
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
          height: 125px;
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
</style>
