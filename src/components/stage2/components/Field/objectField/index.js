import { h } from "@vue/runtime-core"
import FieldGroupWrap from '../../FieldGroupWrap.vue'
import Widget from '../../Widget.js';
import WIDGET_MAP from '../../WIDGET_MAP.js'
import { getUserUiProps, getUserUiOptions, isDependOn } from '../../../utils/formUtils.js'


export default {
    name: "ObjectFiled",
    props: ['schema', 'errorSchema', 'uiSchema', 'customFormats', 'rootFormData'],
    setup(props, { slots, emit }) {
        return () => {
            const rootFormData = props.rootFormData

            // 获取整个
            const uiOptions = getUserUiProps({
                schema: props.schema,
                uiSchema: props.uiSchema
            })


            // 递归渲染子组件
            const properties = props.schema.properties
            const propertiesKeys = Object.keys(properties || {})
            const children = propertiesKeys.map(v => {
                let child = properties[v]
                // 获取依赖以及是否触发依赖
                // isDependency：当前是否被依赖
                // curDependent：是否触发依赖
                const { isDependency, curDependent } = isDependOn(rootFormData.value, props.schema, v)
                let uiPropsItem = props.uiSchema && getUserUiProps({
                    schema: child,
                    uiSchema: props.uiSchema[v],
                })

                return (isDependency && uiOptions.onlyShowIfDependent && !curDependent) ? null : h(Widget, {
                    widget: WIDGET_MAP[uiPropsItem.widget] || WIDGET_MAP.types[child.type],
                    required: props.schema.required.includes(v) || curDependent,
                    rootFormData: rootFormData.value,
                    curNodePath: v,
                    schema: props.schema,
                    uiSchema: props.uiSchema[v],
                    errorSchema: props.errorSchema[v],
                    child: child,
                    // 获取ui options
                    uiProps: uiPropsItem,
                    customFormats: props.customFormats
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

            return h(FieldGroupWrap, {
                title: uiOptions.title,
                description: uiOptions.description,
            }, children)
        }
    }
}