<style lang="stylus">

@import './styles/imports';
.tab-num {
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    background: #ff0000;
    font-size: 12px;
    color: #fff;
    border-radius: 50%;
    position: absolute;
    top: 3px;
    right: -5px;
}

.ui-tab-header-item {
    font-family: $font-stack;
    display:inline-block;
    position: relative;
    font-size: 16px;
    height: 48px;
    line-height:48px;
    padding: 0 12px;
    color: #545454;
    cursor: pointer;
    min-width: 80px;
    border-bottom: 2px solid transparent;
    &.type-icon-and-text {
        display: flex;
        flex-direction: column;
        height: 72px;
        .ui-tab-header-item-icon {
            margin-bottom: 4px;
            margin-bottom: 4px;
        }
    }
    &.disabled {
        opacity: 0.4;
        cursor: default;
    }
}

.ui-tab-header-item-text {
    @extends $truncate-text;
}

.ui-tab-header-item-icon {
    width: 24px;
    height: 24px;
    .ui-icon {
        cursor: inherit;
    }
}

</style>

<template>

<li class="ui-tab-header-item" role="tab" :class="['type-' + type, { 'active': active, 'disabled': disabled }]" :tabindex="active ? 0 : -1" :aria-controls="id" :aria-selected="active ? 'true' : null" v-disabled="disabled" v-el:item>
    <div class="ui-tab-header-item-icon" v-if="type === 'icon' || type === 'icon-and-text'">
        <ui-icon :icon="icon"></ui-icon>
    </div>

    <div class="ui-tab-header-item-text" v-text="text" v-if="type === 'text' || type === 'icon-and-text'"></div>

    <ui-ripple-ink :trigger="$els.item" v-if="!hideRippleInk && !disabled"></ui-ripple-ink>
    <div class="tab-num" v-text="num" v-if="num && num!=0"></div>
</li>

</template>

<script>

import UiIcon from './UiIcon.vue';

import disabled from './directives/disabled';
import ShowsRippleInk from './mixins/ShowsRippleInk';

export default {
    name: 'ui-tab-header-item',

    props: {
        id: String,
        type: {
            type: String,
            default: 'text', // 'text', 'icon', or 'icon-and-text'
        },
        text: String,
        icon: String,
        active: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        num: {}
    },

    components: {
        UiIcon
    },

    mixins: [
        ShowsRippleInk
    ],

    directives: {
        disabled
    }
};

</script>
