<template>
    <span class="ui-icon" :class="[iconSet, icon]" :aria-label="ariaLabel">
        <svg class="ui-icon-svg" v-if="useSvg">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="'#' + icon"></use>
        </svg>

    </span>
</template>

<script>
export default {
    name: 'ui-icon',

    props: {
        icon: String,
        iconSet: {
            type: String,
            default: 'fa'
        },
        ariaLabel: String,
        removeText: {
            type: Boolean,
            default: false
        },
        useSvg: {
            type: Boolean,
            default: false
        }
    }
};
</script>

<style lang="scss">
@import './styles/imports';

$ui-icon-font-size  : rem-calc(24px) !default;
$ui-icon-size       : 1em !default;

.ui-icon {
    cursor: inherit;
    display: inline-block;
    height: $ui-icon-size;
    user-select: none;
    vertical-align: middle;
    width: $ui-icon-size;

    svg {
        fill: currentColor;
        height: $ui-icon-size;
        margin: 0;
        padding: 0;
        width: $ui-icon-size;
    }
}
</style>
