<style lang="css">

.message {
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
    min-width: 350px;
    padding: 10px 12px;
    box-sizing: border-box;
    border-radius: 2px;
    position: fixed;
    top: 20px;
    background-color: #fff;
    -webkit-transition: opacity .3s, -webkit-transform .4s;
    transition: opacity .3s, -webkit-transform .4s;
    transition: opacity .3s, transform .4s;
    transition: opacity .3s, transform .4s, -webkit-transform .4s;
    overflow: hidden;
    z-index: 2000;
    left: 50%;
    margin-left: -175px;
}
.message.message-error {
  top: 0;
  background-color: rgba(0,0,0,0.5);
  width: 100%;
  height: 100%;
  display: table;
  left:0px;
  margin-left: 0px;
}
.message-error .error-info {
  width: 400px;
  margin: 0 auto;
  display: table-cell;
  vertical-align: middle;
}
.message-error .error-info p {
  font-size: 14px;
  line-height: 20px;
  max-height: 400px;
  overflow: auto;
}
.message__icon {
    width: 40px;
    height: 40px;
    position: absolute;
    top: 0;
    left: 0;
}

.message .message__group {
  cursor: pointer;
    color: #666;
    margin-left: 38px;
    position: relative;
}

.message__group > p {
    line-height: 20px;
    padding-right: 25px;
}

.message__closeBtn {
    position: absolute;
    top: 2px;
    right: 0px;
}

.fade-transition {
    transition: all .3s ease;
    opacity: 1;
    top: 15px;
}

.fade-enter,
.fade-leave {
   transition: all .3s ease;
    opacity: 0;
    top: -15px;
}
.ui-modal-footer .footer {
  display: inline-block;
}
</style>

<template lang="html">

<div v-if="visible" :class="['message', {'message-error': isError}]" transition="fade" @mouseenter="clearTimer" @mouseleave="startTimer">
    <img v-if="!isError" class="message__icon" :src="typeImg" alt="">
    <div v-if="!isError" class="message__group">
        <p>{{message}}</p>
        <div v-if="showClose" class="message__closeBtn icon-close" @click="handleClose"></div>
    </div>
    <div class="error-info" v-if="isError">
        <div class="ui-modal-container" tabindex="-1">
            <div class="ui-modal-header fix" style="cursor: move;">
                <h1 class="ui-modal-header-text">Error</h1>

                <button class="ui-icon-button ui-modal-close-button ui-icon-button-clear color-default" type="button" @click="handleClose">
                  <i class="fa ui-icon-button-icon fa-close" aria-hidden="true"></i>
                </button>
            </div>
            <div class="ui-modal-body">
              <p>{{message}}</p>
              <p v-for="item in extralMessage">{{item}}</p>
            </div>
            <div class="ui-modal-footer">
                <div class="footer">
                  <button class="ui-button ui-button-normal color-default" type="submit" @click="handleClose">
                    <div class="ui-button-content">
                      <div class="ui-button-text">
                        Cancel
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>


</template>

<script>

export default {
    data() {
            return {
                visible: false,
                message: '',
                extralMessage: [],
                duration: 2000,
                type: 'info',
                onClose: null,
                showClose: false,
                closed: false,
                timer: null
            };
        },
        computed: {
            typeImg() {
                return require(`../../static/message/${this.type}.svg`);
            },
            isError() {
              return this.type === 'error';
            }
        },
        watch: {
            closed(newVal) {
                if (newVal) {
                  this.visible = false;
                }
            }
        },
        mounted() {
          this.startTimer();
        },
        methods: {
            handleClose() {
                    this.closed = true;
                    if (typeof this.onClose === 'function') {
                        this.onClose();
                    }
                },
                clearTimer() {
                    clearTimeout(this.timer);
                },
                startTimer() {
                  if(this.type === 'error') {
                    return;
                  }
                    if (this.duration > 0) {
                        this.timer = setTimeout(() => {
                            if (!this.closed) {
                                this.handleClose();
                            }
                        }, this.duration);
                    }
                }
        }
};

</script>
