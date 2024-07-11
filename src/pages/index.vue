<template>
  <div class="middle">
    <div class="menu">
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
      >
        <el-menu-item index="/management/prescribe" @click="changeActive('/management/prescribe')">
            <el-icon><HotWater /></el-icon>
            <span>开处方</span>
        </el-menu-item>
        <el-menu-item index="/management/caseManagement" @click="changeActive('/management/caseManagement')">
          <el-icon><Memo /></el-icon>
          <span>病历管理</span>
        </el-menu-item>
        <el-menu-item index="/management/addPrescription" @click="changeActive('/management/addPrescription')">
          <el-icon><CirclePlus /></el-icon>
          <span>添加处方</span>
        </el-menu-item>
        <el-menu-item index="/management/prescribeManagement" @click="changeActive('/management/prescribeManagement')">
          <el-icon><Tickets /></el-icon>
          <span>处方管理</span>
        </el-menu-item>
      </el-menu>
    </div>

    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  CirclePlus,
  Memo,
  HotWater,
  Tickets,
} from '@element-plus/icons-vue'
import { useRouter, useRoute } from 'vue-router';
// 获取路由器
let $router = useRouter();
// 获取当前路由的信息
let $route = useRoute();

const changeActive = (path:string)=>{
  $router.push(path);
}
</script>

<style scoped lang="scss">
.middle{
  display:flex;
  justify-content: space-between;
  .menu{
    flex: 2;
    span{
      font-size: 20px;
    }
  }
  .content{
    flex: 8;
  }
}
</style>