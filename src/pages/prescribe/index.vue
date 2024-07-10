<template>
    <div class="content">
        <el-form :model="form" label-width="auto" style="max-width: 600px; font-size:24px !important;">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="姓名">
                        <el-input v-model="form.name" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="性别">
                        <el-input v-model="form.sex" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="就诊时间">
                <el-date-picker v-model="value" type="date" placeholder="请选择就诊时间" :disabled-date="disabledDate" />
            </el-form-item>
            <el-form-item label="家庭住址">
                <el-select v-model="form.region" placeholder="请选择家庭住址">
                    <el-option label="Zone one" value="shanghai" />
                    <el-option label="Zone two" value="beijing" />
                </el-select>
            </el-form-item>
            <el-form-item label="过敏原">
                <div class="sensitive-container" v-for="(sensitive, index) in sensitives" :key="index">
                    <el-input v-model="sensitives[index]" ref="sensitiveRefs" placeholder="对什么药物过敏"
                        @keyup.enter="addSensitive(index)" />
                    <!-- 如果是第一个输入框，不显示删除按钮 -->
                    <el-button v-if="index > 0" type="link" @click="removeInput(index)">
                        删除
                    </el-button>
                </div>
            </el-form-item>
            <el-form-item label="是否初次就诊">
                <el-switch v-model="form.delivery" />
            </el-form-item>
            <el-form-item label="Activity type">
                <el-checkbox-group v-model="form.type">
                    <el-checkbox value="Online activities" name="type">
                        Online activities
                    </el-checkbox>
                    <el-checkbox value="Promotion activities" name="type">
                        Promotion activities
                    </el-checkbox>
                    <el-checkbox value="Offline activities" name="type">
                        Offline activities
                    </el-checkbox>
                    <el-checkbox value="Simple brand exposure" name="type">
                        Simple brand exposure
                    </el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="Resources">
                <el-radio-group v-model="form.resource">
                    <el-radio value="Sponsor">Sponsor</el-radio>
                    <el-radio value="Venue">Venue</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="Activity form">
                <el-input v-model="form.desc" type="textarea" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary">Create</el-button>
                <el-button>Cancel</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { ref, onMounted, nextTick } from 'vue'
// do not use same name with ref
const form = reactive({
    name: '',
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
})
// 初始化日期为当天
const value = ref(new Date().toISOString().substr(0, 10));
// 禁用后边的日期
const disabledDate = (time: Date) => {
    return time.getTime() > Date.now()
}

const sensitives = ref([''])
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
        if (sensitives.value[index].trim() !== '') {
            sensitives.value.push('');
            await nextTick();
            sensitiveRefs.value[sensitiveRefs.value.length - 1].focus();
        }
        // 删除数组空元素
        // sensitives.value = sensitives.value.filter(item => item !== "");
        // console.log(sensitives.value)
    }
}
// 删除指定过敏原
const removeInput = (index) => {
    sensitives.value.splice(index, 1); // 删除指定索引的输入框
}


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