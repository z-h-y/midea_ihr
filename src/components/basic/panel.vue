<style>

.d-panel {
    background-color: #fff;
}

.d-panel-header {
    padding: 14px 15px 7px;
    font-size: 14px;
}

.d-panel-content {
    box-sizing: border-box;
    padding: 16px;
    display: none;
}

.d-panel.noheader .d-panel-content {
    border-radius: 5px;
}

.d-panel.expanded .d-panel-content {
    display: block;
}

</style>

<template>

<div class="d-panel" :class="{ noheader: !title, expanded: expanded }">
    <div :class="header" v-if="title" >{{title}}
        <slot name="header"></slot>
    </div>
    <div class="d-panel-content" transition="collapse" v-show="expanded">
        <slot></slot>
    </div>
</div>

</template>

<script type="text/ecmascript-6">

export default {
    props: {
        title: {},
        header: {
            type: String,
            default: 'd-panel-header'
        },
        expanded: {
            type: Boolean,
            default: true
        }
    },

    transitions: {
        collapse: require('../../util/collapse-transition.js').default
    }
};

</script>
