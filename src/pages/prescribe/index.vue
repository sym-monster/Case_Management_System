<template>
  <div class="content" style="width: 1200px">
    <el-form :model="form" label-width="auto" style="max-width: 1200px">
      <el-row>
        <el-col :span="16">
          <el-form-item label="姓名">
            <el-input v-model="form.name" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
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
          v-model="form.time"
          type="date"
          placeholder="请选择就诊时间"
          :disabled-date="disabledDate"
        />
      </el-form-item>

      <el-form-item label="家庭住址">
        <el-select
          v-model="form.region"
          placeholder="请选择家庭住址"
          style="height: 60px"
        >
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
        <el-input
          v-model="form.diagnose"
          type="textarea"
          :autosize="{ minRows: 1, maxRows: 10 }"
          style="font-size: 30px; min-height: 60px"
        />
      </el-form-item>
      <el-form-item label="处方">
        <el-input
          v-model="form.desc"
          type="textarea"
          :autosize="{ minRows: 1, maxRows: 10 }"
          style="font-size: 30px; min-height: 60px"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { ref, onMounted, nextTick } from "vue";
import request from '@/utils/request';

// do not use same name with ref
const form = reactive({
  name: "",
  gender: "",
  time: "",
  region: "",
  telephone: "",
  sensitives: [],
  delivery: false,
  diagnose: "",
  desc: "",
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
const addSensitive = async (index: any) => {
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
const removeInput = (index: any) => {
  sensitives.value.splice(index, 1); // 删除指定索引的输入框
};

// 提交表单数据
const submit = async () => {
  const payload = {
    ...form,
    sensitives: sensitives.value.filter((item) => item.trim() !== ""),
  };
  try{
    const submitCaseManagement = await request.post("/add",payload);
    console.log(submitCaseManagement)
  }catch(error){
    console.error("Error submitting from", error)
  }
};
</script>


<style scoped lang="scss">
::v-deep .el-textarea__inner {
  min-height: 60px;
  padding: 0 10px;
}
::v-deep .el-form-item {
  display: flex;
  align-items: center;
}

::v-deep .el-input,
.el-radio.el-radio--large,
.el-select__wrapper {
  height: 60px;
}

::v-deep .el-input__wrapper,
.el-select__wrapper {
  padding: 0 10px;
}

::v-deep .el-input__inner,
.el-radio.el-radio--large {
  height: 100%;
  font-size: 30px;
  // font-family: Georgia, serif;
}

.content {
  display: flex;
  margin: 20px 0 20px 0;
  width: 500px;

  .el-form {
    --el-form-label-font-size: 30px;
    font-family: Georgia, serif;

    .el-row {
      width: 800px;
      display: felx;
      align-items: center;
    }
  }

  .sensitive-container {
    display: flex;
    align-items: center;
  }
}
</style>