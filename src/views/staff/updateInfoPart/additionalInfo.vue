<template lang="html">
  <div class="edit-tab">
    <div class="tab-content bank-tab">
      <i v-show="!isEdit" class="edit-btn fa fa-pencil-square-o" aria-hidden="true" @click="edit"></i>
      <ul class="fix" v-show="!isEdit">
        <li v-for="item in additionalList">
          <span>{{item.name}}</span>
          {{item.dist ? fixDist(item.value, item.dist) : item.value }}
        </li>
      </ul>
      <div class="edit-form" v-show="isEdit">
        <v-form v-ref:form :model="template" :schema="templateSchema" label-width="250" label-suffix="" :cols="4" form-style="update-interns-form">
            <select-field :select-change="changeTemplate" property="templateArea" :mapping="templateList" editor-width="250"></select-field>
        </v-form>
        <v-form v-ref:areatemplate :model="detailsList" :schema="detailsListSchema" label-width="250" label-suffix="" :cols="4" form-style="update-interns-form">
          <template v-for="item in areaTemplateDetails">
            <text-field v-if="item.fieldType === '0' && item.isShow === 'Y'" :property="item.fieldName" editor-width="250"></text-field>
            <select-field v-if="item.fieldType === '1' && item.isShow === 'Y'" :property="item.fieldName" editor-width="250"></select-field>
          </template>
        </v-form>
        <div class="save-info-group">
            <ui-button color="primary mr10" @click="saveComfirmed">Submit</ui-button>
            <ui-button class="btn-default-bd" @click="cancel" type="flat">Cancel</ui-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
    default as Schema
}
from '../../../schema/index';
import {
    getDictMapping
} from '../../../util/assist';
import {default as Message} from '../../../components/basic/message';
export default {
  props: [
    {
      name: 'data'
    },
    {
      name: 'employeeId'
    },
    {
      name: 'parentId'
    }
  ],
  data() {
    var isInterns = this.$route.extra === '/ihr/staff/interns';
    var isOutsource = this.$route.extra === '/ihr/staff/outsource';
    var isEmployee = !isInterns && !isOutsource;
    var employementCategory;
    if (isInterns) {
      employementCategory = 7;
    } else if (isOutsource) {
      employementCategory = 6;
    } else {
      employementCategory = 9;
    }
    var templateSchema = new Schema({
      templateArea: {
        label: 'Information Template',
        required: true
      }
    });
    return {
      templateList: {},
      employementCategory: employementCategory,
      templateSchema: templateSchema,
      template: templateSchema.newModel(),
      detailsListSchema: {},
      detailsList: {},
      detailsListData: {},
      areaTemplateDetails: [],
      isEdit: false,
      temp: {},
      additionalList: [],
      templateArea: '',
      additionalData: {}
    };
  },
  computed: {},
  created() {
    this.$http.get('/area/template/active?employementCategory=' + this.employementCategory).then(function(response) {
      if(response.data) {
        let data = response.data;
        let result = {};
        if(data && data instanceof Array) {
          for(let i = 0;i < data.length;i++) {
            result[data[i].areaTemplateName] = data[i].areaTemplateId
          }
        }
        this.templateList = result;
      }
    })
  },
  ready() {
    this.employeeId = this.employeeId || this.$route.params.employeeId;
    if (this.employeeId) {
      this.$http.get('/employee/employees/empAreaTemplates/' + this.employeeId).then(function(res) {
        this.template.templateArea = res.data.areaTemplateId;
        this.templateArea = this.template.templateArea;
        this.additionalData = res.data;
        this.setAreaTemplate(res.data.areaTemplateId, res.data);
        this.detailsList = Object.assign(this.detailsList, res.data);
      });
    }
  },
  attached() {},
  methods: {
    fixDist(value, dist) {
      var result = '';
      var curDist = dist;
      if (typeof dist === 'string') {
        curDist = this.dist[dist];
      }
      for (var key of Object.keys(curDist)) {
        if (curDist[key] === value) {
          result = key;
          break;
        }
      }
      return result;
    },
    edit() {
      this.temp = this.additionalList.slice();
      this.isEdit = true;
      this.$dispatch('ui-collapsible::refresh-height', this.parentId);
    },
    cancel() {
      this.template.templateArea = this.templateArea;
      this.setAreaTemplate(this.templateArea, this.additionalData);
      this.additionalList.splice(0, this.additionalList.length);
      this.additionalList = this.additionalList.concat(this.temp);
      this.isEdit = false;
      this.$dispatch('ui-collapsible::refresh-height', this.parentId);
    },
    changeTemplate(value) {
      if (value) {
        this.setAreaTemplate(value);
      }
    },
    setAreaTemplate(areaTemplateId, assignData) {
      // 读取模板数据
      if (!areaTemplateId) {
        return;
      }
      this.$http.post('/area/template/getAreaTemplateById?areaTemplateId=' + areaTemplateId).then(function(response) {
        var data = response.data;
        if (data) {
          var self = this;
          var additionalList = this.additionalList;
          additionalList.splice(0, additionalList.length);
          data.areaTemplateDetails.forEach(function(item) {
            self.detailsListData[item.fieldName] = {
              label: item.fieldBusinessName,
              required: item.isMustFill === 'Y' ? true : false
            }
            var obj = {};
            obj.name = item.fieldBusinessName;
            obj.label = item.fieldName;
            var value = assignData ? assignData[item.fieldName] : '';
            if (item.dataDictionary && item.fieldType === '1') {
              obj.dataDictionary = item.dataDictionary;
              var mapping = getDictMapping(item.dataDictionary)
              self.detailsListData[item.fieldName].mapping = function() {
                return mapping;
              }
              obj.mappingValue = data[item.fieldName];
              mapping.then(function(dist) {
                obj.dist = dist;
                obj.value = value;
                additionalList.push(obj);
              })
            } else {
              obj.value = value;
              additionalList.push(obj);
            }
          })
          this.detailsListSchema = new Schema(self.detailsListData);
          this.detailsList = this.detailsListSchema.newModel();
          this.areaTemplateDetails = data.areaTemplateDetails;
          if (assignData) {
            this.repalceData(this.detailsList, assignData);
          }
        }
      })
    },
    // 获得要提交的数据字段，删除不需要的
    repalceData(obj, newObj) {
      for (let key of Object.keys(obj)) {
        if (newObj.hasOwnProperty(key) && newObj[key] !== undefined) {
          obj[key] = newObj[key];
        }
      }
    },
    saveComfirmed() {
      var passed = this.template.$schema.isFormValidate(this.$refs.form);
      if (!passed) {
        return;
      }
      if (this.areaTemplateDetails.length < 1 ) {
        return
      }
      passed = this.detailsList.$schema.isFormValidate(this.$refs.areatemplate);
      if (!passed) {
        return;
      }

      this.save();
    },
    save() {
        var data = this.detailsList;
        data.employeeId = this.employeeId;
        data.areaTemplateId = this.template.templateArea;
        delete data.$listeners;
      	this.$http.post('/employee/employees/empAreaTemplates', data, {
            emulateJSON: true
        }).then(function(res) {
      		//this.data.contractId = res.body;
          this.isEdit = false;
          this.templateArea = this.template.templateArea;
          this.additionalData = this.detailsList;
          this.additionalList.forEach(function(item) {
            item.value = data[item.label];
          });
          this.$dispatch('ui-collapsible::refresh-height', this.parentId);
      		Message({type:'success',message:this.$t('common.saveSuccess')});
      	});
    }
  },
  components: {}
};
</script>

<style lang="css">
.contract-save-btn {
  font-size: 20px;
  text-align: right;
  cursor: pointer;
}
</style>
