<template lang="html">
<div>
  <v-form :model="data" :schema="internsPerSchema" label-width="250" label-suffix="" :cols="3" form-style="update-interns-per update-interns-form">
      <text-field property='givenName' editor-width="250"></text-field>
      <text-field property='middleName' editor-width="250"></text-field>
      <text-field property='familyName' editor-width="250"></text-field>
      <text-field property='preferredName' editor-width="250"></text-field>
      <select-field property="gender" :mapping="dist.gender" editor-width="250"></select-field>
      <select-field property="bloodType" :mapping="dist.bloodType" editor-width="250"></select-field>
      <select-field property="areaCitizenship" :mapping="dist.area" editor-width="250"></select-field>
      <text-field property="birthDate" editor-width="250" :max-date="curDate"></text-field>
      <text-field property="placeBirthName" type="selector" @open-selector="openSelector" :readonly="true" :show="placeBirth" editor-width="250"></text-field>
      <select-field property="maritalStatus" :mapping="dist.maritalStatus" editor-width="250"></select-field>
      <text-field property="idRegisteredAddress" editor-width="250" v-if="!isOutsource"></text-field>
      <select-field property="englishLevel" :mapping="dist.englishLevel" editor-width="250" v-if="!isOutsource"></select-field>
      <select-field property="employeeSource" :mapping="dist.employeeSource" editor-width="250" v-if="isEmployee"></select-field>
      <select-field property="isOvertimeValid" :mapping="dist.overtimeValid" editor-width="250"></select-field>
      <text-field property='emergencyContact' editor-width="250" v-if="!isOutsource"></text-field>
      <text-field property='emergencyContactPhone' type="number" editor-width="250" v-if="!isOutsource"></text-field>
      <text-field property='startWorkDate' editor-width="250"></text-field>
  </v-form>
  <!-- <nation-selector :handle-comfirmed="selectnation" :show="nation"></nation-selector> -->
  <tree-data-selector ref="placeselect" url="/org/area/${}/child" :head-text="$t('selectors.selectPlace')" label-id="areaId" label-name="areaName" :handle-comfirmed="selectPlaceBirth" :show="placeBirth"></tree-data-selector>
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
    dist: {}
  },
  data() {
    var isEmployee = this.$route.meta.extra === '/ihr/staff/employees/regularEmployees';
    var isInterns = this.$route.meta.extra === '/ihr/staff/interns';
    var isOutsource = this.$route.meta.extra === '/ihr/staff/outsource';
    var internsPerData = {
        givenName: {
            label: this.$t('staff.givenName'),
            required: true
        },
        middleName: {
            label: this.$t('staff.middleName')
        },
        familyName: {
            label: this.$t('staff.familyName'),
            required: true
        },
        preferredName: {
            label: this.$t('staff.preferredName')
        },
        gender: {
            label: this.$t('staff.gender'),
            required: true
        },
        bloodType: {
            label: this.$t('staff.bloodType')
        },
        areaCitizenship: {
            label: this.$t('staff.citizenship'),
			      required: true
        },
        birthDate: {
            label: this.$t('staff.dateofBirth'),
            required: true,
            type: 'date'
        },
        placeBirthName: {
            label: this.$t('staff.placeofBirth')
        },
        nationalityName: {
            label: 'Nation'
        },
        maritalStatus: {
            label: this.$t('staff.maritalStatus'),
            required: true
        },
        // religion: {
        //     label: 'Religion',
        //     mapping: function() {
        //         return getDictMapping('RELIGION');
        //     }
        // },
        idRegisteredAddress: {
            label: this.$t('staff.IDRegisteredAddress')
        },
        englishLevel: {
            label: this.$t('staff.englishLevel'),
            required: true
        },
        employeeSource: {
            label: this.$t('staff.recruitedFrom')
        },
        isOvertimeValid: {
            label: this.$t('staff.overtimeClassification')
        },
        emergencyContact: {
            label: this.$t('staff.emergencyContactName')
        },
        emergencyContactPhone: {
            label: this.$t('staff.emergencyContactPhone'),
            required: true
        },
        startWorkDate: {
            label: this.$t('staff.dateofStartingwork'),
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
      data: {},
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
  mounted() {
    this.data = this.internsPerSchema.newModel();
  },

  methods: {
    openSelector() {
      this.$refs['placeselect'].open();
    },
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
