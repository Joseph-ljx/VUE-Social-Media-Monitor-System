<template>
  <div class="blacklist-container">
    <el-divider content-position="left">vue-admin-beautiful测试环境</el-divider>
    <el-alert :closable="false">
      这里以后就用来测试数据了，谁来都不好使！
    </el-alert>
    <br />
    <el-table :data="tableData" style="width: 100%">
      <!-- 原变量名为name -->
      <el-table-column prop="id" label="变量1" width="180"></el-table-column>
      <!-- 原变量名为qq -->
      <el-table-column prop="name" label="变量2" width="180"></el-table-column>
      <!-- 原变量名为excuse -->
      <el-table-column prop="name" label="变量3"></el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { getList, getTestList } from "@/api/blacklist";
  export default {
    name: "Blacklist",
    components: {},
    data() {
      return { tableData: [] };
    },
    created() {
      this.fetchData();
    },
    mounted() {},
    methods: {
      fetchData() {
        //原版方法，这里用getTestList来测试我自己的函数
        /* getList().then(({ data }) => {
          this.tableData = data;
        }); */
        getTestList().then(({ data }) => {
          this.tableData = data;
        });
      },
    },
  };
</script>
