<template>
  <div class='field selectfield' :class="{ 'validate-error': hintType === 'error', require: isRequired, 'field-hashint': !hideHint }">
    <label :style="{ width: labelWidth != null ? labelWidth + 'px' : '' }" v-show="!hideLabel">{{ labelText }}</label>
    <div class="field-content" :style="{ marginLeft: labelWidth != null ? labelWidth + 'px' : '' }">
      <div  @click="toggleSelect($event)" class="selectfield-box" :class="{ active: selectVisible, multiSelect: multiSelect ,'select-readonly':readonly}" :style="{ width: realEditorWidth ? realEditorWidth : '' }">
        <ul v-if="multiSelect" class="multiSelectList fix">
          <li class="select-list" v-for="item in textValue">
            <span>{{item.label}}</span>
            <i class="fa fa-times" aria-hidden="true" @click="removeSelect(item.value)"></i>
          </li>
          <li><input type="text" placeholder="{{placeholder}}" class="mutiselectfield-box-text"  @keydown="handleKeydown" @input="handleInput"/></li>
        </ul>
        <input type="text" placeholder="{{placeholder}}" readonly="{{readonly}}" class="selectfield-box-text" :class="{'select-readonly':readonly, 'c-c1c1d2': isSelectOption}" @keydown="handleKeydown" @input="handleInput" v-model="searchText"/>
          <span class="selectfield-trigger">
             <i class="fa fa-sort-desc" aria-hidden="true"></i>
          </span>
        <v-select v-ref:select :disable-value="disableValue" :mapping="mapping" v-if="selectActive" v-show="selectVisible" :multi-select="multiSelect" :select-change="selectChange" :value.sync="selectValue" @select="selectVisible = false" @selection-change="handleSelectionChange" @click="$event.stopPropagation()">
          <input class="filter-input" type="text" name="" value="" v-model="filterWord">
          <div v-show="!multiSelect" class="select-option" :class="{ selected: selectValue === '' }" @click="handleClickSelect">
            --Select--
          </div>
        </v-select>
      </div>
      <div class="field-hint" v-if="!hideHint">
        <i class='icon' :class="{ 'icon-error': hintType === 'error', 'icon-warning': hintType === 'warning' }"></i>{{hintMessage || '' }}
      </div>
    </div>
  </div>
</template>

<style lang="css">
 .selectfield {
   }
   .c-c1c1d2 {
     color: #c1c1d2;
   }
   .selectfield .select {
     width: 100%;
     color: #2a3c59;
     position: absolute;
     max-height: 200px;
     z-index: 3;
     background: #fff;
     left: 0;
     top:32px;
     box-sizing: border-box;
   }
    .select-readonly{
      background: #f5f5f5 !important;
    }
   .selectfield-box {
     position: relative;
     cursor: pointer;
     font-size: 14px;
     padding:2px;
     padding-right: 24px;
     border: 1px solid #e5e6e7;
     background-color: #fff;
     width: 100%;
     height:32px;
     line-height:32px;
     box-sizing: border-box;
     border-radius: 2px;
     transition: border 0.3s;
   }

   .selectfield-box.multiSelect {
     height: auto;
     min-height: 32px;
   }

   .selectfield-box.multiSelect .selectfield-box-text {
     display: none;
   }

   .selectfield-box.active {
     border-color: #6699FF;
   }

   .selectfield-box .selectfield-trigger {
     position: absolute;
     top: 0;
     width: 8px;
     height:100%;
     right: 0;
     margin-right: 4px;
   }
   .selectfield-trigger .fa{
      margin: auto 0px;
      vertical-align: super;
   }
   .selectfield-box-text, .mutiselectfield-box-text {
      outline: none;
      padding: 0 3px;
      border: none;
      height: 26px;
      line-height: 26px;
      float: left;
      width: 100%;
   }
   .mutiselectfield-box-text {
     width: 65px;
     height: 24px;
   }
   .multiSelectList li {
     float: left;
     display: inline-block;
     height: 18px;
     line-height: 18px;
   }
   .multiSelectList li.select-list {
      background-color: #f3f3f3;
      color: #666;
      font-size: 14px;
      padding: 0 8px;
      margin-right: 5px;
      margin-top: 5px;
      border-radius: 3px;
      box-sizing: border-box;
      border: solid 1px #f3f3f3;
   }
   .selectfield .filter-input {
      border: 1px solid #dee4e9;
      border-radius: 2px;
      line-height: 26px;
      height: 26px;
      width: 100%;
      padding: 2px 2px;
      box-sizing: border-box;
      -webkit-transition: border 0.3s;
      transition: border 0.3s;
      padding: 0 5px;
   }





</style>

<script type="text/ecmascript-6">
  import { merge, getPath, setPath } from '../../../util/assist';
  import { default as common } from './field-common';
  import { default as Dropdown } from '../../../util/dropdown';

  const FUNCTION_KEYS = [13, 16, 17, 18, 19, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40];

  export default {
    props: merge({
      multiSelect: {
        type: Boolean,
        default: false
      },
      placeholder: {},
      emptyRecord: {
        type: Boolean,
        default: false
      },
      selectChange: {
        type: Function,
        default() {
          return function() {};
        }
      },
      readonly:{
        type:Boolean,
        default:false
      },
      editable: {
        type: Boolean,
        default: false
      },
      disableValue: {
        type: Array,
        default() {
          return [];
        }
      }
    }, common.props),

    data() {
      return {
        searchModel: '',
        selectActive: false,
        selectVisible: false,
        filterWord: ''
      };
    },

    computed: merge({
      isSelectOption() {
        const selectValue = this.selectValue;
        if (!this.multiSelect && (selectValue === undefined || selectValue === '' || selectValue === null)) {
          return true;
        } else {
          return false;
        }
      },
      textValue() {
        const mapping = this.mapping;
        const selectValue = this.selectValue;

        if (!this.multiSelect && (selectValue === undefined || selectValue === '' || selectValue === null)) {
          return '--Select--';
        }
        const reversedMap = {};

        for (var label in mapping) {
          if (mapping.hasOwnProperty(label)) {
            var value = mapping[label];
            reversedMap[value] = label;
          }
        }

        if (selectValue instanceof Array) {
          return selectValue.map(function(item) {
            return {
              label: reversedMap[item],
              value: item
            };
          });
        }

        if (mapping && selectValue !== null && selectValue !== undefined) {
          return reversedMap[selectValue];
        }
      },

      searchText: {
        get() {
          if (!this.selectVisible) {
            return this.textValue;
          }
          return this.searchModel;
        },
        set(newValue) {
          this.searchModel = newValue;
        }
      },

      selectValue: {
        get() {
          if (this.model && this.property) {
            return getPath(this.model, this.property);
          }
        },
        set(newValue) {
          if (this.model && this.property) {
            setPath(this.model, this.property, newValue);
          }
        }
      }
    }, common.computed),

    components: {
      VSelect: require('../select.vue')
    },

    events:common.events,

    created: common.onCreated,

    destroyed: common.onDestroyed,

    compiled: common.onCompiled,

    watch: {
      selectVisible(newVal) {
        this.filterWord = '';
        if (newVal === true) {
          Dropdown.open(this);
        } else {
          Dropdown.close(this);
        }
      }
    },

    methods: merge({
      handleClickSelect() {
        this.selectVisible = false;
        this.selectValue = '';
      },
      onDocumentClick() {
        this.selectVisible = false;
      },

      handleKeydown(event) {
        var keyCode = event.keyCode;
        if (!this.editable && FUNCTION_KEYS.indexOf(keyCode) === -1) {
          event.preventDefault();
        }

        if (keyCode === 27) {
          this.selectVisible = false;
        }
      },

      handleInput() {
          this.fetchMapping(this.searchModel);
      },

      handleSelectionChange() {
        const children = this.$refs.select.$children;
        const value = [];
        children.forEach(function(child) {
          if (child.selected) {
            value.push(child.value);
          }
        });
        this.selectValue = value;
      },

      toggleSelect() {

        if(this.readonly) return;

        this.editorFocused = true;
        this.selectActive = true;
        this.selectVisible = !this.selectVisible;
        if (this.selectValue === undefined) {
          this.selectValue = this.multiSelect ? [] : '';
        }
      },

      showSelect() {
        this.selectActive = true;
        this.selectVisible = true;
      },

      hideSelect() {
        this.selectVisible = false;
      },

      removeSelect(val) {
        const children = this.$refs.select.$children;
        const value = [];
        children.forEach(function(child) {
          if (child.selected && val !== child.value) {
            value.push(child.value);
          } else {
            child.selected = false;
          }
        });
        this.selectValue = value;
      }
    }, common.methods)
  };
</script>
