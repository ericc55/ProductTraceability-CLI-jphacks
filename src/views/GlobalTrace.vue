<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 全局查询
        </el-breadcrumb-item>
        <el-breadcrumb-item>溯源</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      溯源码：
      <el-input
        v-model="productionID"
        size="large"
        style="width: 80%; margin: auto"
        placeholder=""
      />
    </div>
    <div class="container">
      生产单位ID：
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
        <el-table :data="traceData" stripe style="width: 100%">
        <el-table-column prop="time" label="时间" width="180" />
        <el-table-column prop="code" label="货品溯源码" width="540" />
        <el-table-column prop="name" label="生产单位" width="360" />
        <el-table-column prop="state" label="状态" width="100"/>
        <el-table-column prop="region" label="地区" width="180"/>
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
      traceData: [{
        time: '', code: '', name: '', state: '', region: '',
      }],

    };
  },
  methods:
  {
    traceOn() {
      this.traceData = [];
      bc.getGlobalTrace(this.productionID, this.unitID).then((res) => {
        // console.log(res);
        for (let i = 0, len = res.length; i < len; i += 1) {
          console.log(res[i]); // 0 1 2 3 4
          service.get('/record', { params: { ID: res[i].returnValues.productionUnitID, state: res[i].returnValues.state, timestamp: res[i].returnValues.timeStamp } }).then((record) => {
            this.traceData[i] = record;
            this.traceData[i].code = res[i].returnValues.productionID;
            this.traceData[i].name = `${this.traceData[i].name}(${res[i].returnValues.productionUnitID})`;
            console.log(this.traceData);
          });
        }
      });
    },
  },
};
</script>
