<template lang="html">
  <ui-confirm header="Save" @confirmed="save" :show.sync="showSave" close-on-confirm autofocus="confirm-button">
      Do you want to save this?
  </ui-confirm>
  <div class="edit-tab">
    <div class="tab-content bank-tab">
      <i v-show="!isEdit" class="edit-btn fa fa-pencil-square-o" aria-hidden="true" @click="edit"></i>
      <ul class="fix" v-show="!isEdit">
        <li><span>Branch Name of Bank</span>{{ data.brakName }}</li>
        <li><span>Bank Holder</span>{{ data.bankHolder }}</li>
        <li><span>Bank Account Number</span>{{ data.bankNumber }}</li>
        <li><span>Bank Holder</span>{{ data.medicareNumber }}</li>
        <li><span>Branch Name of Bank</span>{{ data.taxableNumber }}</li>
      </ul>
      <div class="edit-form" v-show="isEdit">
        <v-form v-ref:form :model="data" :schema="bankSchema" label-width="200" label-suffix="" :cols="5" form-style="update-interns-form">
            <text-field property="brakName" editor-width="200"></text-field>
            <text-field property="bankHolder" editor-width="200"></text-field>
            <text-field property="bankNumber" editor-width="200"></text-field>
            <text-field property="medicareNumber" editor-width="200"></text-field>
            <text-field property="taxableNumber" editor-width="200"></text-field>
        </v-form>
        <div class="save-info-group">
            <ui-button color="primary mr10" @click="saveComfirmed">Submit</ui-button>
            <ui-button class="btn-default-bd" @click="cancel" type="flat">Cancel</ui-button>
        </div>
      </div>
    </div>
  </div>
  <!-- <v-form v-ref:form :model="data" :schema="bankSchema" label-width="200" label-suffix="" :cols="5" form-style="update-interns-form">
      <text-field property="brakName" editor-width="200"></text-field>
      <text-field property="bankHolder" editor-width="200"></text-field>
      <text-field property="bankNumber" editor-width="200"></text-field>
      <text-field property="medicareNumber" editor-width="200"></text-field>
      <text-field property="taxableNumber" editor-width="200"></text-field>
  </v-form>
  <div class="contract-save-btn">
    <i class="fa fa-floppy-o" aria-hidden="true" @click="saveComfirmed"></i>
  </div> -->
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
    }
  ],
  data() {
    let bankData = {
        brakName: {
            label: 'Branch Name of Bank',
            required: true
        },
        bankHolder: {
            label: 'Bank Holder',
            required: true
        },
        bankNumber: {
            label: 'Bank Account Number',
            type: 'number',
            required: true
        },
        medicareNumber: {
            label: 'Medical Insurance Number',
            type: 'number',
            required: true
        },
        taxableNumber: {
            label: 'Taxable Number',
            type: 'number',
            required: true
        }
    };
    return {
      bankSchema: new Schema(bankData),
      showSave: false,
      isEdit: false,
      temp: {}
    };
  },
  computed: {},
  ready() {
    this.employeeId = this.employeeId || this.$route.params.employeeId;
    this.data = this.bankSchema.newModel();
    if (this.employeeId) {
      this.$http.get('/employee/employeeBankTax/bankTax/' + this.employeeId).then(function(res) {
        this.data = Object.assign(this.data, res.data);
      });
    }
  },
  attached() {},
  methods: {
    edit() {
      Object.assign(this.temp, this.data);
      this.isEdit = true;
    },
    saveComfirmed() {
      var passed = this.data.$schema.isFormValidate(this.$refs.form);
      if (!passed) {
        return;
      }
      this.save();
      // this.showSave = true;
    },
    cancel() {
      Object.assign(this.data, this.temp);
      this.isEdit = false;
    },
    save() {
        var bankTaxId = this.data.bankTaxId;
        var data = {
          employeeId: this.employeeId,
          brakName: this.data.brakName,
          bankHolder: this.data.bankHolder,
          bankNumber: this.data.bankNumber,
          medicareNumber: this.data.medicareNumber,
          taxableNumber: this.data.taxableNumber
        }
    		if (bankTaxId) {
    			//WXY更新
          data.bankTaxId = bankTaxId;
    			this.$http.put('/employee/employeeBankTax/' + bankTaxId, data, {
              emulateJSON: true
          }).then(function(res) {
    				//this.data.contractId = res.body;
            this.isEdit = false;
    				Message({type:'success',message:this.$t('common.saveSuccess')});
    			});
    		} else {
    			//WXY新增
    			this.$http.post('/employee/employeeBankTax/', data, {
              emulateJSON: true
          }).then(function(res) {
            this.isEdit = false;
    				this.data.bankTaxId = res.body;
    				Message({type:'success',message:this.$t('common.saveSuccess')});
    			});
    		}
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
