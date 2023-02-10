<template>
  <div class="index-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-card class="card" shadow="hover">
          <div slot="header">知识图谱</div>
          <div id= "main" style="height: 500px">
            
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import axios from "axios";
  import * as mapv from "mapv"; //全部引入了
  import * as echarts from "echarts";

  export default {
    name: "Map",
    components: {},
    data() {
      return {
        tabPosition: "top",
        activeName: "全国地震分布",

        ROOT_PATH:
          "https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples", //资源地址
        size: null,
      };
    },
    created() {},
    mounted() {
      var chartDom = document.getElementById("main");
      var myChart = echarts.init(chartDom);
      var option;
      var ROOT_PATH = 'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples';


      myChart.showLoading();
      $.getJSON(ROOT_PATH + "/data/asset/data/les-miserables.json", function (
        graph
      ) {
        myChart.hideLoading();

        graph.nodes.forEach(function (node) {
          node.label = {
            show: node.symbolSize > 30,
          };
        });
        option = {
          title: {
            text: "Les Miserables",
            subtext: "Default layout",
            top: "bottom",
            left: "right",
          },
          tooltip: {},
          legend: [
            {
              // selectedMode: 'single',
              data: graph.categories.map(function (a) {
                return a.name;
              }),
            },
          ],
          animationDuration: 1500,
          animationEasingUpdate: "quinticInOut",
          series: [
            {
              name: "Les Miserables",
              type: "graph",
              layout: "none",
              data: graph.nodes,
              links: graph.links,
              categories: graph.categories,
              roam: true,
              label: {
                position: "right",
                formatter: "{b}",
              },
              lineStyle: {
                color: "source",
                curveness: 0.3,
              },
              emphasis: {
                focus: "adjacency",
                lineStyle: {
                  width: 10,
                },
              },
            },
          ],
        };

        myChart.setOption(option);
      });

      option && myChart.setOption(option);
    },
    methods: {},
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
  @import url("https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples");
</style>
