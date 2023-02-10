<template>
  <div>
    <!-- <div class="index-container">
      <el-card shadow="hover">
        <div slot="header">
          <span style="font-weight: 400">事件线</span>
        </div>

        <vue-horizontal-timeline
          :items="items"
          :clickable="true"
          timeline-background="rgb(16, 116, 141)"
        />

        
      </el-card>
    </div> -->
    <div class="lodash-container">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-card shadow="never">
            <span style="font-weight: 600">地震地址：</span>
            <el-tag type="danger" size="big">
              {{ province }}
            </el-tag>
            <el-tag type="success" size="big">
              {{ city }}
            </el-tag>
            <vab-query-form>
              <!-- 左选择框体 -->

              <!--右选择框体-->
              <div class="rightPanelClass">
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
              </div>
              <div class="rightPanelClass2">
                <el-form
                  ref="form"
                  :model="queryForm"
                  :inline="true"
                  @submit.native.prevent
                >
                  <el-form-item>
                    <el-input v-model="queryForm.area" placeholder="县级地区" />
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
              </div>
            </vab-query-form>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="block">
      <!-- timeline插件 -->
      <el-timeline>
        <el-timeline-item
          v-for="(timeLineListShow, index) in timeLineList"
          :key="index"
          :timestamp="timeLineListShow.time"
          placement="top"
        >
          <el-card shadow="hover">
            <h2>
              {{ timeLineListShow.province }}
              {{ timeLineListShow.city }}
              {{ timeLineListShow.area }}
            </h2>
            <router-link
              :to="{
                name: 'xianFgqing',
                params: {
                  number: timeLineListShow.number,
                  province: timeLineListShow.province,
                  city: timeLineListShow.city,
                  area: timeLineListShow.area,
                },
              }"
            >
              <p class="timelineInfo">{{ timeLineListShow.info }}</p>
            </router-link>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>

    <div class="lodash-container">
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
  import axios from "axios";
  import { VueHorizontalTimeline } from "vue-horizontal-timeline";
  export default {
    name: "Lodash",
    components: {},

    filters: {
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
    },
    data() {
      return {
        province: null,
        city: null,
        area: null,
        list: [], //展示集
        timeLineList: [], //同样时间集
        dataList: [], //原始集
        middleList: [], //中间集
        listLoading: true,
        layout: "total, sizes, prev, pager, next, jumper",
        background: true,
        selectRows: "",
        elementLoadingText: "正在加载...",
        total: 0,
        queryForm: {
          pageNo: 1,
          pageSize: 20,
          area: "",
        },
        /* items: [
          //时间线内容
          {
            title: "1939",
            content:
              "World War II, was a global war that lasted from 1939 to 1945. The vast majority of the world's ",
          },
          {
            title: "1945",
            content:
              "The War in Vietnam, was a post–World War II armed conflict involving a largely British-Indian and French task ",
          },
          {
            title: "1947",
            content:
              "The Paraguayan Civil War, also known as the Barefoot Revolution and the Second Paraguayan Civil War",
          },
          {
            title: "1954",
            content:
              "The Algerian War, was a war between France and the Algerian National Liberation Front .",
          },
          {
            title: "1954",
            content:
              "The Algerian War, was a war between France and the Algerian National Liberation Front .",
          },
          {
            title: "1954",
            content:
              "The Algerian War, was a war between France and the Algerian National Liberation Front .",
          },
          {
            title: "1954",
            content:
              "The Algerian War, was a war between France and the Algerian National Liberation Front .",
          },
        ], */
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
        activities: [
          {
            content: "支持使用图标",
            timestamp: "2018-04-12 20:46",
            size: "large",
            type: "primary",
            icon: "el-icon-more",
          },
          {
            content: "支持自定义颜色",
            timestamp: "2018-04-03 20:46",
            color: "#0bbd87",
          },
          {
            content: "支持自定义尺寸",
            timestamp: "2018-04-03 20:46",
            size: "large",
          },
          {
            content: "默认样式的节点",
            timestamp: "2018-04-03 20:46",
          },
        ],
      };
    },
    created() {
      this.province = this.$route.params.province;
      this.city = this.$route.params.city;
      this.area = this.$route.params.area;

      this.fetchDZ();
    },
    mounted() {},
    methods: {
      openVn() {
        const h = this.$createElement;
        this.$message({
          message: h("p", null, [
            h("span", null, "此为 "),
            h("i", { style: "color: teal" }, "最新地址详情，"),
            h("span", null, "其他地址请手动跳转 "),
          ]),
        });
      },
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
          this.timeLineList = search.slice(no, size);
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
          this.timeLineList = search.slice(no, size);
          setTimeout(() => {
            this.listLoading = false;
          }, 500);
        }
      },
      setSelectRows(val) {
        //表格方法：整理行
        this.selectRows = val;
      },
      handleSizeChange(val) {
        //更改当前页面显示条数的多少
        this.queryForm.pageSize = val;
        this.initData();
      },
      handleCurrentChange(val) {
        //更改当前显示页面
        this.queryForm.pageNo = val;
        this.initData();
      },
      handleQuery() {
        //表格方法：查询
        this.queryForm.pageNo = 1;
        let no = (this.queryForm.pageNo - 1) * this.queryForm.pageSize;
        let size = this.queryForm.pageNo * this.queryForm.pageSize;
        this.listLoading = true; //开启加载效果
        if (!this.queryForm.area) {
          //如果没有要查找的省份
          this.list = this.dataList.slice(no, size); //当前页显示的内容
        } else {
          let search = this.middleList.filter(
            //查找想要检索的省份
            (item) => item.area.indexOf(this.queryForm.area) >= 0
          );
          this.total = search.length;
          this.list = search.slice(no, size); //当前页显示的内容
        }
        setTimeout(() => {
          this.listLoading = false;
        }, 500);
        /* this.initData(); */
      },
      async fetchDZ() {
        //获取对应地址详情
        if (this.$route.params.province == null) {
          axios
            .get("http://49.232.229.126:8000/earthquake_macroscopic/list3")
            .then((res) => {
              this.openVn();
              this.queryForm.pageNo = 1;
              this.dataList = res.data.data; //传输表格数据，所有数据给dataList（最原始的获得的ajax数据）
              this.province = res.data.province; //初始化为省
              this.city = res.data.city; //初始化为市
              this.middleList = res.data.data; //也把初始化
              this.total = res.data.totalCount; //给总数
              this.initData(); //调用生成数据的方法
            });
        } else {
          axios
            .get(
              "http://49.232.229.126:8000/earthquake_macroscopic/list3?province=" +
                this.province +
                "&city=" +
                this.city
            )
            .then((res) => {
              this.queryForm.pageNo = 1;
              this.dataList = res.data.data; //传输表格数据，所有数据给dataList（最原始的获得的ajax数据）
              this.middleList = res.data.data; //也把初始化
              this.total = res.data.totalCount; //给总数
              this.initData(); //调用生成数据的方法
            });
        }
      },
      async initData() {
        //产生数据显示
        this.listLoading = true; //开启加载效果
        let no = (this.queryForm.pageNo - 1) * this.queryForm.pageSize;
        let size = this.queryForm.pageNo * this.queryForm.pageSize;

        this.list = this.middleList.slice(no, size); //当前页显示的内容
        this.timeLineList = this.middleList.slice(no, size); //再赋值给timeLineList

        setTimeout(() => {
          this.listLoading = false;
        }, 500);
      },
    },
  };
</script>
<style lang="scss" scoped>
  .lodash-container {
    text-align: left;

    ::v-deep {
      .lodash-content {
        min-height: 150px;
      }
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
  }
  .rightPanelClass {
    float: right;
    margin: -30px 255px;
  }
  .rightPanelClass2 {
    float: right;
    margin: -30px -9px;
  }
  .timelineInfo {
    color: rgb(16, 116, 141);
    font-weight: 400;
  }
</style>
