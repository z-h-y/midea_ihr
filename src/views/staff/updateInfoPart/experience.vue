<template lang="html">
  <ui-confirm header="Delete this" @confirmed="delList" :show.sync="showdel" close-on-confirm autofocus="confirm-button">
      Do you want to delete this?
  </ui-confirm>
  <div class="edit-tab">
    <div class="tab-header">
      <span>Professional Experience</span>
      <i class="fa fa-plus-square-o" aria-hidden="true" @click="add"></i>
    </div>
    <div class="exp-tab tab-content">
      <div class="exp-list fix" v-for="item in expList">
        <ul class="fix">
          <li><span>Previous Position</span>{{item.positionName}}</li>
          <li><span>Previous Company</span>{{item.company}}</li>
          <li><span>Start Date</span>{{item.startDate}}</li>
          <li><span>End Date</span>{{item.endDate}}</li>
          <li><span>References</span>{{item.witness}}</li>
          <li><span>witnessContact</span>{{item.witnessContact}}</li>
        </ul>
        <span class="list-operate exp-operate"><i class="fa fa-pencil-square-o" aria-hidden="true" @click="edit($index)"></i><i class="fa fa-trash-o" aria-hidden="true" @click="beforeDel($index)"></i></span>
      </div>
      <div class="edit-form edit-bg" v-show="isEdit">
        <v-form v-ref:expform :model="exp" :schema="expSchema" label-width="220" label-suffix="" :cols="4" form-style="update-interns-form">
          <text-field property="positionName" editor-width="220"></text-field>
          <text-field property="company" editor-width="220"></text-field>
          <text-field property="startDate" :max-date="exp.endDate" editor-width="220"></text-field>
          <text-field property="endDate" :min-date="exp.startDate" editor-width="220"></text-field>
          <text-field property="witness" editor-width="220"></text-field>
          <text-field property="witnessContact" editor-width="220"></text-field>
        </v-form>
        <div class="save-info-group">
            <ui-button color="primary mr10" @click="submitForm">Submit</ui-button>
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
    getDictMapping,formatDate
} from '../../../util/assist';
import {default as Message} from '../../../components/basic/message';
export default {
  props: [
    {
      name: 'data',
      type: Array
    },
    {
      name: 'parentId'
    },
    {
      name: 'employeeId'
    }
  ],
  data() {
    var expData = {
        positionName: {
            label: 'Previous Position',
            required: true
        },
        company: {
            label: 'Previous Company',
            required: true
        },
        startDate: {
            label: 'Start Date',
            type: 'date',
            required: true
        },
        endDate: {
            type: 'date',
            label: 'End Date',
            required: true
        },
        witness: {
            label: 'References'
        },
        witnessContact: {
            label: 'Contact Info of References'
        }
    };
    var employeeId = this.$route.params.employeeId;
    return {
      expSchema: new Schema(expData),
      delIndex: 0,
      saveIndex: 0,
      showdel: false,
      isEdit: false,
      exp: {},
      expList: [],
      index: -1
    };
  },
  computed: {},
  ready() {
    this.exp = this.expSchema.newModel();
    this.employeeId = this.employeeId || this.$route.params.employeeId;
    var employeeId = this.employeeId;
    if (employeeId) {
      this.$http.get('/employee/employees/' + employeeId + '/WorkExperience?pageSize=9999&pageIndex=1').then(function(res) {
          var data = res.data.data;
          var i, len;
          for(i = 0, len = data.length; i < len; i++) {
            data[i].startDate = formatDate(new Date(data[i].startDate));
            data[i].endDate = formatDate(new Date(data[i].endDate));
          }
          this.arrSort(data, 'startDate');
          this.expList = data;
      });
    }

  },
  attached() {},
  methods: {
    edit(index) {
      this.isEdit = true;
      this.exp.reset();
      Object.assign(this.exp, this.expList[index]);
      var el = this.$refs.expform.$el.parentNode;
      var list = document.getElementsByClassName('exp-tab')[0];
      var node = list.getElementsByClassName('exp-list')[index];
      list.insertBefore(el, node);
      node.style.display = 'none';
      this.index = index;
    },
    add() {
      this.isEdit = true;
      this.index = -1;
      this.exp.reset();
      var el = this.$refs.expform.$el.parentNode;
      var list = document.getElementsByClassName('exp-tab')[0];
      var node = list.getElementsByClassName('exp-list')[0];
      list.insertBefore(el, node);
    },
    cancel() {
      if (this.index !== -1) {
        document.getElementsByClassName('exp-list')[this.index].style.display = 'block';
      }
      this.index = -1;
      this.isEdit = false;
    },
    submitForm() {
      var data = {};
      var index = -1;
      var passed = true;
      passed = this.exp.$schema.isFormValidate(this.$refs.expform);
      if (!passed) {
        return;
      }
      this.exp.startDate = formatDate(new Date(this.exp.startDate));
      this.exp.endDate = formatDate(new Date(this.exp.endDate));
      data = {
        employeeId: this.employeeId,
        positionName: this.exp.positionName,
        company: this.exp.company,
        startDate: this.exp.startDate,
        endDate: this.exp.endDate,
        witness: this.exp.witness,
        witnessContact: this.exp.witnessContact
      };
      index = this.index;
      if (index === -1) {
        this.$http.post('/employee/employees/'+this.employeeId+'/WorkExperience',data,{
            emulateJSON: true
        }).then(function(res){
          this.isEdit = false;
          data.workHistoryId = res.body;
          this.expList.push(data);
          this.arrSort(this.expList, 'startDate');
          Message({type:'success',message:this.$t('common.saveSuccess')});
        });
      } else {
        data.workHistoryId = this.expList[index].workHistoryId;
        this.$http.put('/employee/employees/'+this.employeeId+'/WorkExperience/'+data.workHistoryId,data,{
            emulateJSON: true
        }).then(function(){
          this.isEdit = false;
          Object.assign(this.expList[index], this.exp);
          document.getElementsByClassName('exp-list')[index].style.display = 'block';
          this.arrSort(this.expList, 'startDate');
          Message({type:'success',message:this.$t('common.saveSuccess')});
        });
      }
    },
    // 对数组排序
    arrSort(arr, key) {
      arr.sort(function(a, b) {
        return b[key] > a[key] ? 1 : -1;
      })
    },
    beforeDel: function(index) {
      this.delIndex = index;
      this.showdel = true;
    },
    delList: function() {
      this.$http.delete('/employee/employees/'+this.employeeId+'/WorkExperience/'+this.expList[this.delIndex].workHistoryId).then(function(){
        this.expList.splice(this.delIndex, 1);
        Message({type:'success',message:this.$t('common.deleteSuccess')});
      })
    },
    format(value) {
      if (!value) {
        return;
      }
      return formatDate(new Date(value));
    }
  },
  components: {}
};
</script>

<style lang="css">
</style>
