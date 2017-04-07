<template lang="html">
<div>
  <ui-confirm ref="showdel" :title="$t('button.delete')" @confirm="delList" :show="showdel" close-on-confirm autofocus="confirm-button">
      {{$t('common.deleteConfirm')}}
  </ui-confirm>
  <div class="edit-tab">
    <div class="tab-header">
      <span>{{$t('staff.academicBackground')}}</span>
      <i v-show="!isEdit" class="fa fa-plus-square-o" aria-hidden="true" @click="add"></i>
    </div>
    <div class="edu-tab tab-content">
      <div class="edu-list fix" v-for="(item, index) in data">
        <ul class="fix">
          <li><span>{{$t('staff.almaMater')}}</span>{{item.institution}}</li>
          <li><span>{{$t('staff.major')}}</span>{{item.major}}</li>
          <li><span>{{$t('staff.admissionDate')}}</span>{{item.admissionDate}}</li>
          <li><span>{{$t('staff.graduationDate')}}</span>{{item.graduationDate}}</li>
          <li><span>{{$t('staff.academicDegree')}}</span>{{fixDist(item.educationLevel, 'degree')}}</li>
          <li><span>{{$t('staff.certificateNumber')}}</span>{{item.certificateNumber}}</li>
          <li><span>{{$t('staff.studyMode')}}</span>{{fixDist(item.learnType, 'learnType')}}</li>
          <li><span>{{$t('staff.highestLevelCertificate')}}</span>{{fixDist(item.isTopGrade, 'whetherType')}}</li>
          <li><span>{{$t('staff.graduationGrade')}}</span>{{fixDist(item.grade, 'grade')}}</li>
        </ul>
        <span class="list-operate edu-operate"><i class="fa fa-pencil-square-o" aria-hidden="true" @click="edit(index)"></i><i class="fa fa-trash-o" aria-hidden="true" @click="beforeDel(index)"></i></span>
      </div>
      <div class="edit-form edit-bg" v-show="isEdit">
        <v-form ref="eduform" :model="edu" :schema="academicSchema" label-width="220" label-suffix="" :cols="4" form-style="update-interns-form">
            <text-field property="institution" editor-width="220"></text-field>
            <text-field property="major" editor-width="220"></text-field>
            <text-field property="admissionDate" :max-date="edu.graduationDate" editor-width="220"></text-field>
            <text-field property="graduationDate" :min-date="edu.admissionDate" editor-width="220"></text-field>
            <select-field property="educationLevel" :mapping="dist.degree" editor-width="220"></select-field>
            <text-field property="certificateNumber" editor-width="220"></text-field>
            <select-field property="learnType" :mapping="dist.learnType" editor-width="220"></select-field>
            <select-field property="isTopGrade" :mapping="dist.whetherType" editor-width="220"></select-field>
            <select-field property="grade" :mapping="dist.grade" editor-width="220"></select-field>
        </v-form>
        <div class="save-info-group">
            <ui-button color="primary mr10" @click="submitForm">{{$t('button.save')}}</ui-button>
            <ui-button class="btn-default-bd" @click="cancel" type="flat">{{$t('button.cancel')}}</ui-button>
        </div>
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
export default {
  props: {
    dist: {},
    parentId: {}
  },
  data() {
    var academicData = {
        institution: {
            label: this.$t('staff.almaMater'),
            required: true
        },
        major: {
            label: this.$t('staff.major'),
            required: true
        },
        admissionDate: {
            type: 'date',
            label: this.$t('staff.admissionDate'),
            required: true
        },
        graduationDate: {
            type: 'date',
            label: this.$t('staff.graduationDate'),
            required: true
        },
        educationLevel: {
            label: this.$t('staff.academicDegree')
        },
        certificateNumber: {
            label: this.$t('staff.certificateNumber')
        },
        learnType: {
            label: this.$t('staff.studyMode')
        },
        isTopGrade: {
            label: this.$t('staff.highestLevelCertificate'),
            default: '2'
        },
        grade: {
            label: this.$t('staff.graduationGrade')
        }
    };
    return {
      data: [],
      academicSchema: new Schema(academicData),
      delIndex: 0,
      showdel: false,
      higEduIndex: 0,
      isEdit: false,
      edu: {},
      index: -1
    };
  },
  computed: {
  },
  created() {
  },
  mounted() {
    this.edu = this.academicSchema.newModel();
    var employeeId = this.$route.params.employeeId;
    if (employeeId) {
      this.$http.get('/employee/employees/' + employeeId + '/Education?pageSize=9999&pageIndex=1').then(function(res) {
          var data = res.data.data;
          for(var i = 0, len = data.length; i < len; i++) {
            data[i].graduationDate = formatDate(new Date(data[i].graduationDate));
            data[i].admissionDate = formatDate(new Date(data[i].admissionDate));
          }
          this.arrSort(data, 'admissionDate');
          this.data = data;
      });
    } else {
      this.isEdit = true;
    }

  },

  methods: {
    arrSort(arr, key) {
      arr.sort(function(a, b) {
        return b[key] > a[key] ? 1 : -1;
      })
    },
    add() {
      this.isEdit = true;
      this.index = -1;
      this.edu.reset();
      var el = this.$refs.eduform.$el.parentNode;
      var list = document.getElementsByClassName('edu-tab')[0];
      var node = list.getElementsByClassName('edu-list')[0];
      if (node) {
        list.insertBefore(el, node);
      }
    },
    edit(index) {
      this.isEdit = true;
      this.edu.reset();
      Object.assign(this.edu, this.data[index]);
      var el = this.$refs.eduform.$el.parentNode;
      var list = document.getElementsByClassName('edu-tab')[0];
      var node = list.getElementsByClassName('edu-list')[index];
      list.insertBefore(el, node);
      node.style.display = 'none';
      this.index = index;
    },
    cancel() {
      this.isEdit = false;
      if (this.index !== -1) {
        document.getElementsByClassName('edu-list')[this.index].style.display = 'block';
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
    submitForm() {
      var data = {};
      var index = -1;
      var passed = true;
      passed = this.$refs.eduform.isFormValidate();
      if (!passed) {
        return;
      }
      index = this.index;
      data = {
        institution: this.edu.institution,
        major: this.edu.major,
        admissionDate: formatDate(new Date(this.edu.admissionDate)),
        graduationDate: formatDate(new Date(this.edu.graduationDate)),
        educationLevel: this.edu.educationLevel,
        certificateNumber: this.edu.certificateNumber,
        learnType: this.edu.learnType,
        isTopGrade: this.edu.isTopGrade,
        grade: this.edu.grade
      };
      var eduList = this.data;
      for (var i = 0, len = eduList.length; i < len; i++) {
        if (this.edu.isTopGrade === '1') {
          eduList[i].isTopGrade = '2';
        }
      }
      if (index === -1) {
        this.data.push(data);
      } else {
        Object.assign(this.data[index], data);
        document.getElementsByClassName('edu-list')[index].style.display = 'block';
      }
      if (this.data.length === 1) {
        this.data[0].isTopGrade = '1';
      }
      this.isEdit = false;
    },
    addList: function() {
      var passed = true;
      var data = this.data;
      for (var i = 0, len = data.length; i < len; i++) {
        passed = this.$children[i + 1].isFormValidate();
        if (!passed) {
            break;
        }
      }
      if (!passed) {
        return;
      }
      this.data.push(this.academicSchema.newModel());
    },
    beforeDel: function(index) {
      this.delIndex = index;
      this.$refs.showdel.open()
      this.showdel = true;
    },
    delList: function() {
      this.data.splice(this.delIndex, 1);
    },
    setHigEduIndex(index) {
      this.higEduIndex = index;
    },
    // 多个单选组有一个选最高时，其它自动变化
    setHigEduLev: function(value) {
        var academicList = this.data;
        if (value === '1') {
            for (var i = 0, len = academicList.length; i < len; i++) {
                academicList[i].isTopGrade = '2';
            }
            academicList[this.higEduIndex].isTopGrade = '1';
        }
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
