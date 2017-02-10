<template lang="html">
  <v-form :model="data" :schema="internsPerSchema" label-width="250" label-suffix="" :cols="3" form-style="update-interns-per update-interns-form">
      <text-field property='givenName' editor-width="250"></text-field>
      <text-field property='middleName' editor-width="250"></text-field>
      <text-field property='familyName' editor-width="250"></text-field>
      <text-field property='preferredName' editor-width="250"></text-field>
      <select-field property="gender" :mapping="dist.gender" editor-width="250"></select-field>
      <select-field property="bloodType" :mapping="dist.bloodType" editor-width="250"></select-field>
      <select-field property="areaCitizenship" :mapping="dist.area" editor-width="250"></select-field>
      <text-field property="birthDate" editor-width="250" :max-date="curDate"></text-field>
      <text-field property="placeBirthName" type="selector" :readonly="true" :show.sync="placeBirth" editor-width="250"></text-field>
      <!-- <text-field property="nationalityName" type="selector" :readonly="true" :show.sync="nation" editor-width="250"></text-field> -->
      <select-field property="maritalStatus" :mapping="dist.maritalStatus" editor-width="250"></select-field>
      <!-- <select-field property="religion" editor-width="250"></select-field> -->
      <text-field property="idRegisteredAddress" editor-width="250" v-if="!isOutsource"></text-field>
      <select-field property="englishLevel" :mapping="dist.englishLevel" editor-width="250" v-if="!isOutsource"></select-field>
      <select-field property="employeeSource" :mapping="dist.employeeSource" editor-width="250" v-if="isEmployee"></select-field>
      <select-field property="isOvertimeValid" :mapping="dist.overtimeValid" editor-width="250"></select-field>
      <text-field property='emergencyContact' editor-width="250" v-if="!isOutsource"></text-field>
      <text-field property='emergencyContactPhone' type="number" editor-width="250" v-if="!isOutsource"></text-field>
      <text-field property='startWorkDate' editor-width="250"></text-field>
  </v-form>
  <!-- <nation-selector :handle-comfirmed="selectnation" :show.sync="nation"></nation-selector> -->
  <tree-data-selector url="/org/area/${}/child" head-text="Place Selector" label-id="areaId" label-name="areaName" :handle-comfirmed="selectPlaceBirth" :show.sync="placeBirth"></tree-data-selector>
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
  props: [
    {
      name: 'data'
    },
    {
      name: 'dist',
      type: Object
    }
  ],
  data() {
    var isEmployee = this.$route.extra === '/ihr/staff/employees/regularEmployees';
    var isInterns = this.$route.extra === '/ihr/staff/interns';
    var isOutsource = this.$route.extra === '/ihr/staff/outsource';
    var internsPerData = {
        givenName: {
            label: 'Given Name',
            required: true
        },
        middleName: {
            label: 'Middle Name'
        },
        familyName: {
            label: 'Family Name',
            required: true
        },
        preferredName: {
            label: 'Preferred Name'
        },
        gender: {
            label: 'Gender',
            required: true
        },
        bloodType: {
            label: 'Blood Type'
        },
        areaCitizenship: {
            label: 'Citizenship',
			      required: true
        },
        birthDate: {
            label: 'Date of Birth',
            required: true,
            type: 'date'
        },
        placeBirthName: {
            label: 'Place of Birth'
        },
        nationalityName: {
            label: 'Nation'
        },
        maritalStatus: {
            label: 'Marital Status',
            required: true
        },
        // religion: {
        //     label: 'Religion',
        //     mapping: function() {
        //         return getDictMapping('RELIGION');
        //     }
        // },
        idRegisteredAddress: {
            label: 'ID Registered Address'
        },
        englishLevel: {
            label: 'English Level',
            required: true
        },
        employeeSource: {
            label: 'Recruited From'
        },
        isOvertimeValid: {
            label: 'Overtime Classification'
        },
        emergencyContact: {
            label: 'Emergency Contact Name'
        },
        emergencyContactPhone: {
            label: 'Emergency Contact Phone',
            required: true
        },
        startWorkDate: {
            label: 'Date of Starting work',
            type: 'date'
        }
    };
    if (!isEmployee) {
      delete internsPerData.employeeSource;
    }
    if (isOutsource) {
      delete internsPerData.idRegisteredAddress;
      delete internsPerData.englishLevel;
      delete internsPerData.emergencyContact;
      delete internsPerData.emergencyContactPhone;
      delete internsPerData.secondaryPhone;
    }
    return {
      isEmployee: isEmployee,
      isInterns: isInterns,
      isOutsource: isOutsource,
      internsPerData: internsPerData,
      internsPerSchema: new Schema(internsPerData),
      nation: {
        modal: false
      },
      placeBirth: {
        modal: false
      }
    };
  },
  computed: {
    // 当前的时间
    curDate() {
      return formatDate(new Date());
    }
  },
  ready() {
    this.data = this.internsPerSchema.newModel();
  },
  attached() {},
  methods: {
    selectnation(node, el) {
      if (node.nationalityName) {
        this.data.nation = node.nationalityId;
        this.data.nationalityName = node.nationalityName;
        while (el.level && el.level !== 0) {
          el = el.$parent;
          this.data.nationalityName = el.label + ',' + this.data.nationalityName;
        }
      }
    },
    selectPlaceBirth(node, el) {
      if (node.areaName) {
        this.data.placeBirth = node.areaId;
        this.data.placeBirthName = node.areaName;
        while (el.level && el.level !== 0) {
          el = el.$parent;
          this.data.placeBirthName = el.label + ',' + this.data.placeBirthName;
        }
      }
    }
  },
  components: {}
};
</script>

<style lang="css">
</style>
