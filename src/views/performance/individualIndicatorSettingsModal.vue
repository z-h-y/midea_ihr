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
<ui-modal id="select-indicator" :show.sync="show" type="large" header="Indicators Settings" v-ref:itemforms>
    <div class="field-row">
        <div class="cell tl w100 ind-th">
            <label>Indicator Name</label>
        </div>
        <div class="cell tl w100 ind-th">
            <label>Unit </label>
        </div>
        <div class="cell tl w100 ind-th">
            <label>Target</label>
        </div>
        <div class="cell tl w100 ind-th">
            <label>Weight</label>
        </div>
        <div class="cell tl w100 ind-th">
            <label>Criteria	</label>
        </div>
        <div class="cell tl w100 ind-th">
            <label>Mandatory</label>
        </div>
        <div class="cell tl w100 ind-th">
            <label>operate</label>
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
       <ui-button color="primary" @click="save">Save</ui-button>
       <ui-button @click="show = false">Close</ui-button>
   </div>
 </ui-modal>
 <div id = "deleteConfirm">
   <ui-confirm
     @confirmed="deleteConfirmed" :show.sync="isDelConfirm"
     close-on-confirm>
     Do you want to delete this?
   </ui-confirm>
 </div>
 </template>

<script type="text/ecmascript6">
import {
    removeClass, addClass
}
from 'wind-dom';
import { default as Message } from '../../components/basic/message';
import {default as Schema} from '../../schema/index';

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
        label: 'Template Name',
        required: true,
        whitespace: false
    },
    unit: {
        label: 'Template Category',
        required: true
    },
    target: {
        label: 'Template Category',
        required: true
    },
    weight: {
        label: 'Template Category',
        required: true
    },
    positionName: {
        label: 'Indicators Setting',
        required: true,
        whitespace: false
    },
    orgFullName: {
        label: 'Description',
        required: true,
        whitespace: false
    },
    criteria: {
        label: 'Description',
        required: true,
        whitespace: false
    },
    mandatory: {
        label: 'Description',
        required: true,
        whitespace: false,
        mapping: {
          'Yes':'1',
          'No':'0'
        }
    }
});

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
  ready() {
    // this.initTable();
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
      debugger;
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
        debugger;
          let vform = _self.$refs.itemforms.$children[index+3];
          passed = item.$schema.isFormValidate(vform);
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
      this.$dispatch('indModal:submit',params);
    },
    deleteConfirmed() {
      let _self = this;
      debugger;
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
