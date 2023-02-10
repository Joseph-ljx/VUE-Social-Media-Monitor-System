<template>
  <div class="map-container">
    <el-tabs
      v-model="activeName"
      :tab-position="tabPosition"
      @tab-click="handleClickTab"
    >
      <!--  <el-tab-pane label="台风" name="台风"></el-tab-pane>
        <el-tab-pane label="暴雨" name="暴雨"></el-tab-pane> -->
      <el-tab-pane label="全国地震分布" name="全国地震分布"></el-tab-pane>
    </el-tabs>
    <div id="map" class="container"></div>
  </div>
</template>

<script>
  import axios from "axios";
  import * as mapv from "mapv"; //全部引入了
  import { getLocation } from "@/api/map";

  export default {
    name: "Map",
    components: {},
    data() {
      return {
        tabPosition: "top",
        activeName: "全国地震分布",
        locationx: [], //经度
        locationy: [], //纬度
        location: [], //地点
        size: null,
      };
    },
    created() {
      this.fetchLocation();
    },
    mounted() {
      var map = this.$baseMap(); //创建地图对象
      window.loginPath = this.$router; //绑定路由对象
      window.loginPathThis = this; //绑定vm对象
      axios
        .get("http://49.232.229.126:8000/earthquake_macroscopic/map3")
        .then((res) => {
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
                //update markerFill to highlight

                e.target.openInfoWindow();
                //这里e.target = this;
              })
              .on("mouseout", function (e) {
                //reset color

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
    methods: {
      handleClick() {
        window.alert("nihao");
      },
      handleClickTab(tab, event) {
        if (tab.name == "全国地震分布") {
          // 触发台风
        } else {
          // 触发疫情
        }
      },
      async fetchLocation() {
        //获取坐标
        const { data, msg } = await getLocation();
        this.location = data;
        this.size = data.length;
        for (let i = 0; i < this.location.length; i++) {
          this.locationx.push(this.location[i].lng);
          this.locationy.push(this.location[i].lat);
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .map-container {
    .container {
      width: 100%;
      height: calc(100vh - 214px);
    }
  }
  @import url("https://cdn.jsdelivr.net/npm/maptalks/dist/maptalks.css");
</style>
