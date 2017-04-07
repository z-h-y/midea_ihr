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
    padding-left: 0px;
    padding-right: 15px;
  }

  .w150 {
      width: 130px;
  }

  .w100 {
      width: 100px;
  }

  .w60 {
      width: 60px;
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
<ui-modal id="select-indicator" :show="show" type="large" :title="$t('performance.indicatorSetting')" ref="itemforms">
    <div class="field-row">
        <div class="cell tl w100 ind-th">
            <label>{{$t('performance.indicatorName')}}</label>
        </div>
        <div class="cell tl w100 ind-th">
            <label>{{$t('performance.unit')}}</label>
        </div>
        <div class="cell tl w100 ind-th">
            <label>{{$t('performance.target')}}</label>
        </div>
        <div class="cell tl w100 ind-th">
            <label>{{$t('performance.weight')}}</label>
        </div>
        <div class="cell tl w100 ind-th">
            <label>{{$t('performance.criteria')}}	</label>
        </div>
        <div class="cell tl w100 ind-th">
            <label>{{$t('performance.mandatory')}}</label>
        </div>
        <div class="cell tl w100 ind-th">
            <label>{{$t('performance.operate')}}</label>
        </div>
    </div>
    <template v-for="item in tableData">
      <v-form class="mt5" :model="item" :schema="indSettingsSchema" label-width="0" label-suffix="" :cols="1">
        <div class="field-row">
            <div class="cell w100">
                <text-increment label-width="0" property='indicatorName' editor-width="100" :hide-label="true" :readonly="true"></text-increment>
            </div>
            <div class="cell w100">
                <text-field label-width="0" :hide-label="true" property='unit' :hide-label="true" editor-width="100"></text-field>
            </div>
            <div class="cell w100">
                <text-field label-width="0" :hide-label="true" property='target' :hide-label="true" editor-width="100"></text-field>
            </div>
            <div class="cell w100">
                <text-field  label-width="0" :hide-label="true" property='weight' type="number" :hide-label="true" editor-width="100"></text-field>
            </div>
            <div class="cell w100">
                <text-field label-width="0" :hide-label="true" property='criteria' :hide-label="true" editor-width="100"></text-field>
            </div>
            <div class="cell w100">
              <select-field label-width="0" :hide-label="true" property='mandatory' :hide-label="true" editor-width="100"></select-field>
            </div>
            <div class="cell w100">
              <button class="operate" @click="showConfirm(item)"><i class="fa fa-trash"></i> </button>
            </div>
        </div>
      </v-form>
    </template>
    <div slot="footer">
       <ui-button color="primary" @click="save">{{$t('button.save')}}</ui-button>
       <ui-button @click="show = false">{{$t('button.close')}}</ui-button>
   </div>
 </ui-modal>
 <div id = "deleteConfirm">
   <ui-confirm
     @confirm="deleteConfirmed" :show="isDelConfirm"
     close-on-confirm>
     {{$t('common.deleteConfirm')}}
   </ui-confirm>
 </div>
 </template>

<script>
import {
    removeClass, addClass
}
from 'wind-dom';
import { default as Message } from '../../components/basic/message';
import {default as Schema} from '../../schema/index';


export default {
  props: {
      show: {
          type: Boolean,
          default: false
      },
      params: {
          type: Object,
          default: {}
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
            required: true
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
    };
  },
  events: {
    'indModal:refresh': function() {
        this.initTable();
    }
  },
  methods: {
    initTable() {
      this.tableData = [];
      this.$http.get('/performance/schemeInfos/indicatorList',{
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
      this.isDelConfirm = true;
      this.optItem = value;
    },
    save() {
      let _self = this;
      let passed = true;

      if(_self.tableData.length < 1) {
        Message({
          type:'error',
          message:this.$t('performance.message.indicatorSaveEmpty')
        })
        return;
      }

      _self.tableData.forEach(function(item, index) {
          let vform = _self.$refs.itemforms.$children[index+3];
          passed = vform.isFormValidate();
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
          schemeIndicatorList: this.tableData
      }
      // unknow 暂时还不知道这一项的作用，这里先注释掉
      // this. $dispatch('indModal:submit',params);
    },
    deleteConfirmed() {
      let _self = this;
      this.$http.delete(`/performance/schemeInfo/indicator/delete`,{
        params:{
          employeeIndicatorIds:[this.optItem.employeeIndicatorId]
        }
      }).then((response) => {
        Message({
          type: 'success',
          message: this.$t('common.deleteSuccess')
        })
        _self.initTable();
        this.isDelConfirm = false;
      })
    }
  }
}
</script>
