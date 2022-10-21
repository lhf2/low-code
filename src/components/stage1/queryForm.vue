<template>
    <div class="query-form">
        <el-form ref="queryForm" :inline="true" :model="queryModal">
            <template v-for="item, index in form" :key="index">
                <FormItem :item="item" v-bind="item" v-model="queryModal[item.model]"/>
            </template>
            <el-form-item>
                <el-button type="primary" @click="handleQuery">查询</el-button>
                <el-button @click="handleReset">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script setup>
import { reactive, ref } from 'vue'
import FormItem from './FormItem.vue'

const props = defineProps({
    form: Array,
    modelValue: Object
})

const emit = defineEmits(['update:modelValue', 'handleQuery'])

// 初始化用户表单对象
const queryModal = reactive({
    ...props.modelValue
});

// 表单 ref
const queryForm = ref(null)

// 查询
const handleQuery = () => {
    emit('update:modelValue', {...queryModal})
    emit('handleQuery', {...queryModal})
}

// 重置
const handleReset = () => {
    queryForm.value.resetFields();
}


</script>