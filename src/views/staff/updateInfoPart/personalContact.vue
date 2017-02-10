<template lang="html">
  <ui-confirm header="Save" @confirmed="save" :show.sync="showSave" close-on-confirm autofocus="confirm-button">
      Do you want to save this?
  </ui-confirm>
  <div class="edit-tab">
    <div class="tab-content">
      <i v-show="!isEdit" class="edit-btn fa fa-pencil-square-o" aria-hidden="true" @click="edit"></i>
      <ul class="fix" v-show="!isEdit">
        <li><span>Home Address</span>{{ data.homeAddress }}</li>
        <li><span>City or Town</span>{{ data.homeCityTown }}</li>
        <li><span>State</span>{{ fixDist(data.homeState, homeStateMapping) }}</li>
        <li><span>Country</span>{{ fixDist(data.homeCountry, 'area') }}</li>
        <li><span>ZIP Code(Personal)</span>{{ data.homeZipcode }}</li>
        <li><span>Phone(Personal)</span>{{ data.personalPhone }}</li>
        <li><span>Mobile(Personal)</span>{{ data.personalMobile }}</li>
        <li><span>Email(Personal)</span>{{ data.personalEmail }}</li>
        <li><span>Work Address</span>{{ data.workAddress }}</li>
        <li><span>City or Town</span>{{ data.workCityTown }}</li>
        <li><span>State</span>{{ fixDist(data.workState, workStateMapping) }}</li>
        <li><span>Country</span>{{ fixDist(data.workCountry, 'area') }}</li>
        <li><span>ZIP Code(Work)</span>{{ data.workZipcode }}</li>
        <li><span>Phone(Work)</span>{{ data.workPhone }}</li>
        <li><span>Mobile(Work)</span>{{ data.workMobile }}</li>
        <li><span>Email(Work)</span>{{ data.workEmail }}</li>
        <li><span>Skype</span>{{ data.skype }}</li>
        <li><span>Facebook</span>{{ data.facebook }}</li>
        <li><span>Google</span>{{ data.google }}</li>
        <li><span>Linkedin</span>{{ data.linkedin }}</li>
        <li><span>Twitter</span>{{ data.twitter }}</li>
      </ul>
      <div class="edit-form" v-show="isEdit">
        <v-form v-ref:form :model="data" :schema="perContactSchema" label-width="250" label-suffix="" :cols="4" form-style="update-interns-form">
            <text-field property="homeAddress" editor-width="250"></text-field>
            <text-field property="homeCityTown" editor-width="250"></text-field>
            <select-field property="homeState" :mapping="homeStateMapping" editor-width="250"></select-field>
            <select-field property="homeCountry" :mapping="dist.area" editor-width="250"></select-field>
            <text-field property="homeZipcode" editor-width="250"></text-field>
            <text-field property="personalPhone" type="number" editor-width="250"></text-field>
            <text-field property="personalMobile" type="number" editor-width="250"></text-field>
            <text-field property="personalEmail" editor-width="250"></text-field>
            <text-field property="workAddress" editor-width="250"></text-field>
            <text-field property="workCityTown" editor-width="250"></text-field>
            <select-field property="workState" :mapping="workStateMapping" editor-width="250"></select-field>
            <select-field property="workCountry" :mapping="dist.area" editor-width="250"></select-field>
            <text-field property="workZipcode" editor-width="250"></text-field>
            <text-field property="workPhone" type="number" editor-width="250"></text-field>
            <text-field property="workMobile" type="number" editor-width="250"></text-field>
            <text-field property="workEmail" editor-width="250"></text-field>
            <text-field property="skype" editor-width="250"></text-field>
            <text-field property="facebook" editor-width="250"></text-field>
            <text-field property="google" editor-width="250"></text-field>
            <text-field property="linkedin" editor-width="250"></text-field>
            <text-field property="twitter" editor-width="250"></text-field>
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
    getDictMapping,convert
} from '../../../util/assist';
import {default as Message} from '../../../components/basic/message';
export default {
  props: [
    {
      name: 'data'
    },
    {
      name: 'dist',
      type: Object
    },
    {
      name: 'employeeId',
      required: true
    },
    {
      name: 'parentId'
    }
  ],
  data() {
    let perContactData = {
        homeAddress: {
            label: 'Home Address',
            required: true,
            whitespace: false
        },
        homeCityTown: {
            label: 'City or Town'
        },
        homeState: {
            label: 'State'
        },
        homeCountry: {
            label: 'Country'
        },
        homeZipcode: {
            label: 'ZIP Code(Personal)',
            required: true
        },
        personalPhone: {
            label: 'Phone(Personal)'
        },
        personalMobile: {
            label: 'Mobile(Personal)'
        },
        personalEmail: {
            label: 'Email(Personal)',
            rules: {
              type: 'email',
              email: true,
              message: this.$t('staff.message.typeError')
            }
        },
        workAddress: {
            label: 'Work Address',
            required: true
        },
        workCityTown: {
            label: 'City or Town'
        },
        workState: {
            label: 'State'
        },
        workCountry: {
            label: 'Country'
        },
        workZipcode: {
            label: 'ZIP Code(Work)',
            required: true
        },
        workPhone: {
            label: 'Phone(Work)'
        },
        workMobile: {
            label: 'Mobile(Work)'
        },
        workEmail: {
            label: 'Email(Work)',
            rules: {
              type: 'email',
              email: true,
              message: this.$t('staff.message.typeError')
            }
        },
        skype: {
            label: 'Skype'
        },
        facebook: {
            label: 'Facebook'
        },
        google: {
            label: 'Google'
        },
        linkedin: {
            label: 'Linkedin'
        },
        twitter: {
            label: 'Twitter'
        }
    };
    return {
      perContactData: perContactData,
      perContactSchema: new Schema(perContactData),
      showSave: false,
      workStateMapping: {},
      homeStateMapping: {},
      isEdit: false,
      temp: {}
    };
  },
  computed: {},
  ready() {
    this.data = this.perContactSchema.newModel();
    this.$watch('data.homeCountry',function(val, oldVal) {
        if (val === '' || val === undefined || val === null) {
            return;
        }
        this.$http.get(`/org/area/${val}/child`).then((response) => {
            if (response.data) {
                let result = {},
                    datas = response.data;
                for (var i = 0, l = datas.length; i < l; i++) {
                    result[datas[i].areaName] = datas[i].areaId;
                }
                this.homeStateMapping = result;
            }
        });
    });
    this.$watch('data.workCountry',function(val, oldVal) {
        if (val === '' || val === undefined || val === null) {
            return;
        }
        this.$http.get(`/org/area/${val}/child`).then((response) => {
            if (response.data) {
                let result = {},
                    datas = response.data;
                for (var i = 0, l = datas.length; i < l; i++) {
                    result[datas[i].areaName] = datas[i].areaId;
                }
                this.workStateMapping = result;
            }
        });
    });
  },
  attached() {},
  methods: {
    edit() {
      Object.assign(this.temp, this.data);
      this.isEdit = true;
      this.$dispatch('ui-collapsible::refresh-height', this.parentId);
    },
    cancel() {
      Object.assign(this.data, this.temp);
      this.isEdit = false;
      this.$dispatch('ui-collapsible::refresh-height', this.parentId);
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
    // 获得要提交的数据字段，删除不需要的
    repalceData(obj, newObj) {
      var data = {};
      for (let key of Object.keys(obj)) {
        if (newObj.hasOwnProperty(key) && newObj[key] !== undefined) {
          data[key] = newObj[key];
        }
      }
      return data;
    },
    saveComfirmed() {
      var passed = this.data.$schema.isFormValidate(this.$refs.form);
      if (!passed) {
        return;
      }
      this.save();
      // this.showSave = true;
    },
    save() {
      var contactsId = this.data.contactsId;
      var data = this.repalceData(this.perContactData, this.data);

      if (!contactsId) {
        convert({}, data, "", true);
        this.$http.post('/employee/employees/' + this.employeeId + '/Contacts', data, {
            emulateJSON: true
        }).then(function(res) {
          this.data.contactsId = res.body;
          this.isEdit = false;
          Message({type:'success',message:this.$t('common.saveSuccess')});
        });
      } else {
        data.contactsId = contactsId;
        convert({}, data, "", true);
        this.$http.put('/employee/employees/' + this.employeeId + '/Contacts/' + contactsId, data, {
            emulateJSON: true
        }).then(function(res) {
          this.isEdit = false;
          Message({type:'success',message:this.$t('common.saveSuccess')});
        });
      }
    }
  },
  components: {}
};
</script>

<style lang="css">
.contact-save-btn {
  font-size: 20px;
  text-align: right;
  cursor: pointer;
}
</style>
