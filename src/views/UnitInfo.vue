<template>
  <el-form :model="form" label-width="150px">
    <el-form-item label="生产单位ID">
    <el-container>
      <el-input v-model="unitID" placeholder="请输入生产单位ID"/>
      <el-button type="success" round @click="getInfo">查询</el-button>
    </el-container>
    </el-form-item>
    <el-form-item label="生产单位名称">
      {{name}}
    </el-form-item>
    <el-form-item label="生产单位属地">
      {{region}}
    </el-form-item>
    <el-form-item label="生产单位评分">
      {{score}}
    </el-form-item>
     <el-form-item label="生产单位简介">
      {{description}}
    </el-form-item>
  </el-form>
</template>

<script>
import * as bc from '../blockchain';
import service from '../utils/request';

export default {
  data() {
    return {
      unitID: '',
      name: '',
      region: '',
      score: '',
      description: '',
    };
  },
  methods:
  {
    getInfo() {
      const ID = this.unitID;
      service.get('/unit', { params: { ID: this.unitID } }).then((record) => {
        this.description = record.description;
        this.name = record.name;
      });
      service.get('/record', { params: { ID: this.unitID, state: 1, timestamp: 123 } }).then((record) => {
        this.region = record.region;
      });
      bc.getScore({ unitID: ID }).then((score) => {
        this.score = score;
      });
    },
  },
};
</script>
