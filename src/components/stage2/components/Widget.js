/**
 * Created by Liu.Jun on 2020/4/23 11:24.
 */

import { h, resolveComponent } from 'vue';

export default {
    name: 'Widget',
    props: {
        schema: {
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
        }
    },
    setup(props, { emit }) {
        return () => {
            return h(
                resolveComponent('el-form-item'),
                {
                    labelWidth: 90,
                    label: props.child.title,
                    required: props.schema.required.includes(props.curNodePath)
                },
                h( 
                    resolveComponent(props.widget),
                    {
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
            );
        }
    }
};
