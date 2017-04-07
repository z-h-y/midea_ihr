<template>
    <button
        aria-label="Close"
        class="ui-close-button"
        ref="button"
        type="button"

        :class="classes"
        :disabled="disabled"

        @click="onClick"
    >
        <div class="ui-close-button-icon">
            <ui-icon class="fa-close">

            </ui-icon>
        </div>

        <span class="ui-close-button-focus-ring"></span>

        <ui-ripple-ink trigger="button" v-if="!disableRipple && !disabled"></ui-ripple-ink>
    </button>
</template>

<script>
import UiIcon from './UiIcon.vue';
import UiRippleInk from './UiRippleInk.vue';

import config from './config';

export default {
    name: 'ui-close-button',

    props: {
        size: {
            type: String,
            default: 'normal' // 'small', 'normal', or 'large'
        },
        color: {
            type: String,
            default: 'black' // 'black', or 'white'
        },
        disableRipple: {
            type: Boolean,
            default: config.data.disableRipple
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },

    computed: {
        classes() {
            return [
                `ui-close-button-size-${this.size}`,
                `ui-close-button-color-${this.color}`,
                { 'is-disabled': this.disabled || this.loading }
            ];
        }
    },

    methods: {
        onClick(e) {
            this.$emit('click', e);
        }
    },

    components: {
        UiIcon,
        UiRippleInk
    }
};
</script>

<style lang="scss">
@import './styles/imports';

.ui-close-button {
    align-items: center;
    background-color: transparent;
    background: none;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    display: inline-flex;
    justify-content: center;
    margin: 0;
    outline: none;
    overflow: hidden;
    padding: 0;
    position: relative;

    // Fix for border radius not clipping internal content of positioned elements (Chrome/Opera)
    -webkit-mask-image: -webkit-radial-gradient(circle, white, black);

    // Remove the Firefox dotted outline
    &::-moz-focus-inner {
        border: 0;
    }

    &:hover:not(.is-disabled) {
        background-color: rgba(black, 0.1);
    }

    body[modality="keyboard"] &:focus {
        .ui-close-button-focus-ring {
            opacity: 1;
            transform: scale(1);
        }
    }

    &.is-disabled {
        cursor: default;
        opacity: 0.6;
    }
}

.ui-close-button-icon {
    position: relative; // IE: prevents shifting when the button is pressed
    width: 100%; // Firefox: needs the width reset for Flexbox centering
    z-index: 1;
}

.ui-close-button-focus-ring {
    background-color: rgba(black, 0.15);
    border-radius: 50%;
    left: 0;
    opacity: 0;
    position: absolute;
    top: 0;
    transform-origin: center;
    transform: scale(0);
    transition: transform 0.2s ease, opacity 0.2s ease;
}

// ================================================
// Sizes
// ================================================

.ui-close-button-size-small {
    &,
    .ui-close-button-focus-ring {
        height: rem-calc(32px);
        width: rem-calc(32px);
    }

    .ui-icon {
        font-size: rem-calc(18px);
    }
}

.ui-close-button-size-normal {
    &,
    .ui-close-button-focus-ring {
        height: rem-calc(36px);
        width: rem-calc(36px);
    }
}

.ui-close-button-size-large {
    &,
    .ui-close-button-focus-ring {
        height: rem-calc(48px);
        width: rem-calc(48px);
    }

    .ui-icon {
        font-size: rem-calc(24px);
    }
}

// ================================================
// Colors
// ================================================

.ui-close-button-color-black {
    body[modality="keyboard"] &:focus,
    &:hover:not(.is-disabled) {
        .ui-close-button-icon {
            color: $primary-text-color;
        }
    }

    .ui-close-button-icon {
        color: rgba(black, 0.38);
    }
}

.ui-close-button-color-white {
    body[modality="keyboard"] &:focus,
    &:hover:not(.is-disabled) {
        .ui-close-button-icon {
            color: white;
        }
    }

    .ui-close-button-icon {
        color: $secondary-text-color;
    }
}
</style>
