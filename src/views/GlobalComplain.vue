<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 全局查询
        </el-breadcrumb-item>
        <el-breadcrumb-item>投诉</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      用户ID：
      <el-input
        v-model="userID"
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
        <el-table-column prop="userID" label="用户ID" width="540" />
        <el-table-column prop="unitName" label="生产单位名称" width="360" />
      </el-table>
      </div>

  </div>
</template>

<script>
import * as bc from '../blockchain';
import service from '../utils/request';
import byte from '../utils/StrByte';

export default {
  name: 'trace',
  data() {
    return {
      userID: '',
      unitID: '',
      traceData: [{
        time: '', userID: '', unitName: '',
      }],

    };
  },
  methods:
  {
    traceOn() {
      this.traceData = [];
      bc.getGlobalComplain(this.userID, this.unitID).then((res) => {
        for (let i = 0, len = res.length; i < len; i += 1) {
          const userIDstr = byte.byteToString(res[i].returnValues.userID);
          console.log(userIDstr);
          this.traceData[i] = {
            userID: userIDstr,
          };
          service.get('/unit', { params: { ID: this.unitID } }).then((record) => {
            console.log(record);
            this.traceData[i].unitName = `${record.name}(${record.id})`;
          });
          service.get('/time', { params: { timestamp: res[i].returnValues.timeStamp } }).then((record) => {
            console.log(record);
            this.traceData[i].time = record.time;
          });
        }
      });
    },
  },
};
</script>
