const Ajv = require("ajv")

function validateError(schema, errorSchema, formValue){
    // 初始化一个 ajv 实例对象
    const ajv = new Ajv({
        errorDataPath: 'property',
        allErrors: true,
        multipleOfPrecision: 8,
        schemaId: 'auto',
        unknownFormats: 'ignore',
    })

    // 进行验证
    let validationError = null;
    try {
        const isValid = ajv.validate(schema, data);
    } catch (err) {
        validationError = err;
    }

    // 如果有错误信息
    let ajvErrors = ajv.errors;

    // 处理 errorSchema
    let errorObj = Object.assign({}, ...[schema, errorSchema].map(itemSchema => Object.keys(itemSchema)
    .reduce((options, key) => {
        const value = itemSchema[key];
        if (key.indexOf('err:') === 0) {
            return { ...options, [key.substring(4)]: value };
        }
        return options;
    }, {})));


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
    ajvErrors[0].name = ajvErrors[0].keyword
    ajvErrors[0].message = errorObj[ajvErrors[0].keyword]  
    
    return ajvErrors
}
