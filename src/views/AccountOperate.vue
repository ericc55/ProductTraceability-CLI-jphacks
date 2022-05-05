<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 账号操作
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-input
        v-model="code"
        size="large"
        style="width: 80%; margin: auto"
        placeholder="请输入用户或生产单位ID"
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
          @click="commit"
          auto-insert-space="true"
          >提交更新</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import * as bc from '../blockchain';

export default {
  name: 'score',
  data() {
    return {
      code: '',
      state: 1,
      input: '',
      options: [
        {
          value: 1,
          label: '封禁用户',
        },
        {
          value: 2,
          label: '解封用户',
        },
        {
          value: 3,
          label: '封禁生产单位',
        },
        {
          value: 4,
          label: '解封生产单位',
        },
      ],
    };
  },
  methods: {
    commit() {
      const address = sessionStorage.getItem('user_address');
      switch (this.state) {
        case 1:
          bc.banUser(address, this.code);
          break;
        case 2:
          bc.userRecover(address, this.code);
          break;
        case 3:
          bc.sanction(address, this.code);
          break;
        case 4:
          bc.unitRecover(address, this.code);
          break;
        default:
          break;
      }
    },
  },
  computed: {
    ...mapState({
      address: (state) => state.address,
    }),
  },
};
</script>
