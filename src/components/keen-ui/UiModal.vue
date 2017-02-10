<style lang="stylus">

@import './styles/imports';
$transition-duration=0.2s;
.ui-modal {
    font-family: $font-stack;
    font-size: 14px;
    &.ui-modal-large {
        .ui-modal-container {
            width: 848px;
            height: 500px;
        }
    }
    &.ui-modal-small {
        .ui-modal-container {
            width: 320px;
        }
    }
}

body.ui-modal-open {
    overflow: hidden;
}

.ui-modal-mask {
    position: fixed;
    z-index: $z-index-modal;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: alpha(black, 0.5);
    display: table;
    transition: opacity $transition-duration ease;
}

.ui-modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}


/*.ui-modal-wrapper *{
   box-sizing:border-box;
}*/

.ui-modal-container {
    position: relative;
    outline: none;
    width: 528px;
    margin: 0px auto;
    padding: 0;
    background-color: white;
    border-radius: 2px;
    box-shadow: 0 2px 8px alpha(black, 0.33);
    transition: all $transition-duration ease;
    max-height: 100vh;
    max-width: 100vw;
    overflow-x: hidden;
    overflow-y: auto;
}

.ui-modal-header {
    padding: 10px 16px;
    .ui-modal-header-text {
        color: #222;
        font-family: Helvetica, Arial;
        flex-grow: 1;
        font-size: 18px;
        margin: 0;
        font-weight: bold;
        float: left;
    }
    .ui-modal-close-button {
        margin-top: 0px;
        margin-right: -3px;
        margin-left: auto;
        &:hover:not([disabled]),
        body[modality="keyboard"] &:focus {
            .fa-close {
                color: alpha(black, 0.8);
            }
        }
        .fa-close {
            font-size: 16px;
            color: alpha(black, 0.4);
        }
        &[disabled] {
            opacity: 0.5;
        }
    }
}

.ui-modal-body {
    padding: 0px 16px 16px 16px
}

.ui-modal-footer {
    margin-top: -8px;
    padding: 16px;
    text-align: right;
    .ui-modal-footer-left,
    [slot].ui-modal-footer-left {
        justify-content: flex-start;
    }
    .ui-button {
        float: left;
        margin-left: 10px;
        &:first-child {
            margin-left: 0;
        }
    }
    [slot] {
        display: inline-block;
    }
}

.ui-modal-fade-enter,
.ui-modal-fade-leave {
    opacity: 0;
}

.ui-modal-scale-enter,
.ui-modal-scale-leave {
    opacity: 0;
}

.ui-modal-scale-enter .ui-modal-container,
.ui-modal-scale-leave .ui-modal-container {
    transform: scale(1.1);
}

</style>

<template>

<div class="ui-modal ui-modal-mask" v-show="show" :transition="transition" :class="[type]" :role="role" @transitionend="transitionEnd | debounce 100">
    <div class="ui-modal-wrapper" @click="close" v-el:modal-mask>
        <div class="ui-modal-container" tabindex="-1" @keydown.esc="close" v-el:modal-container>
            <div class="ui-modal-header fix" v-el:header>
                <slot name="header">
                    <h1 v-text="header" class="ui-modal-header-text"></h1>
                </slot>

                <ui-icon-button type="clear" icon="fa fa-close" class="ui-modal-close-button" @click="close" :disabled="!dismissible" v-if="showCloseButton" v-el:close-button></ui-icon-button>
            </div>

            <div class="ui-modal-body">
                <slot>
                    <div v-text="body"></div>
                </slot>
            </div>

            <div class="ui-modal-footer" v-if="!hideFooter">
                <slot name="footer">
                    <ui-button @click="close" v-if="dismissible">Close</ui-button>
                </slot>
            </div>

            <div class="focus-redirector" @focus="redirectFocus" tabindex="0"></div>
        </div>
    </div>
</div>

</template>

<script>

import classlist from './helpers/classlist';

import UiIconButton from './UiIconButton.vue';
import UiButton from './UiButton.vue';

export default {
    name: 'ui-modal',

    props: {
        show: {
            type: Boolean,
            required: true,
            twoWay: true
        },
        type: {
            type: String,
            default: 'normal', // 'small', 'normal', or 'large'
            coerce(type) {
                return 'ui-modal-' + type;
            }
        },
        header: {
            type: String,
            default: 'UiModal Header'
        },
        body: {
            type: String,
            default: 'UiModal body'
        },
        role: {
            type: String,
            default: 'dialog', // 'dialog' or 'alertdialog'
        },
        transition: {
            type: String,
            default: 'ui-modal-scale', // 'ui-modal-scale', or 'ui-modal-fade'
        },
        showCloseButton: {
            type: Boolean,
            default: true
        },
        hideFooter: {
            type: Boolean,
            default: false
        },
        dismissible: {
            type: Boolean,
            default: true
        },
        backdropDismissible: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            lastFocussedElement: null
        };
    },

    watch: {
        show() {
            this.$nextTick(() => {
                if (this.show) {
                    this.opened();
                    this.init();
                } else {
                    this.closed();
                }
            });
        }
    },

    beforeDestroy() {
        if (this.show) {
            this.tearDown();
        }
    },

    methods: {
        init() {
                let element = this.$els.modalMask;
                let elementheader = this.$els.header;
                var startX = 0,
                    startY = 0,
                    x = 0,
                    y = 0;
                element.style.position = 'relative';
                elementheader.style.cursor = 'move';
                let _self = this;
                let doc = window.document;
                elementheader.addEventListener('mousedown', function(event) {
                    event.preventDefault();
                    startX = event.pageX - x;
                    startY = event.pageY - y;
                    doc.addEventListener('mousemove', mousemove, false);
                    doc.addEventListener('mouseup', mouseup, false);
                })

                function mousemove(event) {
                    y = event.pageY - startY;
                    x = event.pageX - startX;
                    element.style.top = y + 'px';
                    element.style.left = x + 'px';
                }

                function mouseup() {
                    doc.removeEventListener('mousemove', mousemove, false);
                    doc.removeEventListener('mouseup', mouseup, false);
                }
            },
            close(e) {
                if (!this.dismissible) {
                    return;
                }

                // Make sure the element clicked was the modal mask and not a child
                // whose click event has bubbled up
                if (e.currentTarget === this.$els.modalMask && e.target !== e.currentTarget) {
                    return;
                }

                // Don't close if this event was triggered by the modal mask
                // and this.backdropDismissible is false
                if (e.currentTarget === this.$els.modalMask && !this.backdropDismissible) {
                    return;
                }

                this.show = false;
            },

            opened() {
                this.lastFocussedElement = document.activeElement;
                this.$els.modalContainer.focus();

                classlist.add(document.body, 'ui-modal-open');

                document.addEventListener('focus', this.restrictFocus, true);

                this.$dispatch('opened');
            },

            closed() {
                this.tearDown();
                this.$dispatch('closed');
            },

            redirectFocus(e) {
                e.stopPropagation();

                this.$els.modalContainer.focus();
            },

            restrictFocus(e) {
                if (!this.$els.modalContainer.contains(e.target)) {
                    e.stopPropagation();
                    this.$els.modalContainer.focus();
                }
            },

            tearDown() {
                classlist.remove(document.body, 'ui-modal-open');

                document.removeEventListener('focus', this.restrictFocus, true);

                if (this.lastFocussedElement) {
                    this.lastFocussedElement.focus();
                }
            },

            transitionEnd() {
                if (this.show) {
                    this.$dispatch('revealed');
                } else {
                    this.$dispatch('hidden');
                }
            }
    },

    components: {
        UiIconButton,
        UiButton
    }
};

</script>
