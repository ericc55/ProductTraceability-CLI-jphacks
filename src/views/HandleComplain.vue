<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 处理投诉
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-input
        v-model="unitID"
        size="large"
        style="width: 80%; margin: auto"
        placeholder="请输入被投诉生产单位ID"
      />
    </div>
    <div calss="container">
      <el-select v-model="state" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div class="container">
      <el-button
        size="large"
        type="success"
        style="margin: auto"
        round
        auto-insert-space="true"
        @click="open"
        >确认处理</el-button
      >
    </div>
  </div>
</template>

<script>
import * as bc from '../blockchain';

export default {
  name: 'score',
  data() {
    return {
      value: 2.5,
      state: '',
      unitID: '',
      options: [
        {
          value: '0',
          label: '属实',
        },
        {
          value: '1',
          label: '一般',
        },
        {
          value: '2',
          label: '不属实',
        },
      ],
    };
  },
  methods: {
    open() {
      const address = sessionStorage.getItem('user_address');
      bc.HandleComplain(address, { unitID: this.unitID, result: this.state }).then(() => {

      });
    },
  },
};
</script>
