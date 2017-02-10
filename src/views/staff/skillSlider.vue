<template>
    <div class="slider" :class="{'slider-able': slideAble}" @click="onSliderClick($event)" v-el:slider>
      <div class="slider-bar" :style="{width: currentPosition}"></div>
      <div class="slider-button" :class="{'slider-able': slideAble}" :style="{left: currentPosition}" v-el:button>

      </div>
      <div v-if="showText" class="text-down" :style="{left: currentPosition}">{{currentText}}</div>
    </div>
</template>

<style>
  .slider-able {
    cursor: pointer;
  }
  .slider {
    width: 100%;
    height: 5px;
    margin: 30px 0;
    background-color: #ccc;
    border-radius: 3px;
    position: relative;
    vertical-align: middle;
  }

  .slider + input {
    border: solid 1px #ccc;
    box-sizing: border-box;
    width: 8%;
    vertical-align: middle;
    margin-left: 3%;
    text-align: center;
  }


  .slider .slider-bar {
    height: 5px;
    background-color: #4997dc;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    position: absolute;
  }

  .slider .slider-button {
    height: 9px;
    width: 9px;
    border: solid 2px #4997dc;
    position: absolute;
    background-color: #fff;
    border-radius: 50%;
    top: -4px;
    transform: translateX(-50%);
  }

  .slider .text-down {
    font-size: 12px;
    line-height: 1.7;
    text-align: center;
    padding: 0 5px;
    position: absolute;
    top: 15px;
    margin-left: -14px;
    cursor: default;
  }

</style>

<script type="text/ecmascript-6">
  var getStyle = require('wind-dom').getStyle;

  export default {
    props: {
      min: {
        type: Number,
        default: 0
      },
      max: {
        type: Number,
        default: 100
      },
      step: {
        type: Number,
        default: 1
      },
      defaultValue: {
        type: Number,
        default: 0
      },
      showText: {
        type: Boolean,
        default: false
      },
      rules: {
        type: Array,
        default() {
          return [];
        }
      },
      slideAble: {
        type: Boolean,
        default: true
      },
      currentText: {
        type: String,
        default: ''
      }
    },

    data() {
      return {
        dragging: false,
        newPos: null,
        oldValue: this.defaultValue,
        currentValue: this.defaultValue,
        currentPosition: (this.defaultValue - this.min) / (this.max - this.min) * 100 + '%',
        $sliderWidth: 0
      };
    },

    methods: {
      setCurrentText(val) {
        var rules = this.rules;
        var len = rules.length;
        var text = '';
        if (len) {
          for (var i = 0; i < len; i++) {
            if (val >= rules[i].min && val <= rules[i].max) {
              text = rules[i].text;
              break;
            }
          }
        }
        this.currentText = text;
      },

      setPosition(newPos) {
        if (newPos >= 0 && (newPos <= 100)) {
          var lengthPerStep = 100 / ((this.max - this.min) / this.step);
          var steps = Math.round(newPos / lengthPerStep);
          this.currentValue = steps * lengthPerStep * (this.max - this.min) * 0.01 + this.min;
          this.currentPosition = (this.currentValue - this.min) / (this.max - this.min) * 100 + '%';
          if (!this.dragging) {
            if (this.currentValue !== this.oldValue) {
              this.$emit('change', this.currentValue);
              this.oldValue = this.currentValue;
            }
          }
        }
      },

      onSliderClick(event) {
        if (!this.slideAble || event.target.className === 'text-down') {
          return;
        }
        this.$sliderWidth = parseInt(getStyle(this.$els.slider, 'width'), 10);
        var currentX = event.clientX;
        var sliderOffsetLeft;
        getStyle(this.$el.parentNode, 'position') === 'static' ? sliderOffsetLeft = this.$els.slider.offsetLeft : sliderOffsetLeft = this.$el.parentNode.offsetLeft + this.$els.slider.offsetLeft;
        var offsetParent = this.$els.slider.parentNode;
        while ( offsetParent && (!/^body|html$/i.test(offsetParent.parentNode.nodeName)) ) {
          offsetParent = offsetParent.parentNode;
        }
        sliderOffsetLeft += offsetParent.offsetLeft;
        var newPos = (currentX - sliderOffsetLeft) / this.$sliderWidth * 100;
        this.setPosition(newPos);
      }
    },
    watch: {
      currentValue(val, oldVal) {
        this.setCurrentText(val);
      }
    },
    // computed: {
    //   $sliderWidth() {
    //     return parseInt(getStyle(this.$els.slider, 'width'), 10);
    //   }
    // },
    ready() {
      this.$sliderWidth = parseInt(getStyle(this.$els.slider, 'width'), 10);
      this.setCurrentText(this.defaultValue);
    },

    compiled() {
      var startX = 0;
      var currentX = 0;
      var startPos = 0;
      var self = this;

      var onDragStart = function(event) {
        self.$sliderWidth = parseInt(getStyle(self.$els.slider, 'width'), 10);
        self.dragging = true;
        startX = event.clientX;
        startPos = parseInt(self.currentPosition, 10);
      };

      var onDragging = function(event) {
        if (self.dragging) {
          currentX = event.clientX;
          var diff = (currentX - startX) / self.$sliderWidth * 100;
          self.newPos = startPos + diff;
          self.setPosition(self.newPos);
        }
      };

      var onDragEnd = function() {
        if (self.dragging) {
          self.dragging = false;
          self.setPosition(self.newPos);
          window.removeEventListener('mousemove', onDragging);
          window.removeEventListener('mouseup', onDragEnd);
        }
      };

      this.$els.button.addEventListener('mousedown', function(event) {
        if (!self.slideAble) {
          return;
        }
        onDragStart(event);
        window.addEventListener('mousemove', onDragging);
        window.addEventListener('mouseup', onDragEnd);
      });
    }
  };
</script>
