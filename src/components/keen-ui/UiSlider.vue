<template>
    <div
        class="ui-slider"
        role="slider"

        :aria-valuemax="100"
        :aria-valuemin="0"
        :aria-valuenow="localValue"
        :class="classes"
        :tabindex="disabled ? null : 0"

        @blur="onBlur"
        @focus="onFocus"
        @keydown.down.prevent="decrementValue"
        @keydown.left.prevent="decrementValue"
        @keydown.right.prevent="incrementValue"
        @keydown.up.prevent="incrementValue"
    >
        <input
            class="ui-slider-hidden-input"
            type="hidden"

            :name="name"
            :value="value"

            v-if="name"
        >

        <div class="ui-slider-icon" v-if="hasIcon">
            <slot name="icon">
                <ui-icon :icon="icon"></ui-icon>
            </slot>
        </div>

        <div
            class="ui-slider-track"
            ref="track"
            @mousedown="onDragStart"
            @touchstart="onDragStart"
        >
            <div class="ui-slider-track-background">
                <span
                    class="ui-slider-snap-point"
                    :style="{ left: point + '%' }"

                    v-if="snapToSteps"
                    v-for="point in snapPoints"
                ></span>
            </div>

            <div class="ui-slider-track-fill" :style="fillStyle"></div>

            <div class="ui-slider-thumb" ref="thumb" :style="thumbStyle">
                <div class="ui-slider-marker" v-if="showMarker">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36">
                        <path d="M11 .5c-1.7.2-3.4.9-4.7 2-1.1.9-2 2-2.5 3.2-1.2 2.4-1.2 5.1-.1 7.7 1.1 2.6 2.8 5 5.3 7.5 1.2 1.2 2.8 2.7 3 2.7 0 0 .3-.2.6-.5 3.2-2.7 5.6-5.6 7.1-8.5.8-1.5 1.1-2.6 1.3-3.8.2-1.4 0-2.9-.5-4.3-1.2-3.2-4.1-5.4-7.5-5.8-.5-.2-1.5-.2-2-.2z"/>
                    </svg>

                    <span class="ui-slider-marker-text">{{ markerText }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UiIcon from './UiIcon.vue';

import classlist from './helpers/classlist';
import RespondsToWindowResize from './mixins/RespondsToWindowResize.js';

export default {
    name: 'ui-slider',

    props: {
        name: String,
        icon: String,
        value: {
            type: Number,
            required: true
        },
        step: {
            type: Number,
            default: 10
        },
        snapToSteps: {
            type: Boolean,
            default: false
        },
        showMarker: {
            type: Boolean,
            default: false
        },
        markerValue: Number,
        disabled: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            initialValue: this.value,
            isActive: false,
            isDragging: false,
            thumbSize: 0,
            trackLength: 0,
            trackOffset: 0,
            localValue: this.value
        };
    },

    computed: {
        classes() {
            return [
                { 'is-dragging': this.isDragging },
                { 'is-disabled': this.disabled },
                { 'is-active': this.isActive },
                { 'has-icon': this.hasIcon },
                { 'has-marker': this.showMarker }
            ];
        },

        hasIcon() {
            return Boolean(this.$slots.icon) || Boolean(this.icon);
        },

        fillStyle() {
            return { transform: 'scaleX(' + (this.localValue / 100) + ')' };
        },

        thumbStyle() {
            return {
                transform: 'translateX(' + (
                    ((this.localValue / 100) * this.trackLength) - (this.thumbSize / 2)
                ) + 'px)'
            };
        },

        markerText() {
            return this.markerValue ? this.markerValue : this.value;
        },

        snapPoints() {
            const points = [];
            let index = 0;
            let point = index * this.step;

            while (point <= 100) {
                points.push(point);
                index++;
                point = index * this.step;
            }

            return points;
        }
    },

    watch: {
        value() {
            this.setValue(this.value);
        },

        isDragging() {
            const operation = this.isDragging ? 'add' : 'remove';
            classlist[operation](document.body, 'ui-slider-is-dragging');
        }
    },

    mounted() {
        this.initializeSlider();
    },

    beforeDestroy() {
        this.teardownSlider();
    },

    methods: {
        reset() {
            this.setValue(this.initialValue);
        },

        onFocus() {
            this.isActive = true;
            this.$emit('focus');
        },

        onBlur() {
            this.isActive = false;
            this.$emit('blur');
        },

        onExternalClick(e) {
            if (!this.$el.contains(e.target)) {
                this.onBlur();
            }
        },

        setValue(value) {
            if (value > 100) {
                value = 100;
            } else if (value < 0) {
                value = 0;
            }

            if (value === this.localValue) {
                return;
            }

            this.localValue = value;
            this.$emit('input', value);
            this.$emit('change', value);
        },

        incrementValue() {
            this.setValue(this.localValue + this.step);
        },

        decrementValue() {
            this.setValue(this.localValue - this.step);
        },

        getTrackOffset() {
            let el = this.$refs.track;
            let offset = el.offsetLeft;

            while (el.offsetParent) {
                el = el.offsetParent;
                offset += el.offsetLeft;
            }

            return offset;
        },

        getPointStyle(point) {
            return {
                left: point + '%'
            };
        },

        refreshSize() {
            this.thumbSize = this.$refs.thumb.offsetWidth;
            this.trackLength = this.$refs.track.offsetWidth;
            this.trackOffset = this.getTrackOffset(this.$refs.track);
        },

        initializeSlider() {
            document.addEventListener('touchend', this.onDragStop);
            document.addEventListener('mouseup', this.onDragStop);
            document.addEventListener('click', this.onExternalClick);

            this.$on('window-resize', () => {
                this.refreshSize();
                this.isDragging = false;
            });

            this.refreshSize();
            this.initializeDrag();
        },

        teardownSlider() {
            document.removeEventListener('touchend', this.onDragStop);
            document.removeEventListener('mouseup', this.onDragStop);
            document.removeEventListener('click', this.onExternalClick);
        },

        initializeDrag() {
            const value = this.getEdge(this.localValue ? this.localValue : 0, 0, 100);
            this.setValue(value);
        },

        onDragStart(e) {
            if (this.disabled) {
                return;
            }

            if (!this.isActive) {
                this.onFocus();
            }

            this.isDragging = true;
            this.dragUpdate(e);

            document.addEventListener('touchmove', this.onDragMove);
            document.addEventListener('mousemove', this.onDragMove);

            this.$emit('dragstart', this.localValue, e);
        },

        onDragMove(e) {
            this.dragUpdate(e);
        },

        dragUpdate(e) {
            const position = e.touches ? e.touches[0].pageX : e.pageX;
            const value = this.getEdge(
                ((position - this.trackOffset) / this.trackLength) * 100, 0, 100
            );

            if (this.isDragging) {
                this.setValue(Math.round(value));
            }
        },

        onDragStop(e) {
            this.isDragging = false;

            if (this.snapToSteps && this.value % this.step !== 0) {
                this.setValue(this.getNearestSnapPoint());
            }

            document.removeEventListener('touchmove', this.onDragMove);
            document.removeEventListener('mousemove', this.onDragMove);

            this.$emit('dragend', this.localValue, e);
        },

        getNearestSnapPoint() {
            const previousSnapPoint = Math.floor(this.value / this.step) * this.step;
            const nextSnapPoint = previousSnapPoint + this.step;
            const midpoint = (previousSnapPoint + nextSnapPoint) / 2;

            return this.value >= midpoint ? nextSnapPoint : previousSnapPoint;
        },

        getEdge(a, b, c) {
            if (a < b) {
                return b;
            }

            if (a > c) {
                return c;
            }

            return a;
        }
    },

    components: {
        UiIcon
    },

    mixins: [
        RespondsToWindowResize
    ]
};
</script>

<style lang="scss">
@import './styles/imports';

$ui-slider-height                   : rem-calc(18px) !default;

// Track line
$ui-slider-track-height             : rem-calc(3px) !default;
$ui-slider-track-fill-color         : $brand-primary-color !default;
$ui-slider-track-background-color   : rgba(black, 0.12) !default;

// Drag thumb
$ui-track-thumb-size                : rem-calc(14px) !default;
$ui-track-thumb-fill-color          : $brand-primary-color !default;

// Focus ring
$ui-track-focus-ring-size                   : rem-calc(36px) !default;
$ui-track-focus-ring-transition-duration    : 0.2s !default;
$ui-track-focus-ring-color                  : rgba($ui-track-thumb-fill-color, 0.38) !default;

// Marker
$ui-slider-marker-size                      : rem-calc(36px);

.ui-slider {
    align-items: center;
    display: flex;
    outline: none;

    &:not(.is-disabled).is-active,
    &:not(.is-disabled).is-dragging {
        &:not(.has-marker) {
            .ui-slider-thumb::before {
                transform: scale(1);
            }
        }

        .ui-slider-marker {
            opacity: 1;
            transform: scale(1) translateY(rem-calc(-26px));
        }

        .ui-slider-marker-text {
            color: white;
        }

        .ui-slider-snap-point {
            opacity: 1;
        }

        .ui-slider-icon .ui-icon {
            color: $ui-track-thumb-fill-color;
        }
    }

    &.is-disabled {
        .ui-slider-icon {
            opacity: 0.6;
        }

        .ui-slider-track {
            cursor: default;
        }

        .ui-slider-track-fill {
            background-color: transparent;
        }

        .ui-slider-thumb {
            background-color: #DDD;
            border: rem-calc(2px) solid white;
        }
    }
}

.ui-slider-icon {
    margin-right: rem-calc(16px);

    .ui-icon {
        color: $secondary-text-color;
        transition: color $ui-track-focus-ring-transition-duration ease;
    }
}

.ui-slider-track {
    align-items: center;
    cursor: pointer;
    display: flex;
    height: $ui-slider-height;
    margin: 0 auto;
    position: relative;
    width: 100%;
}

.ui-slider-track-background,
.ui-slider-track-fill {
    content: '';
    display: block;
    height: $ui-slider-track-height;
    left: 0;
    position: absolute;
    top: ($ui-slider-height - $ui-slider-track-height) / 2;
}

.ui-slider-track-background {
    background-color: $ui-slider-track-background-color;
    width: 100%;
}

.ui-slider-snap-point {
    background-color: rgba(black, 0.75);
    height: $ui-slider-track-height;
    opacity: 0;
    position: absolute;
    transform: opacity 0.2s ease;
    width: rem-calc(2px);
    z-index: 1;
}

.ui-slider-track-fill {
    background-color: $ui-slider-track-fill-color;
    transform-origin: left;
    width: 100%;
}

.ui-slider-thumb {
    background-color: $ui-track-thumb-fill-color;
    border-radius: 50%;
    cursor: inherit;
    display: block;
    height: $ui-track-thumb-size;
    left: 0;
    position: relative;
    width: $ui-track-thumb-size;
    z-index: 1;

    // Focus ring
    &::before {
        background-color: $ui-track-focus-ring-color;
        border-radius: 50%;
        content: '';
        display: block;
        height: $ui-track-focus-ring-size;
        margin-left: -($ui-track-focus-ring-size - $ui-track-thumb-size) / 2;
        margin-top: -($ui-track-focus-ring-size - $ui-track-thumb-size) / 2;
        position: absolute;
        transform-origin: center;
        transform: scale(0);
        transition: transform $ui-track-focus-ring-transition-duration ease;
        width: $ui-track-focus-ring-size;
    }
}

.ui-slider-marker {
    height: $ui-slider-marker-size;
    margin-left: -($ui-slider-marker-size - $ui-track-thumb-size) / 2;
    margin-top: -($ui-slider-marker-size - $ui-track-thumb-size) / 2;
    opacity: 0;
    position: absolute;
    transform: scale(0) translateY(0) ;
    transition: all $ui-track-focus-ring-transition-duration ease;
    user-select: none;
    width: $ui-slider-marker-size;

    svg {
        fill: $ui-track-thumb-fill-color;
        height: $ui-slider-marker-size;
        width: $ui-slider-marker-size;
    }
}

.ui-slider-marker-text {
    color: $ui-track-thumb-fill-color;;
    font-size: rem-calc(13px);
    font-weight: 500;
    left: 0;
    position: absolute;
    text-align: center;
    top: rem-calc(4px);
    transition: color $ui-track-focus-ring-transition-duration ease;
    width: $ui-slider-marker-size;
}

// Applied globally to the body tag when dragging
.ui-slider-is-dragging {
    user-select: none;
}
</style>
