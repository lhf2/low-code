/**
 * Created by Liu.Jun on 2020/4/23 11:24.
 */

import { h } from 'vue';
import validateError from '../utils/validateError.js'
import { resolveComponent } from '../utils/common.js'

export default {
    name: 'Widget',
    props: {
        schema: {
            type: Object,
            default: () => ({})
        },
        uiSchema: {
            type: Object,
            default: () => ({})
        },
        errorSchema: {
            type: Object,
            default: () => ({})
        },
        customFormats: {
            type: Object,
            default: () => ({})
        },
        rootFormData: {
            type: null
        },
        curNodePath: {
            type: String,
            default: ''
        },
        widget: {
            type: String,
            default: 'el-input'
        },
        child: {
            type: Object,
            default: () => ({})
        },
        uiProps: {
            type: Object,
            default: () => ({})
        },
        required: {
            type: Boolean,
            default: true
        }
    },
    setup(props, { emit }) {
        return () => {
            return h(
                resolveComponent('el-form-item'),
                {
                    labelWidth: 110,
                    prop: props.curNodePath,
                    rules: [
                        {
                            validator(rule, value, callback) {
                                const schemaItem = props.schema.properties[props.curNodePath]
                                const errorSchemaItem = props.errorSchema
                                const formValue = props.rootFormData[props.curNodePath]

                                // 使用 ajv 验证
                                const errors = validateError({
                                    schema: schemaItem,
                                    errorSchema: errorSchemaItem,
                                    customFormats: props.customFormats,
                                    formValue,
                                    required: props.required
                                });

                                // 存在校验不通过字段
                                if (errors && errors.length > 0) {
                                    if (callback) return callback(errors[0].message);
                                    return Promise.reject(errors[0].message);
                                }

                                // 校验成功
                                if (callback) return callback();
                                return Promise.resolve();
                            },
                            trigger: 'change'
                        }
                    ]
                },
                {
                    // label 的展示，包括必填的*
                    // 不能使用 required，会有英文提示去不掉
                    label: () => h('span', {
                        class: {
                            genFormLabel: true,
                            genFormItemRequired: props.required,
                        }
                    }, props.child.title),
                    // 关键组件
                    default: () => h(
                        resolveComponent(props.widget),
                        {
                            // min、max、placeholder
                            ...props.uiProps,
                            // v-model
                            modelValue: props.rootFormData[props.curNodePath],
                            'onUpdate:modelValue': function updateModelValue(event) {
                                const preVal = props.rootFormData[props.curNodePath];
                                if (preVal !== event) {
                                    props.rootFormData[props.curNodePath] = event;
                                }
                            }
                        }
                    )
                }
            )
        }
    }
};
