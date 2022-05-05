<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 生产单位注册
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="container">
      选择生产单位所在地：
      <el-cascader
      size="large"
      :options="options"
      v-model="selectedOptions"
      @change="handleChange">
    </el-cascader>
    </div>
    <div class="container">
      输入生产单位名称：
      <el-input size="medium" v-model="name" placeholder="请输入生产单位名称"></el-input>
    </div>
    <div class="container">
      输入生产单位公钥：
      <el-input size="medium" v-model="publicKey" placeholder="请输入生产单位公钥"></el-input>
    </div>
     <div class="container">
      输入生产单位简介：
      <el-input size="medium" v-model="description" placeholder="请输入生产单位公钥"></el-input>
    </div>
    <div class="container">
      <el-button
        size="large"
        type="success"
        style="margin: auto"
        round
        @click="register"
        auto-insert-space="true"
        >注册</el-button
      >
    </div>
  </div>
</template>

<script>
import { regionData } from 'element-china-area-data';
import { ElMessageBox } from 'element-plus';
import * as bc from '../blockchain';
import service from '../utils/request';

export default {
  data() {
    return {
      publicKey: '',
      name: '',
      addrCode: '',
      description: '',
      options: regionData,
      selectedOptions: [],
    };
  },

  methods: {
    handleChange(value) {
      console.log(value[2]);
      // eslint-disable-next-line prefer-destructuring
      this.addrCode = value[2];
    },
    register() {
      const address = sessionStorage.getItem('user_address');
      bc.registerUnit(
        address,
        { name: this.name, address: this.publicKey, addrCode: this.addrCode },
      ).then(() => {
        bc.getUnitID(this.publicKey).then((id) => {
          console.log(id, this.name, this.description);
          service.post('/unit', { ID: parseInt(id, 10), name: this.name, description: this.description });
          this.signinBox();
        });
      });
    },
    signinBox() {
      ElMessageBox.alert(`恭喜，已成功注册公钥地址为${this.publicKey}的生产单位！`, '注册成功', {
        confirmButtonText: 'OK',
      });
    },
  },
};
</script>
