<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 生成溯源码
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-button
        size="large"
        type="success"
        style="margin: auto"
        round
        @click="generate"
        auto-insert-space="true"
        >生成溯源码</el-button
      >
    </div>
    <div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="value" label="溯源码" width="800">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import * as bc from '../blockchain';

export default {
  name: 'baseform',
  data() {
    return {
      value: 0,
      tableData: [
        {
          value: '溯源码将会在此处生成',
        },
      ],
    };
  },
  methods: {
    generate() {
      const address = sessionStorage.getItem('user_address');
      console.log(`address:${address}`);
      const unixTime = Math.floor(Date.now());
      bc.generateProductID(address, { time: unixTime }).then((res) => {
        console.log(res);
        this.tableData[0].value = res;
      });
    },
  },
};
</script>
