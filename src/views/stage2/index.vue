<template>
    <div>
        <VueForm v-model="formData" :schema="schema"></VueForm>
        <el-button @click="test">测试formData的值是否改变</el-button>
    </div>
    
</template>

<script setup>
import { reactive, ref } from '@vue/reactivity';

// TODO:这里使用 ref 是因为触发 update:modelValue 事件时，reactive 会有问题；
const formData = ref({
    userName: '表单的userName',
    age: 18
})

const test = () => {
    // 获取到最新的值
    console.log('formData', formData.value);
}

const schema = reactive({
    type: 'object',
    properties: {
        userName: {
            type: 'string',
            title: '用户名',
            default: '默认的userName',
        },
        age: {
            type: 'number',
            title: '年龄'
        }
    }
})

</script>