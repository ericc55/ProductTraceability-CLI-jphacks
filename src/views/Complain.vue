<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 投诉生产单位
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-input
        v-model="unitID"
        size="large"
        style="width: 80%; margin: auto"
        placeholder="请输入生产单位ID"
      />
    </div>
    <div class="container">
      <el-button
        size="large"
        type="success"
        style="margin: auto"
        round
        auto-insert-space="true"
        @click="open"
        >提交投诉</el-button
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
      unitID: '',
    };
  },
  methods: {
    open() {
      this.$confirm('我保证投诉内容属实且对评价负责', '确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          const address = sessionStorage.getItem('user_address');
          bc.complain(address, { unitID: this.unitID });
          this.$message({
            type: 'success',
            message: '投诉成功!',
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消投诉',
          });
        });
    },
  },
};
</script>
