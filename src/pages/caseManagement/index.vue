<template>
  <div class="content">
    <el-table :data=hasCaseManagementlArr stripe style="width: 100%">
      <el-table-column prop="name" label="姓名" width="100px"/>
      <el-table-column prop="time" label="就诊时间"  width="200px"/>
      <el-table-column prop="telephone" label="电话"  width="200px"/>
      <el-table-column prop="delivery" label="是否首次就诊"  width="200px"/>
      <el-table-column label="操作" width="100px" >
      <template #default="{ row }">
        <el-button link @click="viewDetails(row)">查看</el-button>
        <el-button link @click="viewDetails(row)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from '@/utils/request';
import type { ResponseData, Content } from '@/api/type';
import { CaseManagements } from '@/api/index';

let hasCaseManagementlArr = ref<Content>([]);
onMounted(() => {
  getCaseManagementInfo();
});
// 获取已有的医院的数据
const getCaseManagementInfo = async () => {
  // 获取医院的数据：默认获取第一页
  let result: ResponseData = await CaseManagements();
  if (result.status == "success") {
    // 存储已有的医院的数组
    hasCaseManagementlArr.value = result.caseManagements;
    console.log(hasCaseManagementlArr.value);
    // 存储医院的总个数
    // total.value = result.data.totalElements;
  }
  // console.log(result);
};
</script>

<style scoped lang="scss">
div{
  font-size: 25px;
  padding: 0;
}
.content {
  display: flex;
  font-size: 30px !important;
}
</style>