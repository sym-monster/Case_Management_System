<template>
  <div class="content">
    <el-form
      :model="form"
      label-width="auto"
      style="max-width: 600px; font-size: 24px !important"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="姓名">
            <el-input v-model="form.name" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item style="margin-left: 20px">
            <!-- <el-input v-model="form.sex" /> -->
            <el-radio-group v-model="form.gender" class="ml-4">
              <el-radio value="1" size="large">男</el-radio>
              <el-radio value="2" size="large">女</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="就诊时间">
        <el-date-picker
          v-model="value"
          type="date"
          placeholder="请选择就诊时间"
          :disabled-date="disabledDate"
        />
      </el-form-item>


      <el-form-item label="家庭住址">
        <el-select v-model="form.region" placeholder="请选择家庭住址">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="form.telephone" />
      </el-form-item>
      <el-form-item label="过敏原">
        <div
          class="sensitive-container"
          v-for="(sensitive, index) in sensitives"
          :key="index"
        >
          <el-input
            v-model="sensitives[index]"
            ref="sensitiveRefs"
            placeholder="对什么药物过敏"
            @keyup.enter="addSensitive(index)"
          />
          <!-- 如果是第一个输入框，不显示删除按钮 -->
          <el-button v-if="index > 0" type="link" @click="removeInput(index)">
            删除
          </el-button>
        </div>
      </el-form-item>
      <el-form-item label="是否初次就诊">
        <el-switch v-model="form.delivery" />
      </el-form-item>
      <el-form-item label="诊断">
        <el-input v-model="form.diagnose" />
      </el-form-item>
      <el-form-item label="Activity form">
        <el-input v-model="form.desc" type="textarea" />
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
  region: "",
  date1: "",
  date2: "",
  delivery: false,
  type: [],
  resource: "",
  desc: "",
  telephone: "",
  gender: "",
  diagnose: ""
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
    // sensitives.value.push(''); // 添加新输入框
    // nextTick(() => {
    //     // 聚焦到最新添加的输入框上
    //     const lastInput = document.querySelector('.el-input:last-of-type sensitive');
    //     if (lastInput) lastInput.focus();
    // });
    if (sensitives.value[index].trim() !== "") {
      sensitives.value.push("");
      await nextTick();
      sensitiveRefs.value[sensitiveRefs.value.length - 1].focus();
    }
    // 删除数组空元素
    // sensitives.value = sensitives.value.filter(item => item !== "");
    // console.log(sensitives.value)
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

  .sensitive-container {
    display: flex;
    align-items: center;
  }
}
</style>