<template>
    <div class="content">
      <el-form
        :model="form"
        label-width="auto"
        style="max-width: 600px; font-size: 24px !important"
      >
            <el-form-item label="处方名">
              <el-input v-model="form.name" />
            </el-form-item>  

        <el-form-item label="主治">
          <el-input v-model="form.major" />
        </el-form-item>
        <el-form-item label="处方">
          <el-input v-model="form.prescription" type="textarea" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary">提交</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { reactive } from "vue";
  import { ref, onMounted, nextTick } from "vue";
  import { regionData, CodeToText, TextToCode } from "element-china-area-data"
  
  const userForm = reactive({
    areaCode: "",
    cityCode: "",
    provinceCode: "",
  });
   
  //regionData是不带全部，regionDataPlus带全部选项
  //如果需要使用regionDataPlus，记得引入
  const options = ref(regionData);
  const selectedOptions = ref([]);
   
  const handleChange = () => {
    if (
      selectedOptions.value[0] != null &&
      selectedOptions.value[1] != null &&
      selectedOptions.value[2] != null
    ) {
     //这里可以根据你需要的数据格式来设置省市区显示
      userForm.provinceCode = selectedOptions.value[0];
      userForm.cityCode = selectedOptions.value[1];
      userForm.areaCode = selectedOptions.value[2];
    }
  }
  
  
  // do not use same name with ref
  const form = reactive({
    name: "",
    major: "",
    prescription: ""
  });
  // 初始化日期为当天
  const value = ref(new Date().toISOString().substr(0, 10));
  // 禁用后边的日期
  const disabledDate = (time: Date) => {
    return time.getTime() > Date.now();
  };
  
  const sensitives = ref([""]);
  const sensitiveRefs = ref([]);
  // 添加过敏原
  const addSensitive = async (index) => {
    // 检查是否是最后一个输入框
    if (index === sensitives.value.length - 1) {

      if (sensitives.value[index].trim() !== "") {
        sensitives.value.push("");
        await nextTick();
        sensitiveRefs.value[sensitiveRefs.value.length - 1].focus();
      }
 
    }
  };
  // 删除指定过敏原
  const removeInput = (index) => {
    sensitives.value.splice(index, 1); // 删除指定索引的输入框
  };
  </script>
  
  
  <style scoped lang="scss">
  .content {
    display: flex;
    margin: 20px 0 20px 0;
    width: 500px;
    .sensitive-container {
      display: flex;
      align-items: center;
    }
  }
  </style>