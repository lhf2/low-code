import { defineComponent, h, ref, watch } from "@vue/runtime-core"
import { resolveComponent } from '../utils/common.js'
import objectField from "./Field/objectField/index.js";

export default{
    name: 'VueForm',
    props: ['modelValue', 'schema', 'errorSchema', 'uiSchema', 'customFormats'],
    emits: ['update:modelValue'],
    setup(props, {slots, emit }) {
        // 定义一个 form 组件以及其 ref 属性
        const form = defineComponent({
            inheritAttrs: false,
            setup(props, { attrs, slots, emit }) {
                const formRef = ref(null)
                return () => {
                    return h(resolveComponent('el-form'), {
                        ref: formRef,
                        ...attrs
                    }, slots)
                }

            }
        })

        // 将传入的 v-model 值 跟 schema 里面的默认值做合并
        let rootFormData = ref({})
        const properties = props.schema.properties
        const propertiesKeys = Object.keys(properties || {})
        propertiesKeys.map(v => {
            let child = properties[v]
            if (props.modelValue[v]) {
                rootFormData.value[v] = props.modelValue[v]
            } else if (child.default) {
                rootFormData.value[v] = child.default
            }
        })

        // 更新formData 修改使用方外层的值
        const emitFormDataChange = (newValue, oldValue) => {
            emit('update:modelValue', newValue);
        };

        watch(rootFormData, (newValue, oldValue) => {
            emitFormDataChange(newValue, oldValue);
        }, {
            deep: true
        });
        
        return () => {
            return h(form, {
                model: rootFormData,
            }, h(objectField, {
                ...props,
                rootFormData
            }))
        }
    }
}