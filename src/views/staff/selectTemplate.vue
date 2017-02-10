<!-- 选择人员模板的弹出框 -->
<template lang="html">
  <ui-confirm header="Select Information Template" @confirmed="confirmed" :show.sync="showConfirm" autofocus="none">
      <v-form v-ref:form :model="template" :schema="templateSchema" label-width="230" label-suffix="" :cols="1" form-style="template-form">
          <select-field property="templateArea" :mapping="templateList" editor-width="220"></select-field>
      </v-form>
  </ui-confirm>
</template>

<script>
import {
    default as Schema
}
from '../../schema/index';

export default {
  props: [
    {
      name: 'showConfirm',
      type: Boolean,
      default: false
    },
    {
      name: 'templateConfirmed',
      type: Function,
      required: true
    }
  ],
  data() {
    var self = this;
    var routeName = this.$route.name;
    var employementCategory;
    switch (routeName) {
      case 'interns':
        employementCategory = 7;
        break;
      case 'outsource':
        employementCategory = 6;
        break;
      case 'regularEmployees':
        employementCategory = 9;
        break;
    }
    let templateSchema = new Schema({
      templateArea: {
        label:'Select Information Template',
        required: true
      }
    });
    return {
      templateSchema:templateSchema,
      template:templateSchema.newModel(),
      templateList: {},
      employementCategory: employementCategory
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
  ready() {},
  attached() {},
  methods: {
    confirmed() {
      var passed = this.template.$schema.isFormValidate(this.$refs.form);
      if (passed) {
        this.templateConfirmed(this.template.templateArea);
      }
    }
  },
  components: {}
};
</script>

<style lang="css">
.template-form {
  margin: 50px 0;
}
</style>
