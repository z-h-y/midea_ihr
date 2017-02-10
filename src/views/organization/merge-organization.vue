<style lang="css">



</style>

<template lang="html">

<panel :title="panelTitle" class="panel-b content-wrap mb-suitable" header="panel-header">
    <v-form v-ref:mergeform :model="mergeOrg" :schema="mergeOrgSchema" label-width="200" label-suffix="" :cols="1" form-style="org-form">
			 <text-increment property="unitShortName" editor-width="400"></text-increment>
			 <text-increment property="abbreviation" editor-width="400"></text-increment>
			 <text-increment property="unitCode" editor-width="400"></text-increment>
			 <text-field property="mergeInto" type="selector" :readonly="true" :show.sync="show" editor-width="400"></text-field>
			 <text-increment property="mergedOrgCode" editor-width="400"></text-increment>
			 <text-field property="beginDate" :min-date="minDate" editor-width="400"></text-field>
			 <upload-field property="attachmentId" upload-class="up-class" editor-height="150" url="http://wwww.baidu.com/upload/"></upload-field>
    </v-form>
</panel>

<organization-selector :show.sync="show" :disable-value="disableValue"></organization-selector>

<div class="btn-group">
    <ui-button color="primary mr10" @click="handleSubmit" :loading="submitLoading">Submit</ui-button>
    <ui-button class="btn-default-bd" @click="handleCancel" type="flat">Cancel</ui-button>
</div>

</template>

<script type="text/ecmascript-6">

import {
    default as Message
}
from '../../components/basic/message';
import {
    default as Schema
}
from '../../schema/index';

import {formatDate} from '../../util/assist';


let mergeOrgSchema = new Schema({
    unitShortName: {
        label: 'Organization Name',
    },
    abbreviation: {
        label: 'Abbreviation'
    },
    unitCode: {
        label: 'Organization ID'
    },
    mergeInto: {
        label: 'Merge into',
				required:true
    },
    mergedOrgCode: {
        label: 'Merged Organization ID'
    },
    beginDate: {
        label: 'Effective Date',
				type: 'date',
        required: true
    },
    attachmentId: {
        label: 'Approved Org Change Files'
    },
});


export default {
    data() {
            return {
                mergeOrgSchema: mergeOrgSchema,
                mergeOrg: mergeOrgSchema.newModel(),
                show: {
                    modal: false
                },
                minDate: '',
                submitLoading: false
            };
        },
        computed: {
          disableValue() {
            var id = this.$route.params.oid ? [this.$route.params.oid] : [];
            return id;
          },
            routeName() {
                    return this.$route.name;
                },
                panelTitle() {
                    if (this.routeName === 'merge_organization') return 'Merge Organization';
                }
        },
        created() {
            this.fetchData();
        },
        watch: {
            '$route': 'fetchData'
        },
        methods: {
                fetchData(){
                  let mergeOrgModel = this.mergeOrg,
                  data = null;
                   this.$http.get(`/org/orgs/${this.$route.params.oid}/orgdetails`).then((response) => {
                          data = response.data;
                          if(data){
                           if(data.countryScope) data.countryScope = data.countryScope.split(',');
                           if(data.beginDate) this.minDate = formatDate(new Date(data.beginDate));
                           data.beginDate = '';
                           Object.assign(mergeOrgModel,data);
                          }
                   });
                },
                handleSubmit() {
                    let mergeOrgModel = this.mergeOrg,
                        passed = mergeOrgModel.$schema.isFormValidate(this.$refs.mergeform);

                    if (passed) {
                        this.submitLoading = true;
                        this.$http.post(`/org/orgs/${this.$route.params.oid}/merge`, {
                            unitId:this.$route.params.oid,
                            toUnitId:mergeOrgModel.mergedOrgId,
                            effectiveDate:formatDate(new Date(mergeOrgModel.beginDate))
                        }, {
                            emulateJSON: true
                        }).then((response) => {
                            if (response.data) {
                               Message({type:'success',message:this.$t('organization.message.mergeOrgSucceed')});
                               var orgId = this.$route.params.oid;
                               var treeData = this.$root.$data.orgSettingTreeCache;
                               var walk = function(data) {
                                 if (data && data.length > 0) {
                                   data.forEach(function(child, key) {
                                     if (orgId === String(child['orgId'])) {
                                         data.splice(key, 1);
                                     } else {
                                       var children = child['children'];
                                       walk(children);
                                     }
                                   });
                                 }
                               };
                               walk(treeData);
                               this.$route.router.go({
                                 name: 'organizationSetting'
                               });
                            }
                        },(response) => {
                            this.submitLoading = false;
                        });
                    }
                },
                handleCancel() {
                    this.$router.go({
                        name: 'organizationSetting',
                        query: {orgId: this.$route.params.oid}
                    });
                }
        },
        events:{
          'organization-selector:selected':function(node){
            this.mergeOrg.mergeInto = node.orgShortName;
            this.mergeOrg.mergedOrgId = node.orgId;
            this.mergeOrg.mergedOrgCode = node.orgCode;
            this.$http.get(`/org/orgs/${node.orgId}/orgdetails`).then((response) => {
              if (response.data.beginDate) {
                var date = formatDate(new Date(response.data.beginDate));
                if (this.minDate < date) {
                  this.minDate = date;
                  this.mergeOrg.beginDate = '';
                }
              }
            });
          }
        },
        components: {
          Panel: require('../../components/basic/panel.vue')
        }


};

</script>
