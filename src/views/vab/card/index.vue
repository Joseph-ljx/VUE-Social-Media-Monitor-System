<template>
  <div class="card-container">
    <el-row :gutter="20">
      <el-col
        v-for="(item, index) in list"
        :key="index"
        :xs="24"
        :sm="8"
        :md="8"
        :lg="24"
        :xl="4"
      >
        <el-card shadow="hover">
          <div slot="header">
            <span class="time">发表时间: {{ item.title }}</span>
            <span class="comment">评论数: 200；</span>
            <span class="forward">转发量: 300；</span>
            <span class="like">点赞量: 300；</span>
          </div>
          <div class="lodash-content" style="color: #ff0000">
            这里放相应的内容
            <br />
            // => 1
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
    </el-row>
    <el-pagination
      :background="background"
      :current-page="pageNo"
      :layout="layout"
      :page-size="pageSize"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    ></el-pagination>
  </div>
</template>

<script>
  //默认长度：xs:24, sm:8, md:8, lg:8, xl:4
  import { getList } from "@/api/table";
  import VabImage from "@/components/VabImage";

  export default {
    name: "Card",
    components: {},
    data() {
      return {
        value: true,
        currentDate: new Date(),
        list: null,
        listLoading: true,
        pageNo: 1,
        pageSize: 10,
        layout: "total, sizes, prev, pager, next, jumper",
        total: 0,
        background: true,
        height: 0,
        elementLoadingText: "正在加载...",
        dialogFormVisible: false,
      };
    },
    created() {
      this.fetchData();
      this.height = this.$baseTableHeight(1);
    },
    methods: {
      bigClick(val) {
        this.$baseAlert("点击了大图");
      },
      smallClick(val) {
        this.$baseAlert("点击了小图");
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.fetchData();
      },
      handleCurrentChange(val) {
        this.pageNo = val;
        this.fetchData();
      },
      async fetchData() {
        this.listLoading = true;
        const { data, totalCount } = await getList({
          pageNo: this.pageNo,
          pageSize: this.pageSize,
        });
        this.list = data;
        this.total = totalCount;
        setTimeout(() => {
          this.listLoading = false;
        }, 300);
      },
    },
  };
</script>
<style lang="scss" scoped>
  .comment {
    color: blue;
    font-weight: bold;
  }
  .like {
    color: red;
    font-weight: bold;
  }
  .forward {
    color: purple;
    font-weight: bold;
  }
  .time {
    color: gray;
    font-weight: bold;
  }
</style>
