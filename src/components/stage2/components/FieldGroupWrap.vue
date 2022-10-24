<template>
    <div class="fieldGroupWrap">
        <h3
            v-if="showTitle && title"
            class="fieldGroupWrap_title"
        >
            {{ title }}
        </h3>
        <p
            v-if="showDescription && description"
            class="fieldGroupWrap_des"
            v-html="description"
        >
        </p>
        <div class="fieldGroupWrap_box">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FieldGroupWrap',
    props: {
        // 当前节点路径
        curNodePath: {
            type: String,
            default: ''
        },
        showTitle: {
            type: Boolean,
            default: true
        },
        showDescription: {
            type: Boolean,
            default: true
        },
        title: {
            type: String,
            default: ''
        },
        description: {
            type: String,
            default: ''
        }
    }
};
</script>

<style scoped>
.fieldGroupWrap_title {
    position: relative;
    display: block;
    width: 100%;
    line-height: 26px;
    margin-bottom: 8px;
    font-size: 15px;
    font-weight: 700;
    border: 0;
}    
.fieldGroupWrap_des {
    font-size: 12px;
    line-height: 20px;
    margin-bottom: 10px;
    color: #999;
}


</style>>
