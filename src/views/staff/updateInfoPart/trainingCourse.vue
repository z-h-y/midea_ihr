<template lang="html">
  <ui-confirm header="Delete this" @confirmed="delList" :show.sync="showdel" close-on-confirm autofocus="confirm-button">
      Do you want to delete this?
  </ui-confirm>
  <div class="edit-tab">
    <div class="tab-header">
      <span>Training Course</span>
      <i class="fa fa-plus-square-o" aria-hidden="true" @click="add"></i>
    </div>
    <div class="training-tab tab-content">
      <div class="training-list fix" v-for="item in trainingList">
        <ul class="fix">
          <li><span>Training Name</span>{{item.trainingName}}</li>
          <li><span>Course</span>{{item.courses}}</li>
          <li><span>Start Date</span>{{item.startDate}}</li>
          <li><span>End Date</span>{{item.endDate}}</li>
          <li><span>Name of Certificate</span>{{item.certificate}}</li>
          <li><span>Type of Training</span>{{fixDist(item.trainingType, trainingType)}}</li>
        </ul>
        <span class="list-operate training-operate"><i class="fa fa-pencil-square-o" aria-hidden="true" @click="edit($index)"></i><i class="fa fa-trash-o" aria-hidden="true" @click="beforeDel($index)"></i></span>
      </div>
      <div class="edit-form edit-bg" v-show="isEdit">
        <v-form v-ref:trainingform :model="training" :schema="courseSchema" label-width="140" label-suffix="" :cols="6" form-style="update-interns-form">
            <text-field property="trainingName" editor-width="140"></text-field>
            <text-field property="courses" editor-width="140"></text-field>
            <text-field property="startDate" :max-date="training.endDate || curDate" editor-width="140"></text-field>
            <text-field property="endDate" :min-date="training.startDate" editor-width="140"></text-field>
            <text-field property="certificate" editor-width="140"></text-field>
            <select-field property="trainingType" :mapping="trainingType" editor-width="140"></select-field>
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
    var courseData = {
        trainingName: {
            label: 'Training Name',
            required: true
        },
        courses: {
            label: 'Course',
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
        certificate: {
            label: 'Name of Certificate'
        },
        trainingType: {
            label: 'Type of Training'
        }
    };
    return {
      courseSchema: new Schema(courseData),
      delIndex: 0,
      saveIndex: 0,
      showdel: false,
      trainingList: [],
      training: {},
      isEdit: false,
      index: -1,
      trainingType: {}
    };
  },
  computed: {
    curDate() {
      return formatDate(new Date());
    }
  },
  created() {
    var self = this;
    getDictMapping('TRAINING_TYPE').then(function(res) {
      self.trainingType = res;
    });
  },
  ready() {
    this.training = this.courseSchema.newModel();
    this.employeeId = this.employeeId || this.$route.params.employeeId;
    var employeeId = this.employeeId;
    if (employeeId) {
      this.$http.get('/employee/employees/' + employeeId + '/Training?pageSize=9999&pageIndex=1').then(function(res) {
          this.trainingList = res.data.data;
          var data = res.data.data;
          for(var i = 0, len = data.length; i < len; i++) {
            data[i].startDate = formatDate(new Date(data[i].startDate));
            data[i].endDate = formatDate(new Date(data[i].endDate));
          }
          this.arrSort(this.trainingList, 'startDate');
          this.trainingList = data;
      });
    }

  },
  attached() {},
  methods: {
    add() {
      this.isEdit = true;
      this.index = -1;
      this.training.reset();
      var el = this.$refs.trainingform.$el.parentNode;
      var list = document.getElementsByClassName('training-tab')[0];
      var node = list.getElementsByClassName('training-list')[0];
      list.insertBefore(el, node);
    },
    edit(index) {
      this.isEdit = true;
      this.training.reset();
      Object.assign(this.training, this.trainingList[index]);
      var el = this.$refs.trainingform.$el.parentNode;
      var list = document.getElementsByClassName('training-tab')[0];
      var node = list.getElementsByClassName('training-list')[index];
      list.insertBefore(el, node);
      node.style.display = 'none';
      this.index = index;
    },
    cancel() {
      this.isEdit = false;
      if (this.index !== -1) {
        document.getElementsByClassName('training-list')[this.index].style.display = 'block';
      }
      this.index = -1;
    },
    // 对数组排序
    arrSort(arr, key) {
      arr.sort(function(a, b) {
        return b[key] > a[key] ? 1 : -1;
      })
    },
    format(value) {
      if (!value) {
        return;
      }
      return formatDate(new Date(value));
    },
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
    beforeDel: function(index) {
      this.delIndex = index;
      this.showdel = true;
    },
    delList: function() {
      this.$http.delete('/employee/employees/'+this.employeeId+'/Training/'+this.trainingList[this.delIndex].trainingId).then(function(){
        this.trainingList.splice(this.delIndex, 1);
        Message({type:'success',message:this.$t('common.deleteSuccess')});
      })
    },
    submitForm() {
      var data = {};
      var index = -1;
      var passed = true;
      passed = this.training.$schema.isFormValidate(this.$refs.trainingform);
      if (!passed) {
        return;
      }
      index = this.index;
      data = {
        employeeId: this.employeeId,
        trainingName: this.training.trainingName,
        courses: this.training.courses,
        startDate: formatDate(new Date(this.training.startDate)),
        endDate: formatDate(new Date(this.training.endDate)),
        certificate: this.training.certificate,
        trainingType: this.training.trainingType
      };

      this.training.startDate = formatDate(new Date(this.training.startDate));
      this.training.endDate = formatDate(new Date(this.training.endDate));
      if (index === -1) {
        this.$http.post('/employee/employees/'+this.employeeId+'/Training',data,{
            emulateJSON: true
        }).then(function(res){
          this.arrSort(this.trainingList, 'startDate');
          this.isEdit = false;
          data.trainingId = res.body;
          this.trainingList.push(data);
          Message({type:'success',message:this.$t('common.saveSuccess')});
        });
      } else {
        data.trainingId = this.trainingList[index].trainingId;
        this.$http.put('/employee/employees/'+this.employeeId+'/Training/'+data.trainingId,data,{
            emulateJSON: true
        }).then(function(){
          this.arrSort(this.trainingList, 'startDate');
          this.isEdit = false;
          Object.assign(this.trainingList[index], this.training);
          document.getElementsByClassName('training-list')[index].style.display = 'block';
          Message({type:'success',message:this.$t('common.saveSuccess')});
        });
      }
    }
  },
  components: {}
};
</script>

<style lang="css">
</style>
