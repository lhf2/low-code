<template>
    <VueForm />
</template>
<script setup>
import { defineComponent, h, ref, resolveComponent } from "@vue/runtime-core"

const props = defineProps({
    modelValue: Object,
    schema: Object
})

// 定义一个 form 组件以及其 ref 属性
const form = defineComponent({
    setup(props, { attrs, slots, emit }) {
        const formRef = ref(null)
        return () => {
            return h('el-form', {
                ref: formRef,
                ...attrs
            }, slots)
        }

    }
})


// render 函数
const VueForm = () => {
    return h(form, {}, h('div', 111))
}
</script>