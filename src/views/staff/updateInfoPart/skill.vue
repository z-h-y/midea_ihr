<template lang="html">
  <ui-confirm header="Delete this" @confirmed="delList" :show.sync="showdel" close-on-confirm autofocus="confirm-button">
      Do you want to delete this?
  </ui-confirm>
  <div class="edit-tab">
    <div class="tab-header">
      <span>Skill & Language</span>
      <i class="fa fa-plus-square-o" aria-hidden="true" @click="add"></i>
    </div>
    <div class="skill-tab tab-content">
      <div class="skill-list fix" v-for="item in skillList">
        <p>
          <span class="skill-type">{{item.skillType}}</span>
          <span class="skill-level">{{fixDist(item.skillLevel, dist.grade)}}</span>
          <span class="list-operate"><i class="fa fa-pencil-square-o" aria-hidden="true" @click="edit($index)"></i><i class="fa fa-trash-o" aria-hidden="true" @click="beforeDel($index)"></i></span>
        </p>
      </div>
      <div class="edit-form edit-bg" v-show="isEdit">
        <v-form v-ref:skillform :model="skill" :schema="skillSchema" label-width="0" label-suffix="" :cols="4">
            <text-field :hide-label="true" property="skillType" editor-width="227"></text-field>
            <select-field :hide-label="true" :mapping="dist.grade" property="skillLevel" editor-width="227"></select-field>
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
      name: 'editAble',
      type: Boolean,
      default: true
    },
    {
      name: 'employeeId'
    },
    {
      name: 'dist',
      type: Object
    }
  ],
  data() {
    let skillSchemaData = {
      skillType: {
          label: 'Skill Type',
          required: true
      },
      skillLevel: {
          label: 'Skill Level',
          required: true
      }
    };
    return {
      // skillRules: [{text: 'good', min: 50, max: 100},{text: 'bad', min: 0, max: 49}],
      skillSchema: new Schema(skillSchemaData),
      delIndex: 0,
      saveIndex: 0,
      showdel: false,
      showSave: false,
      skill: {},
      skillList: [],
      isEdit: false,
      index: -1
    };
  },
  computed: {
    skillRules() {
      var arr = [];
      var grade = this.dist.grade;
      for (var key of Object.keys(grade)) {
        arr.push({text: key, value: grade[key]});
      }
      arr.sort(function(a, b) {
        return b.value - a.value;
      })
      arr.forEach(function(item, key) {
        item.min = key;
        item.max = key;
      })
      return arr;
    }
  },
  ready() {
    this.skill = this.skillSchema.newModel();
    this.employeeId = this.employeeId || this.$route.params.employeeId;
    var employeeId = this.employeeId;
    if (employeeId) {
      this.$http.get('/employee/employees/' + employeeId + '/Skill?pageSize=9999&pageIndex=1').then(function(res) {
          this.data = res.data.data;
          this.skillList = res.data.data;
          for (var i = 0, len = this.data.length; i < len; i++) {
            this.data[i].value = this.getValue(this.data[i].skillLevel);
            this.data[i].skillName = this.skillSchema.newModel();
            this.data[i].skillName.skillType = this.data[i].skillType;
          }
          this.$dispatch('ui-collapsible::refresh-height', this.parentId);
      });
    }
  },
  attached() {},
  methods: {
    fixDist(value, dist) {
      var result = '';
      var curDist = dist;
      for (var key of Object.keys(curDist)) {
        if (curDist[key] === value) {
          result = key;
          break;
        }
      }
      return result;
    },
    add() {
      this.isEdit = true;
      this.index = -1;
      this.skill.reset();
      var el = this.$refs.skillform.$el.parentNode;
      var list = document.getElementsByClassName('skill-tab')[0];
      var node = list.getElementsByClassName('skill-list')[0];
      list.insertBefore(el, node);
    },
    edit(index) {
      this.isEdit = true;
      this.skill.reset();
      Object.assign(this.skill, this.skillList[index]);
      var el = this.$refs.skillform.$el.parentNode;
      var list = document.getElementsByClassName('skill-tab')[0];
      var node = list.getElementsByClassName('skill-list')[index];
      list.insertBefore(el, node);
      node.style.display = 'none';
      this.index = index;
    },
    cancel() {
      this.isEdit = false;
      if (this.index !== -1) {
        document.getElementsByClassName('skill-list')[this.index].style.display = 'block';
      }
      this.index = -1;
    },
    submitForm() {
      var data = {};
      var index = -1;
      var passed = true;
      passed = this.skill.$schema.isFormValidate(this.$refs.skillform);
      if (!passed) {
        return;
      }
      data = {
        employeeId: this.employeeId,
        skillLevel: this.skill.skillLevel,
        skillType: this.skill.skillType
      };
      index = this.index;
      if (index === -1) {
        this.$http.post('/employee/employees/'+this.employeeId+'/Skill',data,{
            emulateJSON: true
        }).then(function(res){
          this.isEdit = false;
          data.skillId = res.body;
          this.skillList.push(data);
          Message({type:'success',message:this.$t('common.saveSuccess')});
        });
      } else {
        data.skillId = this.skillList[index].skillId;
        this.$http.put('/employee/employees/'+this.employeeId+'/Skill/'+data.skillId,data,{
            emulateJSON: true
        }).then(function(){
          this.isEdit = false;
          Object.assign(this.skillList[index], this.skill);
          document.getElementsByClassName('skill-list')[index].style.display = 'block';
          Message({type:'success',message:this.$t('common.saveSuccess')});
        });
      }
    },
    // 获取slider的值
    getValue(level) {
      var value = 0;
      var rules = this.skillRules;
      for (var i = 0, len = rules.length; i < len; i++) {
        if (level === rules[i].text) {
          value = rules[i].max;
          break;
        }
      }
      return value;
    },
    beforeDel: function(index) {
      this.delIndex = index;
      this.showdel = true;
    },
    delList: function() {
      this.$http.delete('/employee/employees/'+this.employeeId+'/Skill/'+this.skillList[this.delIndex].skillId).then(function(){
        this.skillList.splice(this.delIndex, 1);
        Message({type:'success',message:this.$t('common.deleteSuccess')});
      })
    },
    save() {
      var skillList = this.data;
      var index = this.saveIndex;
      var skillId = skillList[index].skillId;
      var data = {
        employeeId: this.employeeId,
        skillLevel: skillList[index].skillLevel,
        skillType: skillList[index].skillName.skillType
      };
      if (!skillId) {
        this.$http.post('/employee/employees/'+this.employeeId+'/Skill',data,{
            emulateJSON: true
        }).then(function(res){
          skillList[index].skillId = res.body;
          Message({type:'success',message:this.$t('common.saveSuccess')});
        });
      } else {
        data.skillId = skillId;
        this.$http.put('/employee/employees/'+this.employeeId+'/Skill/'+skillId,data,{
            emulateJSON: true
        }).then(function(){
          Message({type:'success',message:this.$t('common.saveSuccess')});
        });
      }
    }
  },
  components: {
    skillSlider: require('../skillSlider.vue')
  }
};
</script>

<style lang="css">
.skill-slider li {
    display: flex;
}
.skill-slider li > span {
    width: 25%;
    line-height: 65px;
    text-align: right;
    margin-right: 20px;
}
.skill-slider li > span input {
    text-align: right;
    border: 1px solid #dee4e9;
    border-radius: 2px;
    line-height: 26px;
    padding: 2px;
    box-sizing: border-box;
    -webkit-transition: border 0.3s;
    transition: border 0.3s;
}
.skill-slider .slider-line {
    width: 50%;
}
.del-skill {
    line-height: 65px;
    cursor: pointer;
    font-size: 20px;
    margin-left: 20px;
}
.save-skill {
  line-height: 65px;
  cursor: pointer;
  font-size: 20px;
  margin-left: 20px;
}
.skill-name-form {
  margin-top: 15px;
}
</style>
