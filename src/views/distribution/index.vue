<template>
  <div class="echarts-container">
    <el-row :gutter="20">
      <!-- <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="8">
        <el-card shadow="hover">
          <div slot="header">柱状图</div>
          <div>
            <vab-chart autoresize :options="chart1" />
          </div>
        </el-card>
      </el-col> -->
      <!-- <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="8">
        <el-card shadow="hover">
          <div slot="header">环形图</div>
          <div>
            <vab-chart
              ref="myCircle"
              theme="vab-echarts-theme"
              :options="chart2"
              class="my-circle"
            />
          </div>
        </el-card>
      </el-col> -->
      <!-- <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="8">
        <el-card shadow="hover">
          <div slot="header">关系图</div>
          <div>
            <vab-chart
              ref="myLine1"
              theme="vab-echarts-theme"
              autoresize
              :options="chart3"
              class="my-line1"
            />
          </div>
        </el-card>
      </el-col> -->

      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-card class="card" shadow="never">
          <div slot="header">
            <span>地震事件地址分布详情</span>
          </div>
          <div class="map-container">
            <div id="map" class="container"></div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import * as echarts from "echarts";
  import axios from "axios";
  import VabChart from "@/plugins/echarts";

  import * as mapv from "mapv"; //全部引入了
  import { getLocation } from "@/api/map";

  export default {
    name: "Echarts",
    components: {},
    data() {
      return {
        tabPosition: "top",
        activeName: "地震", //默认首次进入就是地震页面
        totalCount: null,

        locationx: [], //经度
        locationy: [], //纬度
        location: [], //地点
        size: null,

        //中国地图
        zgdt: {
          title: {
            text: "2020-2021 国内各省地震数量",
          },
          tooltip: {
            trigger: "item",
          },
          dataRange: {
            orient: "horizontal",

            text: ["高", "低"],
          },
          series: [
            {
              name: "2020-2021 全国地震分布",
              type: "map",
              roam: false,
              mapType: "china",
              mapLocation: {
                x: "center",
              },
              selectedMode: "multiple",
              itemStyle: {
                normal: {
                  label: {
                    show: false,
                  },
                },
                emphasis: {
                  label: {
                    show: true,
                  },
                },
              },
              data: null,
            },
          ],
        },
      };
    },
    mounted() {
      var map = this.$baseMap(); //创建地图对象
      window.loginPath = this.$router; //绑定路由对象
      window.loginPathThis = this; //绑定vm对象
      //关闭页面倾斜度
      axios
        .get("http://49.232.229.126:8000/earthquake_macroscopic/map3")
        .then((res) => {
          this.location = res.data.data; //回应赋值
          this.size = res.data.data.length; //赋值长度

          for (let i = 0; i < res.data.data.length; i++) {
            this.locationx.push(res.data.data[i].lng);
            this.locationy.push(res.data.data[i].lat);
          }

          var layer = new maptalks.VectorLayer("v").addTo(map); //Marker字母图层
          var center = map.getCenter(),
            width = 0.055,
            height = 0.03,
            markers = [];

          for (let i = 0; i < this.size; i++) {
            /* console.log(res.data.data[i]); //可以直接拿内容 */
            var x = parseFloat(this.locationx[i]);
            var y = parseFloat(this.locationy[i]);

            var marker = new maptalks.Marker([x, y], {})
              .on("mouseenter", function (e) {
                e.target.openInfoWindow();
                //这里e.target = this;
              })
              .on("mouseout", function (e) {
                e.target.closeInfoWindow();
              })
              .on("click", function (e) {
                //点击事件

                window.loginPath.push({
                  name: "dizhi",
                  params: {
                    province: window.loginPathThis.location[i].province,
                    city: window.loginPathThis.location[i].city,
                  },
                });
              })
              .setInfoWindow({
                title: this.location[i].province + this.location[i].city,
                content:
                  "<table>" +
                  "<tr><td>" +
                  this.location[i].content1 +
                  "</td></tr>" +
                  "<tr><td>" +
                  this.location[i].content2 +
                  "</td></tr>" +
                  "</table>",

                color: "#f00",
                autoPan: true,
                markerLineColor: "#f00",
                shadowColor: "#f00",

                //width: 300,
                // 'minHeight': 120,
                //custom: true,
                //'autoOpenOn' : 'click',  //set to null if not to open when clicking on marker
                //autoCloseOn: "click",
              });

            markers.push(marker);
          }
          layer.addGeometry(markers);
        });
    },
    created() {
      /* this.fetchLocation(); */
    },
    methods: {
      /* async fetchEarthQuakeData() {
        //获取地震地图数据
        this.listLoading = true;
        const { data } = await getEarthQuakeData();
        this.dzdt.series[0].data = data;
        setTimeout(() => {
          this.listLoading = false;
        }, 300);
      }, */
      /* async fetchTyphoonData() {
        this.listLoading = true;
        const { data } = await getTyphoonData();
        this.zgdt.series[0].data = data;
        setTimeout(() => {
          this.listLoading = false;
        }, 300);
      },
      async fetchStormData() {
        this.listLoading = true;
        const { data } = await getStormData();
        this.zgdt.series[0].data = data;
        setTimeout(() => {
          this.listLoading = false;
        }, 300);
      }, */
      /*  async fetchWeiboData() {
        //获取微博地图数据
        this.listLoading = true;
        const { data } = await getWeiboData();
        this.wbdt.series[0].data = data;
        setTimeout(() => {
          this.listLoading = false;
        }, 300);
      }, */
      /* async fetchLocation() {
        //获取坐标 - 无用方法，分离请求
        const { data, msg } = await getLocation();

        this.location = data;
        this.size = data.length;
        for (let i = 0; i < this.location.length; i++) {
          this.locationx.push(this.location[i].lng);
          this.locationy.push(this.location[i].lat);
        }
      }, */
    },
  };
</script>

<style lang="scss" scoped>
  .echarts {
    width: 100%;
  }
  .echarts-container {
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
  }
  .map-container {
    .container {
      width: 100%;
      height: calc(100vh - 214px);
    }
  }
  @import url("https://cdn.jsdelivr.net/npm/maptalks/dist/maptalks.css");
</style>
