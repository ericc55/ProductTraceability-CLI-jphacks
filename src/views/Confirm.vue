<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 更新溯源信息
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-input
        v-model="code"
        size="large"
        style="width: 80%; margin: auto"
        placeholder="请输入产品溯源码"
      />
    </div>
    <div class="container">
      <el-select v-model="state" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <div class="container">
        <el-button
          size="large"
          type="success"
          style="margin: auto"
          round
          @click="open_dialog"
          auto-insert-space="true"
          >提交更新</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { mapState, useStore } from 'vuex';
import * as bc from '../blockchain';

const store = useStore();
export default {
  name: 'score',
  data() {
    return {
      code: '',
      state: '',
      input: '',
      options: [
        {
          value: '1',
          label: '生产',
        },
        {
          value: '2',
          label: '运入',
        },
        {
          value: '3',
          label: '运出',
        },
        {
          value: '4',
          label: '进口',
        },
      ],
    };
  },
  methods: {
    open_dialog() {
      const that = this;
      this.$confirm('我保证投诉内容属实且对评价负责', '确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          that.handle_confirm();
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          });
        });
    },
    handle_confirm() {
      console.log(computed(() => store.state.address));
      console.log(this.code);
      const address = sessionStorage.getItem('user_address');
      console.log(address);
      bc.confirm(address, { productID: this.code, state: this.state });
    },
  },
  computed: {
    ...mapState({
      address: (state) => state.address,
    }),
  },
};
</script>
