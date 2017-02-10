<template lang="html">
  <ui-confirm header="Delete this" @confirmed="delList" :show.sync="showdel" close-on-confirm autofocus="confirm-button">
      Do you want to delete this?
  </ui-confirm>
  <div class="edit-tab">
    <div class="tab-header">
      <span>Family Information</span>
      <i class="fa fa-plus-square-o" aria-hidden="true" @click="add"></i>
    </div>
    <div class="family-tab">
      <div class="family-head fix" v-show="familyList.length > 0">
        <span>Given Name</span>
        <span>Relationship</span>
        <span>Internal Relatives</span>
        <span>Company</span>
        <span>Primary Phone</span>
      </div>
      <div class="family-list fix" v-for="item in familyList">
        <span>{{item.name}}</span>
        <span>{{fixDist(item.relationship, relationshipDist)}}</span>
        <span>{{fixDist(item.isInternalRelatives, 'whetherType')}}</span>
        <span>{{item.familyCompany}}</span>
        <span>{{item.primaryPhone}}</span>
        <span class="list-operate"><i class="fa fa-pencil-square-o" aria-hidden="true" @click="edit($index)"></i><i class="fa fa-trash-o" aria-hidden="true" @click="beforeDel($index)"></i></span>
      </div>
      <div class="edit-form edit-bg" v-show="isEdit">
        <v-form v-ref:familyform :model="family" :schema="familySchema" label-width="190" label-suffix="" :cols="5" form-style="update-interns-form">
            <text-field property="name" editor-width="140"></text-field>
            <select-field property="relationship" :mapping="relationshipDist" editor-width="140"></select-field>
            <radiogroup-field property="isInternalRelatives" :mapping="dist.whetherType"></radiogroup-field>
            <text-field property="familyCompany" editor-width="140"></text-field>
            <text-field property="primaryPhone" editor-width="140"></text-field>
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
    getDictMapping
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
    },
    {
      name: 'dist'
    }
  ],
  data() {
    var familyData = {
        name: {
            label: 'Name',
            required: true
        },
        relationship: {
            label: 'Relationship',
            required: true
        },
        isInternalRelatives: {
            label: 'Internal Relatives',
            default: '2'
        },
        familyCompany: {
            label: 'Company'
        },
        primaryPhone: {
            label: 'Primary Phone'
        }
    };
    return {
      familySchema: new Schema(familyData),
      delIndex: 0,
      saveIndex: 0,
      showdel: false,
      relationshipDist: {},
      family: {},
      isEdit: false,
      index: -1,
      familyList: []
    };
  },
  computed: {},
  created() {
    var self = this;
    getDictMapping('RELATIONSHIP').then(function(res) {
      self.relationshipDist = res;
    });
  },
  ready() {
    this.family = this.familySchema.newModel();
    this.employeeId = this.employeeId || this.$route.params.employeeId;
    var employeeId = this.employeeId;
    if (employeeId) {
      this.$http.get('/employee/employees/' + employeeId + '/FamilyMember?pageSize=9999&pageIndex=1').then(function(res) {
          this.familyList = res.data.data;
          for(var i = 0, len = res.data.data.length; i < len; i++) {
            this.data.push(this.familySchema.newModel());
            this.data[i] = Object.assign(this.data[i], res.data.data[i]);
          }
          this.$dispatch('ui-collapsible::refresh-height', this.parentId);
      });
    }
  },
  attached() {},
  methods: {
    add() {
      this.isEdit = true;
      this.index = -1;
      this.family.reset();
      var el = this.$refs.familyform.$el.parentNode;
      var list = document.getElementsByClassName('family-tab')[0];
      var node = list.getElementsByClassName('family-list')[0];
      list.insertBefore(el, node);
    },
    edit(index) {
      this.isEdit = true;
      this.family.reset();
      Object.assign(this.family, this.familyList[index]);
      var el = this.$refs.familyform.$el.parentNode;
      var list = document.getElementsByClassName('family-tab')[0];
      var node = list.getElementsByClassName('family-list')[index];
      list.insertBefore(el, node);
      node.style.display = 'none';
      this.index = index;
    },
    submitForm() {
      var data = {};
      var index = -1;
      var passed = true;
      passed = this.family.$schema.isFormValidate(this.$refs.familyform);
      if (!passed) {
        return;
      }
      index = this.index;
      data = {
        employeeId: this.employeeId,
        name: this.family.name,
        relationship: this.family.relationship,
        isInternalRelatives: this.family.isInternalRelatives,
        familyCompany: this.family.familyCompany,
        primaryPhone: this.family.primaryPhone
      };
      if (index === -1) {
        this.$http.post('/employee/employees/'+this.employeeId+'/FamilyMember',data,{
            emulateJSON: true
        }).then(function(res) {
          this.isEdit = false;
          data.familyMemberId = res.body;
          this.familyList.push(data);
          Message({type:'success',message:this.$t('common.saveSuccess')});
        });
      } else {
        data.familyMemberId = this.familyList[index].familyMemberId;
        this.$http.put('/employee/employees/'+this.employeeId +'/FamilyMember/'+ data.familyMemberId,data,{
            emulateJSON: true
        }).then(function(){
          this.isEdit = false;
          Object.assign(this.familyList[index], this.family);
          document.getElementsByClassName('family-list')[index].style.display = 'block';
          Message({type:'success',message:this.$t('common.saveSuccess')});
        });
      }
    },
    cancel() {
      this.isEdit = false;
      if (this.index !== -1) {
        document.getElementsByClassName('family-list')[this.index].style.display = 'block';
      }
      this.index = -1;
    },
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
    beforeDel: function(index) {
      this.delIndex = index;
      this.showdel = true;
    },
    delList: function() {
      this.$http.delete('/employee/employees/'+this.employeeId+'/FamilyMember/'+this.familyList[this.delIndex].familyMemberId).then(function(){
        this.familyList.splice(this.delIndex, 1);
        Message({type:'success',message:this.$t('common.deleteSuccess')});
      });
    },
    beforeSave(index) {
      var passed = this.data[index].$schema.isFormValidate(this.$children[index + 2]);
      if (!passed) {
        return;
      }
      this.saveIndex = index;
      this.save();
      // this.showSave = true;
    }
  },
  components: {}
};
</script>

<style lang="css">
</style>
