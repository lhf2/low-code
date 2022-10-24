<template>
    <div>
        <VueForm v-model="formData" :schema="schema" :ui-schema="uiSchema" :error-schema="errorSchema"
            :custom-formats="customFormats"></VueForm>
        <el-button @click="test">测试formData的值是否改变</el-button>
    </div>

</template>

<script setup>
import { reactive, ref } from '@vue/reactivity';

// TODO:这里使用 ref 是因为触发 update:modelValue 事件时，reactive 会有问题
const formData = ref({
    "firstName": "Jun",
    "lastName": "Liu",
    "password": "My.Pass",
    "telephone": "1881446xxxx"
})

const test = () => {
    // 获取到最新的值
    console.log('formData', formData.value);
}

const schema = {
    "title": "测试注册表单",
    "description": "A simple form example.",
    "type": 'object',
    "required": [
        "firstName",
        "lastName"
    ],
    "properties": {
        "firstName": {
            "type": "string",
            "title": "First name",
            "default": "Jun"
        },
        "lastName": {
            "type": "string",
            "title": "Last name",
            "err:required": "必须输入Last Name"
        },
        "age": {
            "type": "integer",
            "title": "Age",
            "maximum": 20,
            "minimum": 10,
            "default": 16,
        },
        "password": {
            "type": "string",
            "title": "Password",
            "minLength": 3
        },
        "bio": {
            "type": "string",
            "title": "Bio",
            "minLength": 10,
            "default": "我是默认的bio"
        },
        "price": {
            "type": "string",
            "description": "最多输入两位小数点，最大值 999999.99",
            "title": "价格",
            "format": "price"
        },
        "hobbies": {
            "type": "number",
            "title": "爱好",
            "enum": [
                1,
                2,
                3
            ],
            "enumNames": [
                "吃饭",
                "睡觉",
                "打豆豆"
            ],
            "default": 1
        }
    }
}

const uiSchema = {
    "ui:title": "表单标题",
    "ui:description": "-------------- 表单描述 --------------",
    "password": {
        "ui:options": {
            "placeholder": "请输入你的密码",
            "type": "password",
        }
    },
    "bio": {
        "ui:options": {
            "placeholder": "请输入你的签名",
            "type": "textarea",
            "rows": 6
        }
    },
    "hobbies": {
        "ui:widget": "SelectWidget",
    }
}

const errorSchema = {
    "bio": {
        "err:minLength": "签名最小长度10个字符串"
    }
}

const customFormats = {
    price(value) {
        return value !== '' && /^[0-9]\d*$|^\d+(\.\d{1,2})$/.test(value) && value >= 0 && value <= 999999.99;
    }
}

</script>