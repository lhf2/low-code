import { defineComponent, h, reactive, ref, resolveComponent, watch } from "@vue/runtime-core"
import WIDGET_MAP from './WIDGET_MAP.js'
import Widget from './Widget.js';
export default{
    name: 'VueForm',
    props: ['modelValue', 'schema'],
    emits: ['update:modelValue'],
    setup(props, {slots, emit }) {
        console.log('modelValue', props.modelValue);
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

        // 递归渲染子组件
        const children = propertiesKeys.map(v => {
            let child = properties[v]
            return h(Widget, {
                widget: WIDGET_MAP.types[child.type],
                rootFormData: rootFormData.value,
                curNodePath: v,
                schema: props.schema,
                child: child
            })
            
            // TODO: 不懂为什么这种方式不能输入东西，非得抽离出来一个单独的组件 Widget.js
            // return h(resolveComponent('el-form-item'), {
            //     label: child.title,
            //     labelWidth: 90,
            // }, h(resolveComponent(WIDGET_MAP.types[child.type]), {
            //     // v-model
            //     modelValue: rootFormData.value[v],
            //     "onUpdate:modelValue": function updateModelValue(event) {
            //         const prevVal = rootFormData.value[v];
            //         if (prevVal != event) {
            //             rootFormData.value[v] = event
            //         }
            //     }
            // }))
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
                modal: rootFormData,
            }, children)
        }
    }
}