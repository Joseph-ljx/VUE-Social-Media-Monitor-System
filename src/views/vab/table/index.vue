<template>
  <div class="table-container">
    <vab-query-form>
      <vab-query-form-right-panel>
        <el-form
          ref="form"
          :model="queryForm"
          :inline="true"
          label-position="right"
          @submit.native.prevent
        >
          <el-form-item>
            <el-input v-model="queryForm.title" placeholder="标题" />
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
      ref="tableSort"
      v-loading="listLoading"
      :data="list"
      :element-loading-text="elementLoadingText"
      @selection-change="setSelectRows"
      @sort-change="tableSortChange"
    >
      <el-table-column
        show-overflow-tooltip
        type="selection"
        width="55"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="title"
        label="标题"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="作者"
        prop="author"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="点击量"
        prop="pageViews"
        sortable
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="状态">
        <template slot-scope="scope">
          <el-tooltip
            :content="scope.row.status"
            class="item"
            effect="dark"
            placement="top-start"
          >
            <el-tag :type="scope.row.status | statusFilter">
              {{ scope.row.status }}
            </el-tag>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="时间"
        prop="datetime"
        width="200"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="title"
        label="事件简介"
      ></el-table-column>
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
    <table-edit ref="edit"></table-edit>
  </div>
</template>

<script>
  import { getList, doDelete } from "@/api/table";
  import TableEdit from "./components/TableEdit";
  export default {
    name: "ComprehensiveTable",
    components: {
      TableEdit,
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: "success",
          draft: "gray",
          deleted: "danger",
        };
        return statusMap[status];
      },
    },
    data() {
      return {
        imgShow: true,
        list: [],
        imageList: [],
        listLoading: true,
        layout: "total, sizes, prev, pager, next, jumper",
        total: 0,
        background: true,
        selectRows: "",
        elementLoadingText: "正在加载...",
        queryForm: {
          pageNo: 1,
          pageSize: 20,
          title: "",
        },
      };
    },
    created() {
      this.fetchData();
    },
    beforeDestroy() {},
    mounted() {},
    methods: {
      tableSortChange() {
        const imageList = [];
        this.$refs.tableSort.tableData.forEach((item, index) => {
          imageList.push(item.img);
        });
        this.imageList = imageList;
      },
      setSelectRows(val) {
        this.selectRows = val;
      },

      handleSizeChange(val) {
        this.queryForm.pageSize = val;
        this.fetchData();
      },
      handleCurrentChange(val) {
        this.queryForm.pageNo = val;
        this.fetchData();
      },
      handleQuery() {
        this.queryForm.pageNo = 1;
        this.fetchData();
      },
      async fetchData() {
        this.listLoading = true;
        const { data, totalCount } = await getList(this.queryForm);
        this.list = data;
        const imageList = [];
        data.forEach((item, index) => {
          imageList.push(item.img);
        });
        this.imageList = imageList;
        this.total = totalCount;
        setTimeout(() => {
          this.listLoading = false;
        }, 500);
      },
    },
  };
</script>
