<template>
    <el-form-item :prop="item.model">
        <!-- 
            使用 v-bind="$attrs" 实现透传，
            输入内容的时候会自动调用 update:modalValue 修改值，
            从而修改 v-model 绑定的值 
        -->
        <el-input v-if="item.type === 'input'" :placeholder="item.placeholder" v-bind="$attrs"></el-input>
        <el-select v-if="item.type === 'select'" v-bind="$attrs">
            <el-option v-for="option,index in item.options" :key="index" v-bind="option"></el-option>
        </el-select>
    </el-form-item>
</template>
<script setup>
const props = defineProps({
    item: Object
})
</script>