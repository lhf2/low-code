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

    // 获取下拉列表
    if(schema.enum){
        // ui配置 enumNames 优先
        const enumNames = uiOptions.enumNames || schema.enumNames;
        uiOptions.enumOptions = schema.enum.map((value, i) => {
            const label = (enumNames && enumNames[i]) || String(value);
            return { label, value };
        });
    }

    return {
        ...schema,
        ...spec,
        // 用户配置的优先级最高
        ...uiOptions
    }
}

// 是否有依赖性或者被依赖
/**
 * "dependencies": {
        "firstName": [
            "password"
        ]
    }
*/
export function isDependOn(rootFormData, schema, name){
    let isDependency = false; // 是否是一个被依赖项
    let curDependent = false; // 当前是否触发依赖
    if(isObject(schema.dependencies)){
        curDependent = Object.entries(schema.dependencies).some(([key, value])=>{
            // 当前是一个被依赖项
            const tempDependency = Array.isArray(value) && value.includes(name)
            isDependency = isDependency || tempDependency

            // 当前需要依赖
            // rootFormData[key] 输入的值不为空的时候才触发依赖
            return tempDependency && !!rootFormData[key]
        })
    }
    return {
        isDependency,
        curDependent
    }
}