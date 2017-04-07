<style lang="less">
#select-indicator {
  .ui-select-dropdown {
    min-width: 20px;
  }

  .ind-th {
    padding: 12px 10px;
    color: #545454;
    font-weight: normal;
    text-align: left;
    border: 1px solid #e4e4e4;
    background: rgba(0, 0, 0, 0.05);
  }

  .field-content {
    padding-left: 10px;
    padding-right: 10px;
  }

  .w150 {
      width: 140px;
  }

  .w100 {
      width: 100px;
  }

  .w60 {
      width: 60px;
  }
  .w16 {
    width: 16px;
    padding-right: 10px;
  }
  .field-bottom{
    position:relative;
    border-bottom:1px solid #e4e4e4;
    // padding-left:10px;
    // width:95%;
  }
  .field-row{
    margin-left: 10px;
  }

.field-hint {
    font-size: 12px;
    line-height: 18px;
    height: 18px;
    position: absolute;
}
.text-editor > .inrement-text {
    vertical-align: inherit;
    display: inline-block;
    line-height: 28px;
    background-color: transparent;
    border: none;
    outline: none;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;


}
.field-row {
  margin-top:10px;
  padding-bottom: 18px;
}

.indicator-section{
  margin-left:10px;
}

.indicator-main {
  height:342px;
  overflow-y:auto;
}
.indicator-bottom{
  position:absolute;
  left:-4px;
  bottom:-10px;
  width:100%;
  border-bottom:1px solid #e4e4e4;
}
.ui-checkbox-checkmark {
  height: 16px;
  width: 16px;
}
.ui-checkbox-checkmark, .ui-checkbox {
  margin-bottom: 0;
}
.ui-checkbox-checkmark:after {
  left: 5px;
  bottom: 4px;
  width: 6px;
  height: 10px;
}





}


#deleteConfirm {
  .ui-modal-container {
    width: 300px;
    height: 150px;
    overflow: hidden;
  }
}


</style>
<template>
<div>
    <ui-modal id="select-indicator" :show="show" type="large" :title="$t('performance.indicatorsSetting')" ref="itemforms">
        <ui-button class="ml10 mr10 dis-tc btn-default-bd" @click="showConfirm" color="white" icon="fa-remove">{{$t('button.delete')}}</ui-button>
        <div class="field-row">
            <div class="cell tl w16 ind-th">
              <label class="ui-checkbox" :class="{'ui-checkbox': true, 'checked': checkAll}">
                  <input class="ui-checkbox-input" type="checkbox" :checked="checkAll" @change="toggleAllCheckboxes($event.target.checked)">

                  <div class="ui-checkbox-checkmark">
                      <div class="ui-checkbox-focus-ring"></div>
                  </div>
              </label>
            </div>
            <div class="cell tl w150 ind-th">
                <label>{{$t('performance.indicatorName')}}</label>
            </div>
            <div class="cell tl w60 ind-th">
                <label>{{$t('performance.unit')}}</label>
            </div>
            <div class="cell tl w150 ind-th">
                <label>{{$t('performance.target')}}</label>
            </div>
            <div class="cell tl w60 ind-th">
                <label>{{$t('performance.weight')}}(%)</label>
            </div>
            <div class="cell tl w150 ind-th">
                <label>{{$t('performance.criteria')}}	</label>
            </div>
            <div class="cell tl w100 ind-th">
                <label>{{$t('performance.mandatory')}}</label>
            </div>
            <!-- <div class="cell tl w100 ind-th">
                <label>operate</label>
            </div> -->
        </div>
          <div class="indicator-main">
            <div class="indicator-section" v-for="item in tableData">
              <v-form class="mt5" :model="item" :schema="indSettingsSchema" label-width="0" label-suffix="" :cols="1">
                <div class="field-row field-bottom">
                    <!-- <div class="indicator-bottom">

                    </div> -->
                    <div class="cell w16">
                      <label class="ui-checkbox" :class="{'ui-checkbox': true, 'checked': isSelectedRow(item)}">
                          <input class="ui-checkbox-input" type="checkbox" @change="toggleCheckbox($event.target.checked, item)" :checked="isSelectedRow(item)">

                          <div class="ui-checkbox-checkmark">
                              <div class="ui-checkbox-focus-ring"></div>
                          </div>
                      </label>
                    </div>
                    <div class="cell w150">
                        <text-increment :title="item.indicatorName" label-width="0" property='indicatorName' editor-width="140" :hide-label="true" :readonly="true"></text-increment>
                    </div>
                    <div class="cell w60">
                        <text-field label-width="0" :hide-label="true" property='unit' editor-width="60"></text-field>
                    </div>
                    <div class="cell w150">
                        <text-field label-width="0" type="textarea"  :hide-label="true" property='target' editor-width="140"></text-field>
                    </div>
                    <div class="cell w60">
                        <text-field  label-width="0" :hide-label="true" property='weight' type="number" editor-width="60"></text-field>
                    </div>
                    <div class="cell w150">
                        <text-field label-width="0" type="textarea" :hide-label="true" property='criteria' editor-width="130" ></text-field>
                    </div>
                    <div class="cell w100">
                      <select-field label-width="0" :hide-label="true" property='mandatory' editor-width="100"></select-field>
                    </div>
                    <!-- <div class="cell w60">
                      <button class="operate" @click="showConfirm(item)"><i class="fa fa-trash"></i> </button>
                    </div> -->
                </div>
              </v-form>
            </div>

          </div>

        <div slot="footer">
           <ui-button color="primary" @click="save">{{$t('button.save')}}</ui-button>
           <ui-button @click="close">{{$t('button.close')}}</ui-button>
       </div>
     </ui-modal>
     <div id = "deleteConfirm">

     </div>
</div>
</template>

<script type="text/ecmascript6">
import {
    removeClass, addClass
}
from 'wind-dom';
import {
    transformDict
}
from '../../util/assist.js';
import { default as Message } from '../../components/basic/message';
import {default as Schema} from '../../schema/index';


export default {
  props: {
      show: {
          type: Boolean,
          default: false
      },
      type: {
        type: String,
        default:''
      },
      params: {
          type: Object,
          default: {}
      },
      indicatorSetting:{
          type: String,
          default: ""
      }
  },
  computed: {

  },
  data() {
    let self = this;
    let mandatoryOption = [
        {
            text: 'Yes',
            value: '1'
        },
        {
            text: 'NO',
            value: '0'
        }
    ];

    let indSettingsSchema = new Schema({
        indicatorName: {
            label: self.$t('performance.templateName'),
            required: true,
            whitespace: false
        },
        unit: {
            label: self.$t('performance.templateCategory'),
            required: true
        },
        target: {
            label: self.$t('performance.templateCategory'),
            required: true
        },
        weight: {
            label: self.$t('performance.templateCategory'),
            required: true,
            rules: {
                type: 'custom',
                message: self.$t('performance.message.positiveInteger'),
                validate() {
                    var isValidate = true;
                    if (this.weight < 1 || this.weight > 100) {
                        isValidate = false;
                    } else {
                        if (this.weight % 1 !== 0) {
                            isValidate = false;
                        }
                    }
                    return isValidate;
                }
            }
        },
        positionName: {
            label: self.$t('performance.indicatorsSetting'),
            required: true,
            whitespace: false
        },
        orgFullName: {
            label: self.$t('performance.description'),
            required: true,
            whitespace: false
        },
        criteria: {
            label: self.$t('performance.description'),
            required: true,
            whitespace: false
        },
        mandatory: {
            label: self.$t('performance.description'),
            required: true,
            whitespace: false,
            mapping() {
              var key1 = self.$t('common.yes');
              var key2 = self.$t('common.no');
              var obj = {};
              obj[key1] = 1;
              obj[key2] = 0;
              return obj;
            }
        }
    });

    return {
      tableData:[],
      mandatoryOption,
      optItem:{},
      isDelConfirm:false,
      indSettingsSchema:indSettingsSchema,
      indSettingsModel:indSettingsSchema.newModel(),
      checkAll: false,
      selectedTo: [],
      delItem: []
    };
  },
  methods: {
    open() {
      this.$refs.itemforms.open()
    },
    close() {
      this.$refs.itemforms.close()
    },
    initTable() {
      this.tableData = [];
      this.selectedTo = [];
      this.delItem = [];
      this.checkAll = false;
      let tableUrl = this.type == 'organization' ? '/performance/schemeInfos/department/indicatorList' : '/performance/schemeInfos/indicatorList'
      this.$http.get(tableUrl,{
          params: this.params,
          emulateJSON: true
      }).then((response) => {
        let resultData = response.data.data;
        for(let item of resultData) {
          let model = this.indSettingsSchema.newModel();
           for(let key in item) {
             model[key] = item[key];
           }
           this.tableData.push(model);
        }
      });
    },
    showConfirm(value) {
      if (this.selectedTo.length < 1) {
        Message({
          type:'error',
          message:this.$t('performance.message.indicatorDoCheckItemsChooseOne')
        })
        return;
      }
      this.deleteConfirmed();
      // this.isDelConfirm = true;
      // this.optItem = value;
    },
    save() {
      let _self = this;
      let passed = true;
      let weightCount = this.countWeigth();
      if(_self.tableData.length < 1) {
        Message({
          type:'error',
          message:this.$t('performance.message.indicatorSaveEmpty')
        })
        return;
      }
      if(weightCount>100 || weightCount<0) {
        Message({
          type:'error',
          message:this.$t('performance.message.indicatorSaveWeightNumRange')
        })
        return;
      } else if(weightCount!=100 && this.indicatorSetting === "administrator") {
        Message({
          type:'error',
          message:this.$t('performance.message.indicatorSaveWeightNumRange2')
        })
        return;
      }

      _self.tableData.forEach(function(item, index) {
          let vform = _self.$refs.itemforms.$children[index+4];
          var isPassed = vform.isFormValidate();
          if (!isPassed) {
            passed = false;
          }
      });
      if (!passed) {
        return;
      }

      for(let item of this.tableData) {
        if(!!item.mandatorycache) {
          item.mandatory = item.mandatorycache.value;
        }
      }

      let params = {
          schemeId:this.params.schemeId,
          employeeId:this.params.employeeId,
          schemeEmployeeId:this.params.schemeEmployeeId,
          schemeIndicatorList: this.tableData
      }
      if (this.delItem.length > 0) {
        this.$http.delete(`/performance/schemeInfo/indicator/delete`,{
          params:{
            // employeeIndicatorIds:[this.optItem.employeeIndicatorId]
            employeeIndicatorIds: this.delItem
          }
        }).then((response) => {
          this.$emit('modelsubmit',params);
        })
      } else {
        this.$emit('modelsubmit',params);
      }
    },
    deleteConfirmed() {
      var tableData = this.tableData;
      if (this.selectedTo.length === tableData.length) {
        Message({
          type:'error',
          message:this.$t('performance.message.indicatorSaveEmpty')
        })
        return
      }
      this.selectedTo.forEach(function(item) {
        tableData.forEach(function(value, key) {
          if (item === value.employeeIndicatorId) {
            tableData.splice(key, 1);
          }
        });
      });
      this.delItem = this.delItem.concat(this.selectedTo);
      this.selectedTo = [];
      this.isDelConfirm = false;
    },
    countWeigth() {
      let result = 0;
      for(let item of this.tableData) {
        result += parseInt(item.weight)
      }
      return result;
    },
    toggleCheckbox: function(isChecked, dataItem) {
        var selected = dataItem['employeeIndicatorId'];
        if (isChecked) {
            this.selectedTo.push(selected)
        } else {
            var index = this.selectedTo.indexOf(selected);
            this.selectedTo.splice(index, 1)
        }
        if (this.selectedTo.length === this.tableData.length) {
            this.checkAll = true
        } else {
            this.checkAll = false
        }
    },
    isSelectedRow: function(dataItem) {
        return this.selectedTo.indexOf(dataItem['employeeIndicatorId']) >= 0;
    },
    toggleAllCheckboxes: function(isChecked) {
        var self = this
        if (isChecked) {
            this.checkAll = true
            this.tableData.forEach(function(dataItem, index) {
                if (!self.isSelectedRow(dataItem)) {
                    self.selectedTo.push(dataItem['employeeIndicatorId'])
                }
            })
        } else {
            this.checkAll = false
            this.tableData.forEach(function(dataItem, index) {
                self.selectedTo.$remove(dataItem['employeeIndicatorId'])
            })
        }
    }
  }
}
</script>
