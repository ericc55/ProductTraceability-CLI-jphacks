<template>
  <div class="header" style="background: #529b2e">
    <!-- 折叠按钮 -->
    <div class="collapse-btn" @click="collapseChage">
      <i v-if="!collapse" class="el-icon-s-fold"></i>
      <i v-else class="el-icon-s-unfold"></i>
      <el-switch
        v-model="value2"
        class="mt-2"
        style="margin-left: 24px"
        inline-prompt
        :active-icon="Check"
        :inactive-icon="Close"
      />
      <edit style="width: 1em; height: 1em; margin-right: 8px" />
    </div>
    <el-icon><edit /></el-icon>
    <div class="logo">农鲜产品溯源系统</div>
    <div class="header-right">
      <div class="header-user-con">
        <template v-if="!connected">
            <el-button @click="get">连接钱包</el-button>
        </template>
        <template v-if="!connected">
            <el-button @click="openCommitBox">注册</el-button>
        </template>

        <!-- 用户名下拉菜单 -->
        <template v-if="true">
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            {{ username }}
            <i class="el-icon-caret-bottom"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="credit">查看账户信用点</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { ElMessage, ElMessageBox } from 'element-plus';
import service from '../utils/request';
import * as bc from '../blockchain';

export default {
  name: 'HeaderComp',
  computed: {
  },
  setup() {
    const username = sessionStorage.getItem('user_address');
    const message = 2;
    const store = useStore();
    const collapse = computed(() => store.state.collapse);

    // 侧边栏折叠
    const collapseChage = () => {
      store.commit('handleCollapse', !collapse.value);
    };
    const signinBox = () => {
      ElMessageBox.alert('恭喜，已成功登录', '登录成功', {
        confirmButtonText: 'OK',
      });
    };
    const notRegisteredBox = () => {
      ElMessageBox.alert('身份证有误', '注册失败', {
        confirmButtonText: 'OK',
      });
    };
    const openCommitBox = () => {
      const address = sessionStorage.getItem('user_address');
      console.log(`judge:${address}`);
      bc.isUserRegistered(address).then((flag) => {
        console.log('registered:');
        console.log(flag);
        if (flag) {
          signinBox();
        } else {
          ElMessageBox.prompt('请输入居民身份证号码', '当前地址未注册账号', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
          })
            .then(({ value }) => { // 确认
              service.get('/checkID', { params: { ID: value } }).then((res) => {
                console.log(res);
                try {
                  if (!res.result) {
                    notRegisteredBox();
                    throw new Error('身份证错误');
                  }
                  console.log(address, value);
                  bc.callUserRegister(address, { id: value }).then((flag1) => {
                    console.log('flag:', flag1);
                    if (!flag1) {
                      ElMessage({
                        type: 'info',
                        message: '注册失败：身份证已被注册',
                      });
                    } else {
                      bc.sendUserRegister(address, { id: value }).catch((err) => {
                        console.log(err);
                      });
                      sessionStorage.setItem('user_address', address);
                      signinBox();
                    }
                  });
                } catch (err) {
                  ElMessage({
                    type: 'info',
                    message: `注册失败:${err}`,
                  });
                }
              });
            })
            .catch(() => {
              ElMessage({
                type: 'info',
                message: '注册失败',
              });
            });
        }
      });
    };
    const get = () => {
      if (window.ethereum) {
        window.ethereum.enable().then((res) => {
          const address = res[0];
          console.log(`login as:${address}`);
          sessionStorage.setItem('user_address', address);
          // bc.confirm(address, { productID: '123', state: 1 }).then((one) => {
          //   console.log(one);
          // });
        });
      } else {
        alert('请安装MetaMask钱包');
      }
    };

    onMounted(() => {
      if (document.body.clientWidth < 1500) {
        collapseChage();
      }
      const addr = sessionStorage.getItem('user_address');
      bc.getCredit(addr).then((credit) => {
        this.credit = credit;
      });
    });

    // 用户名下拉菜单选择事件
    const handleCommand = (command) => {
      if (command === 'credit') {
        bc.getCredit().then((credit) => {
          ElMessageBox.alert(`该账号信用点为 ${credit} 点`, '信用点', {
            confirmButtonText: 'OK',
          });
        });
      }
    };

    return {
      username,
      credit: 0,
      connected: false,
      message,
      collapse,
      collapseChage,
      get,
      handleCommand,
      openCommitBox,
    };
  },
};
</script>
<style scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #fff;
}
.collapse-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 70px;
}
.header .logo {
  float: left;
  width: 250px;
  line-height: 70px;
}
.header-right {
  float: right;
  padding-right: 50px;
}
.header-user-con {
  display: flex;
  height: 70px;
  align-items: center;
}
.btn-fullscreen {
  transform: rotate(45deg);
  margin-right: 5px;
  font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
  position: relative;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
}
.btn-bell-badge {
  position: absolute;
  right: 0;
  top: -2px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
  color: #fff;
}
.btn-bell .el-icon-bell {
  color: #fff;
}
.user-name {
  margin-left: 10px;
}
.user-avator {
  margin-left: 20px;
}
.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}
.el-dropdown-menu__item {
  text-align: center;
}
</style>
