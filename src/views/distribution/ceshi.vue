<template>
  <div class="map-container">
    <div id="info"></div>
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
        testDataSet: [
          [118.46023, 39.27313],
          [103.5903, 31.47686],
          [88.31104, 43.36378],
          [118.8735, 33.29433],
          [106.24284, 38.47314],
        ],

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
      this.constMap();
    },
    methods: {
      handleClick() {
        window.alert("nihao");
      },
      async fetchLocation() {
        const { data, msg } = await getLocation();
        this.location = data;
        this.size = data.length;
        for (let i = 0; i < this.location.length; i++) {
          this.locationx.push(this.location[i].lng);
          this.locationy.push(this.location[i].lat);
        }
      },
      constMap() {
        //创建地图
        this.$nextTick(() => {
          const map = this.$baseMap(); //创建地图对象
          axios
            .get(
              "https://cdn.jsdelivr.net/npm/mapv@2.0.12/examples/data/od-xierqi.txt"
            )
            .then((rs) => {
              let data = [];
              let timeData = [];
              let coordinatesTest = [];
              rs = rs.data.split("\n");
              let maxLength = 0;
              for (let i = 0; i < rs.length; i++) {
                let item = rs[i].split(",");
                let coordinates = [];
                if (item.length > maxLength) {
                  maxLength = item.length;
                }
                for (let j = 0; j < item.length; j += 2) {
                  let x = (Number(item[j]) / 20037508.34) * 180;
                  let y = (Number(item[j + 1]) / 20037508.34) * 180;
                  y =
                    (180 / Math.PI) *
                    (2 * Math.atan(Math.exp((y * Math.PI) / 180)) -
                      Math.PI / 2);
                  if (x == 0 || y == NaN) {
                    continue;
                  }
                  coordinates.push([x, y]);
                  timeData.push({
                    //多次将点放进一个array
                    geometry: {
                      type: "Point",
                      coordinates: [x, y],
                    },
                    count: 1,
                    time: j,
                  });
                }
                data.push({
                  geometry: {
                    type: "LineString",
                    coordinates: coordinates,
                  },
                });
              }

              for (let k = 0; k < this.testDataSet.length; k++) {
                //红色标注点
                coordinatesTest.push({
                  //多点测试
                  geometry: {
                    type: "Point",
                    coordinates: this.testDataSet[k],
                  },
                });
              }
              let dataSetTest = new mapv.DataSet(coordinatesTest);
              let testOptions = {
                fillStyle: "rgba(255, 0, 0, 0.2)", //RBGA颜色
                globalCompositeOperation: "lighter",
                size: 10,

                draw: "simple",
              };

              let mapvLayer = new mapv.MaptalksLayer(
                "mapv1",
                dataSetTest,
                testOptions
              ).addTo(map);
            });

          axios
            .get("http://49.232.229.126:8000/earthquake_macroscopic/map3")
            .then((res) => {
              /* console.log(res.data.data.length);
              console.log(this.size); //this对应的就是这个axios地res对象内 */
              var layer = new maptalks.VectorLayer("v").addTo(map); //Marker字母图层
              var center = map.getCenter(),
                width = 0.055,
                height = 0.03,
                markers = [];
              for (let i = 0; i < this.size; i++) {
                var x = parseFloat(this.locationx[i]);
                var y = parseFloat(this.locationy[i]);
                var marker = new maptalks.Marker([x, y], {
                  symbol: {
                    textSize: 10,
                    textFill: "White",
                    markerType: "ellipse",
                    markerFill: "#0e595e",
                    markerFillOpacity: 0.4,
                    markerLineWidth: 2,
                    markerLineColor: "white",
                    markerWidth: 20,
                    markerHeight: 20,
                  },
                })
                  .on("mouseenter", function (e) {
                    //update markerFill to highlight
                    e.target.updateSymbol({
                      markerFill: "#f00",
                    });
                    e.target.openInfoWindow();
                  })
                  .on("mouseout", function (e) {
                    //reset color
                    e.target.updateSymbol({
                      markerFill: "#0e595e",
                    });
                    e.target.closeInfoWindow();
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
        });
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
