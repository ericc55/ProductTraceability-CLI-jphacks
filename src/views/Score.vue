<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 评分
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-input
        v-model="input"
        size="large"
        style="width: 80%; margin: auto"
        placeholder="请输入生产单位ID"
      />
    </div>
    <div class="container">
      <el-rate
        v-model="value"
        :texts="['太差了', '不尽人意', '一般', '还不错', '非常棒']"
        show-text
        allow-half
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
        >提交评价</el-button
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
      input: '',
    };
  },
  methods: {
    open() {
      this.$confirm('我保证评价内容属实且对评价负责', '确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          const address = sessionStorage.getItem('user_address');
          console.log(`address:${address}`);
          bc.score(address, { unitID: this.input, point: this.value });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          });
        });
    },
  },
};
</script>
