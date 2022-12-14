import Ajv from "ajv"
import localize from "ajv-i18n"
import { isObject } from "./common";

export default function validateError({schema, errorSchema, formValue, required, customFormats}){
    // 初始化一个 ajv 实例对象
    const ajv = new Ajv({
        allErrors: true
    })

    // 必填认证
    const isEmpty = !formValue
    if(required){
        if(isEmpty){
            // 必填 但是是空值
            const requireErrObj = {
                keyWord: 'required',
                name: 'required'
            };

            // 用户校验信息
            const errSchemaMsg = getUserErrOptions(schema, errorSchema).required;
            if(errSchemaMsg){
                requireErrObj.message = errSchemaMsg
            }else{
                requireErrObj.message = '此值是必填的'
            }
            return [requireErrObj]
        }
    }else if(isEmpty){
        // 非required 为空 校验通过
        return [];
    }

    // 注册自定义formats
    if(customFormats && isObject(customFormats)){
        Object.keys(customFormats).forEach((formatName) => {
            ajv.addFormat(formatName, customFormats[formatName]);
        });
    }
    
    // 进行验证
    let validationError = null;
    try {
        ajv.validate(schema, formValue);
    } catch (err) {
        validationError = err;
    }

    // 如果有错误信息
    let ajvErrors = ajv.errors;
    // 汉化
    localize.zh(ajvErrors)
    // 处理 errorSchema
    let errorObj = getUserErrOptions(schema, errorSchema)
    ajvErrors && (ajvErrors[0].message = ajv.errorsText(ajvErrors, {separator: '\n'}))

    // 处理成所需格式
    /** 
     * {
        instancePath: '',
        schemaPath: '#/minLength',
        keyword: 'minLength',
        params: { limit: 10 },
        message: 'must NOT have fewer than 10 characters'
    }

    {
        message: "不应少于 10 个字符"
        name: "minLength"
        params: {limit: 10}
        schemaPath: "#/minLength"
        // stack: "不应少于 10 个字符"
    }
    */
    if(ajvErrors && ajvErrors.length && JSON.stringify(errorObj)!='{}'){
        ajvErrors[0].name = ajvErrors[0].keyword
        ajvErrors[0].message = errorObj[ajvErrors[0].keyword] 
    }
    
    return ajvErrors
}


function getUserErrOptions(schema, errorSchema){
    return Object.assign({}, ...[schema, errorSchema].map(itemSchema => Object.keys(itemSchema)
    .reduce((options, key) => {
        const value = itemSchema[key];
        if (key.indexOf('err:') === 0) {
            return { ...options, [key.substring(4)]: value };
        }
        return options;
    }, {})));
}