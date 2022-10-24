import { isObject } from "./common";

// 解析用户配置的 uiSchema options
export function getUserUiOptions({
    schema = {},
    uiSchema = {}
}){
    return Object.assign({}, ...[schema, uiSchema].map(itemSchema => Object.keys(itemSchema)
        .reduce((options, key) => {
            const value = itemSchema[key];
            // options 内外合并
            if (key === 'ui:options' && isObject(value)) {
                return { ...options, ...value };
            }

            if (key.indexOf('ui:') === 0) {
                // 只对 ui:xxx 配置形式支持表达式
                return {
                    ...options,
                    [key.substring(3)]: value 
                };
            }
            return options;
        }, {})));
}

export function getUserUiProps({
    schema = {},
    uiSchema = {}
}){
    let spec = {}
    let uiOptions = getUserUiOptions({schema, uiSchema})

    if (schema.minimum || schema.minimum === 0) {
        spec.min = schema.minimum;
    }
    if (schema.maximum || schema.maximum === 0) {
        spec.max = schema.maximum;
    }

    return {
        ...schema,
        ...spec,
        // 用户配置的优先级最高
        ...uiOptions
    }
}