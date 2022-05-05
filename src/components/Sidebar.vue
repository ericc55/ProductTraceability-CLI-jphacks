<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="collapse"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#95d475"
      unique-opened
      router
    >
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-sub-menu :index="item.index" :key="item.index">
            <template #title>
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-sub-menu
                v-if="subItem.subs"
                :index="subItem.index"
                :key="subItem.index"
              >
                <template #title>{{ subItem.title }}</template>
                <el-menu-item
                  v-for="(threeItem, i) in subItem.subs"
                  :key="i"
                  :index="threeItem.index"
                >
                  {{ threeItem.title }}</el-menu-item
                >
              </el-sub-menu>
              <el-menu-item v-else :index="subItem.index" :key="subItem.index"
                >{{ subItem.title }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <template #title>{{ item.title }}</template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { ElSubMenu } from 'element-plus';

export default {
  name: 'SideBar',
  components: { ElSubMenu },
  setup() {
    const items = [
      {
        icon: 'el-icon-lx-home',
        index: '/dashboard',
        title: '系统首页',
      },
      {
        icon: 'el-icon-lx-location',
        index: '/trace',
        title: '开始溯源',
      },
      {
        icon: 'el-icon-lx-like',
        index: '/score',
        title: '为生产单位评分',
      },
      {
        icon: 'el-icon-lx-comment',
        index: '/complain',
        title: '投诉生产单位',
      },
      {
        icon: 'el-icon-lx-link',
        index: '/generate',
        title: '生成溯源码',
      },
      {
        icon: 'el-icon-lx-refresh',
        index: '/confirm',
        title: '更新溯源信息',
      },
      {
        icon: 'el-icon-lx-filter',
        index: '/handleComplain',
        title: '处理投诉',
      },
      {
        icon: 'el-icon-lx-service',
        index: '1',
        title: '账号管理',
        subs: [
          {
            index: '/accountOperate',
            title: '封禁与解封',
          },
          {
            index: '/unitRegister',
            title: '生产单位注册',
          },
        ],
      },
      {
        icon: 'el-icon-lx-search',
        index: '6',
        title: '全局查询',
        subs: [
          {
            index: '/globalTrace',
            title: '查溯源信息',
          },
          {
            index: '/globalSanction',
            title: '查封禁生产单位信息',
          },
          {
            index: '/globalComplain',
            title: '查投诉信息',
          },
          {
            index: '/globalHandleComplain',
            title: '查投诉处理信息',
          },
          {
            index: '/globalUnitRegister',
            title: '查生产单位注册信息',
          },
        ],
      },

    ];

    const route = useRoute();

    const onRoutes = computed(() => route.path);

    const store = useStore();
    const collapse = computed(() => store.state.collapse);

    return {
      items,
      onRoutes,
      collapse,
    };
  },
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}
.sidebar > ul {
  height: 100%;
}
</style>
