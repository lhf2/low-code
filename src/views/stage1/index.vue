<template>
    <div class="user-manage">
        <QueryForm :form="queryform" v-model="user" @handleQuery="handleQuery"/>
        <div class="base-table">
            <el-table :data="userList" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" />
                <el-table-column v-for="item in columns" :key="item.prop" :prop="item.prop" :label="item.label"
                    :width="item.width" :formatter="item.formatter">
                </el-table-column>
                <el-table-column label="操作" width="160">
                    <template #default="scope">
                        <el-button @click="handleEdit(scope.row)" size="mini">编辑</el-button>
                        <el-button type="danger" size="mini" @click="handleDel(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination class="pagination" background layout="prev, pager, next" :total="pager.total"
                :page-size="pager.pageSize" @current-change="handleCurrentChange" />
        </div>
    </div>
</template>
<script setup>
import { reactive, ref } from 'vue'
// 初始化用户表单对象
// 这里使用 ref 是因为触发 update:modelValue 事件时，reactive 会有问题；
const user = ref({
    state: 0
});

// 初始化用户列表数据
const userList = reactive([
    {
        "userId": 1,
        "userName": '111',
        "userEmail": '123@qq.com',
        "role": 0,
        "state": 1,
    }
])

// 查询表单
const queryform = [
    {
        type: 'input',
        label: "用户ID",
        model: 'userId',
        placeholder: '请输入用户ID'
    },
    {
        type: 'input',
        label: "用户名称",
        model: 'userName',
        placeholder: '请输入用户名称'
    },
    {
        type: 'select',
        label: "状态",
        model: 'state',
        placeholder: '请选择所属状态',
        options: [{
            label: '所有',
            value: 0
        },
        {
            label: '在职',
            value: 1
        },
        {
            label: '离职',
            value: 2
        },
        {
            label: '试用期',
            value: 3
        }]
    }
]
// 初始化分页对象
const pager = reactive({
    pageNum: 1,
    pageSize: 10,
});

// 定义动态表格-格式
const columns = reactive([
    {
        label: "用户ID",
        prop: "userId",
    },
    {
        label: "用户名",
        prop: "userName",
    },
    {
        label: "用户邮箱",
        prop: "userEmail",
    },
    {
        label: "用户角色",
        prop: "role",
        formatter(row, column, value) {
            return {
                0: "管理员",
                1: "普通用户",
            }[value];
        },
    },
    {
        label: "用户状态",
        prop: "state",
        formatter(row, column, value) {
            return {
                1: "在职",
                2: "离职",
                3: "试用期",
            }[value];
        },
    }
]);

// 查询
const handleQuery = () => {
    console.log('handleQuery', user.value)
}

// 表格多选
const handleSelectionChange = (list) => {
    console.log('handleSelectionChange')
};

const handleEdit = (row) => {
    console.log('handleEdit', row);
}

const handleDel = (row) => {
    console.log('handleDel', row);
}


</script>
<style scoped>
.user-manage {
    padding: 30px;
}
</style>
