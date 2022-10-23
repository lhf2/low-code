<template>
    <div>
        <VueForm v-model="formData" :schema="schema" :errorSchema="errorSchema"></VueForm>
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

const schema = {
    type: 'object',
    required: [
        'userName',
        'age'
    ],
    properties: {
        userName: {
            type: 'string',
            title: '用户名',
            default: '默认的userName',
        },
        age: {
            type: 'number',
            title: '年龄'
        },
        bio: {
            type: "string",
            title: "Bio",
            minLength: 10,
            default: "我是默认的bio"
        },
        
    }
}

const errorSchema = {
    "bio": {
        "err:minLength": "签名最小长度10个字符串"
    }
}

</script>