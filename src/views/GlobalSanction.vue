<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 全局查询
        </el-breadcrumb-item>
        <el-breadcrumb-item>生产单位封禁</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      生产单位ID:
      <el-input
        v-model="unitID"
        size="large"
        style="width: 80%; margin: auto"
        placeholder=""
      />
    </div>
    <div class="container">
      <el-button
        size="large"
        type="success"
        style="margin: auto"
        round
        @click="traceOn"
        auto-insert-space="true"
        >开始查询</el-button
      >
    </div>
    <div class="container">
        <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="time" label="时间" width="400" />
        <el-table-column prop="name" label="生产单位名称" width="400" />
      </el-table>
      </div>

  </div>
</template>

<script>
import * as bc from '../blockchain';
import service from '../utils/request';

export default {
  name: 'trace',
  data() {
    return {
      productionID: '',
      unitID: '',
      tableData: [{
        time: '', name: '',
      }],

    };
  },
  methods:
  {
    traceOn() {
      this.tableData = [];
      bc.getGlobalSanction(this.unitID).then((res) => {
        // console.log(res);
        for (let i = 0, len = res.length; i < len; i += 1) {
          console.log(res[i]); // 0 1 2 3 4
          service.get('/unit', { params: { ID: this.unitID } }).then((record) => {
            this.tableData[i].name = record.name;
          });
          service.get('/record', { params: { timestamp: res[i].returnValues.timeStamp } }).then((record) => {
            this.tableData[i].time = record.time;
          });
        }
      });
    },
  },
};
</script>
