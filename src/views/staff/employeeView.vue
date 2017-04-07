<style lang="less">
.ihr-staff-edit {
  border: 1px solid #ecedee;
  .staff-border-top {
    border-top: 1px solid #eff0f1;
  }
  i, em.down-file {
    cursor: pointer;
  }
  .list-last-el {
    padding-right: 60px;
    box-sizing: border-box;
  }
  .vuetable-wrapper {
    padding: 16px;
  }
  .edit-tab .id-tab .file-name {
    width: 70px;
  }
  .ui-tab-header-item {
    width: 20%;
    border-right: 1px solid #eff0f1;
    box-sizing: border-box;
  }
  .ui-tabs-header.background-color-default {
    background-color: #ffffff;
  }
  .edit-tab {
    margin-bottom: 16px;
  }
  .edit-tab .tab-header {
    height: 39px;
    line-height: 39px;
    font-size: 13px;
    color: #2a3c59;
    font-weight: bold;
    padding: 0 16px;
    background-color: #eef6fb;
  }
  .tab-header i {
    float: right;
    margin-top: 12px;
    font-size: 16px;
  }
  .tab-content ul {
    padding: 0 16px;
  }
  .edit-bg {
    background-color: #fafafa;
  }
  .tab-content li {
    float: left;
    width: 50%;
    font-size: 14px;
    color: #6a707d;
    height: 40px;
    line-height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .tab-content li span {
    color: #a5acbe;
    width: 190px;
    display: inline-block;
  }
  .save-info-group {
    text-align: center;
    margin-top: 16px;
  }
  .family-head, .family-list, .list-head, .list-body {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    padding: 0 16px;
  }
  .family-list, .list-body {
    color: #a5acbe;
    border-top: 1px solid #eff0f1;
    position: relative;
  }
  .update-emp-form .family-head span, .update-emp-form .family-list span, .list-head span, .list-body span {
    float: left;
    display: inline-block;
    width: 20%;
    height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .training-head span, .training-list span {
    width: 16.66%;
  }
  .update-emp-form .family-list .list-operate {
    position: absolute;
    width: auto;
    right: 16px;
  }
  .list-operate {
    text-align: right;
  }
  .list-operate i {
    font-size: 16px;
    margin-left: 25px;
  }
  .edit-form {
    padding: 16px;
  }
  .bank-tab li {
    width: 33%;
  }
  .bank-tab li span {
    width: 150px;
  }
  .edu-list, .exp-list {
    border-top: 1px solid #eff0f1;
    position: relative;
  }
  .update-emp-form .edu-list {
    padding: 0;
  }
  .training-operate, .edu-operate, .exp-operate {
    position: absolute;
    top: 38px;
    right: 28px;
  }
  .skill-list p {
    margin: 12px 0;
    font-size: 14px;
  }
  .skill-list p span {
    color: #a5acbe;
  }
  .skill-list {
    padding: 0 16px;
  }
  .skill-type, .skill-level {
    width: 140px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;
  }
  .skill-list .skill-level {
    color: #6a707d;
  }
  .hide-text-editor .text-editor {
    display: none;
  }
  .hide-text-editor .file-upload {
    display: inline-block;
    height: 32px;
    width: 80px;
    background-color: #6ec3ff;
  }
  .hide-text-editor .file-upload span {
    display: block;
    font-size: 16px;
    line-height: 32px;
    color: #fff;
    text-align: center;
  }
  .hide-text-editor span.file-name {
    position: absolute;
    width: 130px;
    height: 28px;
    margin-left: 10px;
    line-height: 28px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .hide-text-editor .file-upload-content {
    position: relative;
  }
  .hide-text-editor .file-upload-content i {
    position: absolute;
    right: 0;
    top: 6px;
    font-size: 16px;
    cursor: pointer;
  }
  .family-head span.require:after, .list-head span.require:after {
      content: '*';
      color: #ed5565;
      margin-right: 2px;
      margin-left: 4px;
  }
}
</style>

<template lang="html">

    <div class="content-wrap bg-w ihr-staff-edit">
        <ui-confirm header="Delete" @confirmed="delList" :show="showdel" close-on-confirm>
            {{$t('common.deleteConfirm')}}
        </ui-confirm>
        <employee-common-info ref="employeecommoninfo" :employee-id="employeeId" :employee-info="employeeInfo" :edit-able="!isResign"></employee-common-info>
        <div class="editTabs update-emp-form">
          <ui-tabs type="text" @tab-change="tabChange">
            <ui-tab :title="$t('staff.basicInformation')" id='basic-info'>
              <div class="edit-tab">
                <div class="tab-header">
                  <span>{{$t('staff.personalInfo')}}</span>
                  <i v-show="!show.perInfo && !isResign" class="fa fa-pencil-square-o" aria-hidden="true" @click="edit('perInfo')"></i>
                </div>
                <div class="tab-content" :class="{'edit-bg': show.perInfo}">
                  <ul class="fix" v-show="!show.perInfo">
                    <li><span>{{$t('staff.givenName')}}</span>{{ employeeInfo.givenName }}</li>
                    <li><span>{{$t('staff.middleName')}}</span>{{ employeeInfo.middleName }}</li>
                    <li><span>{{$t('staff.familyName')}}</span>{{ employeeInfo.familyName }}</li>
                    <li><span>{{$t('staff.preferredName')}}</span>{{ employeeInfo.preferredName }}</li>
                    <li><span>{{$t('staff.gender')}}</span>{{ fixDist(employeeInfo.gender, 'gender') }}</li>
                    <li><span>{{$t('staff.bloodType')}}</span>{{ fixDist(employeeInfo.bloodType, 'bloodType') }}</li>
                    <li><span>{{$t('staff.citizenship')}}</span>{{ employeeInfo.areaCitizenshipName }}</li>
                    <li><span>{{$t('staff.dateofBirth')}}</span>{{ employeeInfo.birthDate }}</li>
                    <li><span>{{$t('staff.placeofBirth')}}</span>{{ employeeInfo.placeBirthName }}</li>
                    <li><span>{{$t('staff.maritalStatus')}}</span>{{ fixDist(employeeInfo.maritalStatus, 'maritalStatus') }}</li>
                    <li v-if="!isOutsource"><span>{{$t('staff.IDRegisteredAddress')}}</span>{{ employeeInfo.idRegisteredAddress }}</li>
                    <li v-if="!isOutsource"><span>{{$t('staff.englishLevel')}}</span>{{ fixDist(employeeInfo.englishLevel, 'englishLevel') }}</li>
                    <li v-if="isEmployee"><span>{{$t('staff.recruitedFrom')}}</span>{{ fixDist(employeeInfo.employeeSource, 'employeeSource') }}</li>
                    <li><span>{{$t('staff.overtimeClassification')}}</span>{{ fixDist(employeeInfo.isOvertimeValid, 'overtimeValid') }}</li>
                    <li><span>{{$t('staff.idType')}}</span>{{ fixDist(employeeInfo.idType, 'idTypeDist') }}</li>
                    <li><span>{{$t('staff.IDNumber')}}</span>{{ employeeInfo.idNumber }}</li>
                    <li><span>{{$t('staff.issueDateOfID')}}</span>{{ getIdDate(employeeInfo.dictPassportList, 'IssueDate') }}</li>
                    <li><span>{{$t('staff.expiryDateOfID')}}</span>{{ getIdDate(employeeInfo.dictPassportList, 'ExpiryDate') }}</li>
                    <li v-if="!isOutsource"><span>{{$t('staff.emergencyContactName')}}</span>{{ employeeInfo.emergencyContact }}</li>
                    <li v-if="!isOutsource"><span>{{$t('staff.emergencyContactPhone')}}</span>{{ employeeInfo.emergencyContactPhone }}</li>
                    <li><span>{{$t('staff.dateofStartingwork')}}</span>{{ employeeInfo.startWorkDate }}</li>
                  </ul>
                  <div class="edit-form" v-show="show.perInfo">
                    <v-form ref="perinfoform" :model="perInfo" :schema="internsPerSchema" label-width="250" label-suffix="" :cols="3" form-style="update-interns-form">
                        <text-field v-if="!isMyProfile" property='givenName' editor-width="250"></text-field>
                        <text-field v-if="!isMyProfile" property='middleName' editor-width="250"></text-field>
                        <text-field v-if="!isMyProfile" property='familyName' editor-width="250"></text-field>
                        <text-field v-if="!isMyProfile" property='preferredName' editor-width="250"></text-field>
                        <select-field v-if="!isMyProfile" property="gender" :mapping="dist.gender" editor-width="250"></select-field>
                        <select-field v-if="!isMyProfile" property="bloodType" :mapping="dist.bloodType" editor-width="250"></select-field>
                        <select-field v-if="!isMyProfile" property="areaCitizenship" :mapping="dist.area" editor-width="250"></select-field>
                        <text-field v-if="!isMyProfile" property="birthDate" :max-date="curDate" editor-width="250"></text-field>
                        <text-field v-if="!isMyProfile" @open-selector="openSelector('placeselect')" property="placeBirthName" type="selector" :readonly="true" :show="selector.placeBirth" editor-width="250"></text-field>
                        <select-field property="maritalStatus" :mapping="dist.maritalStatus" editor-width="250"></select-field>
                        <text-field v-if="!isOutsource && !isMyProfile" property='idRegisteredAddress' editor-width="250"></text-field>
                        <select-field v-if="!isOutsource && !isMyProfile" property="englishLevel" :mapping="dist.englishLevel" editor-width="250"></select-field>
                        <select-field v-if="isEmployee && !isMyProfile" property="employeeSource" :mapping="dist.employeeSource" editor-width="250"></select-field>
                        <select-field v-if="!isMyProfile" property="isOvertimeValid" :mapping="dist.overtimeValid" editor-width="250"></select-field>
                        <text-field property='emergencyContact' editor-width="250" v-if="!isOutsource"></text-field>
                        <text-field property='emergencyContactPhone' type="number" editor-width="250" v-if="!isOutsource"></text-field>
                    </v-form>
                    <tree-data-selector ref="placeselect" :tree-data="treeArea" url="/org/area/${}/child" :head-text="$t('selectors.selectPlace')" label-id="areaId" label-name="areaName" :handle-comfirmed="selectPlaceBirth" :show="selector.placeBirth"></tree-data-selector>
                    <div class="save-info-group">
                        <ui-button color="primary mr10" @click="submitForm('perInfo')" :loading="loading.perInfo">{{$t('button.save')}}</ui-button>
                        <ui-button class="btn-default-bd" @click="cancel('perInfo')" type="flat">{{$t('button.cancel')}}</ui-button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="edit-tab">
                <div class="tab-header">
                  <span>{{$t('staff.IDInformation')}}</span>
                  <i v-show="!show.idInfo && !isResign && !isMyProfile" class="fa fa-plus-square-o" aria-hidden="true" @click="add('idInfo')"></i>
                </div>
                <div class="id-tab">
                  <div class="id-head fix">
                    <span class="require">{{$t('staff.idType')}}</span>
                    <span class="require">{{$t('staff.IDNumber')}}</span>
                    <span>{{$t('staff.issueDateOfID')}}</span>
                    <span>{{$t('staff.expiryDateOfID')}}</span>
                    <span>{{$t('staff.IDAttachment')}}</span>
                    <span>{{$t('staff.primaryID')}}</span>
                  </div>
                  <div class="id-list fix" v-for="(item, index) in employeeInfo.dictPassportList">
                    <span>{{fixDist(item.idType, 'idTypeDist')}}</span>
                    <span>{{item.idNumber}}</span>
                    <span>{{item.idIssueDate}}</span>
                    <span>{{item.idExpiredDate}}</span>
                    <span><em class="down-file" v-if="item.attachmentId" @click="downFile(index)"><i class="fa fa-cloud-download id-file-download" aria-hidden="true"></i>{{item.attachmentName}}</em></span>
                    <span>{{fixDist(item.mainDocuments, mainDocumentsDist)}}</span>
                    <span class="list-operate" v-show="!isResign && !isMyProfile"><i class="fa fa-pencil-square-o" aria-hidden="true" @click="edit('idInfo', index)"></i><i v-show="item.mainDocuments !== '1'" class="fa fa-trash-o" aria-hidden="true" @click="del('idInfo', index)"></i></span>
                  </div>
                  <div class="edit-form edit-bg" v-show="show.idInfo">
                    <v-form ref="idform" :model="id" :schema="idSchema" label-width="140" label-suffix="" :cols="6" form-style="update-interns-form">
                      <select-field :hide-label="true" :readonly="id.mainDocuments === '1' && isEdited" property='idType' :mapping="dist.idTypeDist" :disable-value="getDisableValue(index.id)" editor-width="140"></select-field>
                      <text-field :hide-label="true" :readonly="id.mainDocuments === '1' && isEdited" property='idNumber' editor-width="140"></text-field>
                      <text-field :hide-label="true" property='idIssueDate' editor-width="140" :max-date="id.idExpiredDate || curDate"></text-field>
                      <text-field :hide-label="true" property='idExpiredDate' editor-width="140" :min-date="id.idIssueDate"></text-field>
                      <div class="field id-type-radiogroupfield field-hashint cell-1-6">
                        <label style="width: 170px;display: none;">{{$t('staff.IDAttachment')}}</label>
                        <!-- <input-file name="id-type-file" :file-name="idFileName" :change-file="changeIdFile" :del-file="delIdFile" accept="image/gif,image/jpg,image/jpeg,image/png,application/pdf,application/msexcel,application/msword,application/x-zip-compressed"></input-file> -->
                        <div class="id-file-upload">
                          <file-upload @addFileUpload="addFileUpload" @afterFileUpload="afterFileUpload" :title="$t('button.upload')" class="file-upload" name="file" :post-action="files.url" :extensions="files.extensions" :accept="files.accept" :multiple="files.multiple" :size="files.size" :drop="files.drop"></file-upload>
                          <span class="file-name" :title="idFileName">{{idFileName}}</span>
                          <i v-show="idFileName || idFileName === '0'" class="fa fa-trash-o" aria-hidden="true" @click="delIdFile"></i>
                        </div>
                      </div>
                      <select-field :hide-label="true" v-show="!isEdited" property='mainDocuments' :mapping="mainDocumentsDist" editor-width="140"></select-field>
                    </v-form>
                    <div class="save-info-group">
                        <ui-button color="primary mr10" @click="submitForm('idInfo')" :loading="loading.idInfo">{{$t('button.save')}}</ui-button>
                        <ui-button class="btn-default-bd" @click="cancel('idInfo')" type="flat">{{$t('button.cancel')}}</ui-button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="edit-tab">
                <div class="tab-header">
                  <span>{{$t('staff.personalContact')}}</span>
                  <i v-show="!show.perContact && !isResign" class="fa fa-pencil-square-o" aria-hidden="true" @click="edit('perContact')"></i>
                </div>
                <div class="tab-content" :class="{'edit-bg': show.perContact}">
                  <ul class="fix" v-show="!show.perContact">
                    <li><span>{{$t('staff.homeAddress')}}</span>{{ perContactTemp.homeAddress }}</li>
                    <li><span>{{$t('staff.cityorTown')}}</span>{{ perContactTemp.homeCityTown }}</li>
                    <li><span>{{$t('staff.state')}}</span>{{ perContactTemp.homeStateName }}</li>
                    <li><span>{{$t('staff.country')}}</span>{{ perContactTemp.homeCountryName }}</li>
                    <li><span>{{$t('staff.ZIPCodePersonal')}}</span>{{ perContactTemp.homeZipcode }}</li>
                    <li><span>{{$t('staff.phonePersonal')}}</span>{{ perContactTemp.personalPhone }}</li>
                    <li><span>{{$t('staff.mobilePersonal')}}</span>{{ perContactTemp.personalMobile }}</li>
                    <li><span>{{$t('staff.emailPersonal')}}</span>{{ perContactTemp.personalEmail }}</li>
                    <li class="staff-border-top"><span>{{$t('staff.workAddress')}}</span>{{ perContactTemp.workAddress }}</li>
                    <li class="staff-border-top"><span>{{$t('staff.cityorTown')}}</span>{{ perContactTemp.workCityTown }}</li>
                    <li><span>{{$t('staff.state')}}</span>{{ perContactTemp.workStateName }}</li>
                    <li><span>{{$t('staff.country')}}</span>{{ perContactTemp.workCountryName }}</li>
                    <li><span>{{$t('staff.ZIPCodeWork')}}</span>{{ perContactTemp.workZipcode }}</li>
                    <li><span>{{$t('staff.phoneWork')}}</span>{{ perContactTemp.workPhone }}</li>
                    <li><span>{{$t('staff.mobileWork')}}</span>{{ perContactTemp.workMobile }}</li>
                    <li><span>{{$t('staff.emailWork')}}</span>{{ perContactTemp.workEmail }}</li>
                    <li class="staff-border-top"><span>{{$t('staff.skype')}}</span>{{ perContactTemp.skype }}</li>
                    <li class="staff-border-top"><span>{{$t('staff.facebook')}}</span>{{ perContactTemp.facebook }}</li>
                    <li><span>{{$t('staff.google')}}</span>{{ perContactTemp.google }}</li>
                    <li><span>{{$t('staff.linkedin')}}</span>{{ perContactTemp.linkedin }}</li>
                    <li><span>{{$t('staff.twitter')}}</span>{{ perContactTemp.twitter }}</li>
                  </ul>
                  <div class="edit-form" v-show="show.perContact">
                    <v-form ref="percontactform" :model="perContact" :schema="perContactSchema" label-width="250" label-suffix="" :cols="4" form-style="update-interns-form">
                        <text-field property="homeAddress" editor-width="250"></text-field>
                        <text-field property="homeCityTown" editor-width="250"></text-field>
                        <select-field property="homeState" :mapping="dist.homeStateMapping" editor-width="250"></select-field>
                        <select-field property="homeCountry" :mapping="dist.area" :select-change="changeHomeCountry" editor-width="250"></select-field>
                        <text-field property="homeZipcode" editor-width="250"></text-field>
                        <text-field property="personalPhone" type="number" editor-width="250"></text-field>
                        <text-field property="personalMobile" type="number" editor-width="250"></text-field>
                        <text-field property="personalEmail" editor-width="250"></text-field>
                        <text-field property="workAddress" editor-width="250"></text-field>
                        <text-field property="workCityTown" editor-width="250"></text-field>
                        <select-field property="workState" :mapping="dist.workStateMapping" editor-width="250"></select-field>
                        <select-field property="workCountry" :mapping="dist.area" :select-change="changeWorkCountry" editor-width="250"></select-field>
                        <text-field property="workZipcode" editor-width="250"></text-field>
                        <text-field property="workPhone" type="number" editor-width="250"></text-field>
                        <text-field property="workMobile" type="number" editor-width="250"></text-field>
                        <text-field v-show="!isMyProfile" property="workEmail" editor-width="250"></text-field>
                        <text-field property="skype" editor-width="250"></text-field>
                        <text-field property="facebook" editor-width="250"></text-field>
                        <text-field property="google" editor-width="250"></text-field>
                        <text-field property="linkedin" editor-width="250"></text-field>
                        <text-field property="twitter" editor-width="250"></text-field>
                    </v-form>
                    <div class="save-info-group">
                        <ui-button color="primary mr10" @click="submitForm('perContact')">{{$t('button.save')}}</ui-button>
                        <ui-button class="btn-default-bd" @click="cancel('perContact')" type="flat">{{$t('button.cancel')}}</ui-button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="edit-tab">
                <div class="tab-header">
                  <span>{{$t('staff.familyInformation')}}</span>
                  <i v-show="!show.familyInfo && !isResign" class="fa fa-plus-square-o" aria-hidden="true" @click="add('familyInfo')"></i>
                </div>
                <div class="family-tab">
                  <div class="family-head fix">
                    <span class="require">{{$t('staff.name')}}</span>
                    <span class="require">{{$t('staff.relationship')}}</span>
                    <span>{{$t('staff.internalRelatives')}}</span>
                    <span>{{$t('staff.company')}}</span>
                    <span>{{$t('staff.primaryPhone')}}</span>
                  </div>
                  <div class="family-list fix" v-for="(item, index) in familyList">
                    <span>{{item.name}}</span>
                    <span>{{fixDist(item.relationship, 'relationshipDist')}}</span>
                    <span>{{fixDist(item.isInternalRelatives, 'whetherType')}}</span>
                    <span>{{item.familyCompany}}</span>
                    <span class="list-last-el">{{item.primaryPhone}}</span>
                    <span class="list-operate" v-show="!isResign"><i class="fa fa-pencil-square-o" aria-hidden="true" @click="edit('familyInfo', index)"></i><i class="fa fa-trash-o" aria-hidden="true" @click="del('familyInfo', index)"></i></span>
                  </div>
                  <div class="edit-form edit-bg" v-show="show.familyInfo">
                    <v-form ref="familyform" :model="family" :schema="familySchema" label-width="190" label-suffix="" :cols="5" form-style="update-interns-form">
                        <text-field :hide-label="true" property="name" editor-width="190"></text-field>
                        <select-field :hide-label="true" property="relationship" :mapping="dist.relationshipDist" editor-width="190"></select-field>
                        <radiogroup-field :mapping="dist.whetherType" :hide-label="true" property="isInternalRelatives" editor-width="190"></radiogroup-field>
                        <text-field :hide-label="true" property="familyCompany" editor-width="190"></text-field>
                        <text-field :hide-label="true" property="primaryPhone" editor-width="190"></text-field>
                    </v-form>
                    <div class="save-info-group">
                        <ui-button color="primary mr10" @click="submitForm('familyInfo')">{{$t('button.save')}}</ui-button>
                        <ui-button class="btn-default-bd" @click="cancel('familyInfo')" type="flat">{{$t('button.cancel')}}</ui-button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="edit-tab">
                <div class="tab-header">
                  <span>{{$t('staff.bankTax')}}</span>
                  <i v-show="!show.bankInfo && !isResign && !isMyProfile" class="fa fa-pencil-square-o" aria-hidden="true" @click="edit('bankInfo')"></i>
                </div>
                <div class="tab-content bank-tab" :class="{'edit-bg': show.bankInfo}">
                  <div class="list-head fix">
                    <span class="require">{{$t('staff.branchNameofBank')}}</span>
                    <span class="require">{{$t('staff.bankHolder')}}</span>
                    <span class="require">{{$t('staff.bankAccountNumber')}}</span>
                    <span class="require">{{$t('staff.medicalInsuranceNumber')}}</span>
                    <span class="require">{{$t('staff.taxableNumber')}}</span>
                  </div>
                  <div class="list-body fix" v-show="!show.bankInfo">
                    <span>{{ bankTemp.brakName }}</span>
                    <span>{{ bankTemp.bankHolder }}</span>
                    <span>{{ bankTemp.bankNumber }}</span>
                    <span>{{ bankTemp.medicareNumber }}</span>
                    <span>{{ bankTemp.taxableNumber }}</span>
                  </div>
                  <div class="edit-form" v-show="show.bankInfo">
                    <v-form ref="bankform" :model="bank" :schema="bankSchema" label-width="200" label-suffix="" :cols="5" form-style="update-interns-form">
                        <text-field :hide-label="true" property="brakName" editor-width="200"></text-field>
                        <text-field :hide-label="true" property="bankHolder" editor-width="200"></text-field>
                        <text-field :hide-label="true" property="bankNumber" editor-width="200"></text-field>
                        <text-field :hide-label="true" property="medicareNumber" editor-width="200"></text-field>
                        <text-field :hide-label="true" property="taxableNumber" editor-width="200"></text-field>
                    </v-form>
                    <div class="save-info-group">
                        <ui-button color="primary mr10" @click="submitForm('bankInfo')">{{$t('button.save')}}</ui-button>
                        <ui-button class="btn-default-bd" @click="cancel('bankInfo')" type="flat">{{$t('button.cancel')}}</ui-button>
                    </div>
                  </div>
                </div>
              </div>
            </ui-tab>
            <ui-tab :title="$t('staff.jobInformation')" id='job-info'>
              <div class="edit-tab">
                <div class="tab-header">
                  <span>{{$t('staff.jobInformation')}}</span>
                  <i v-show="!show.jobInfo && !isResign && !isMyProfile" class="fa fa-pencil-square-o" aria-hidden="true" @click="edit('jobInfo')"></i>
                </div>
                <div class="tab-content" :class="{'edit-bg': show.jobInfo}">
                  <ul class="fix" v-show="!show.jobInfo">
                    <li><span>{{$t('staff.employeeId')}}</span>{{ employeeInfo.employeeCode }}</li>
                    <li v-if="!isInterns"><span>{{$t('staff.localEmployeeId')}}</span>{{ employeeInfo.localEmployeeCode }}</li>
                    <li v-if="!isMyProfile"><span>{{$t('staff.mibPostion')}}</span>{{ employeeInfo.positionName }}</li>
                    <li><span>{{$t('staff.position')}}</span>{{ employeeInfo.businessCardTitle }}</li>
                    <li><span>{{$t('staff.organization')}}</span>{{ employeeInfo.unitShortName }}</li>
                    <li v-if="isInterns"><span>{{$t('staff.mentor')}}</span>{{ employeeInfo.mentor }}</li>
                    <li v-if="isEmployee"><span>{{$t('staff.reportLine')}}</span>{{ employeeInfo.parentEmployeeName }}</li>
                    <li v-if="isEmployee"><span>{{$t('staff.employementCategory')}}</span>{{ fixDist(employeeInfo.employementCategory, 'employementCategory') }}</li>
                    <li v-if="!isMyProfile"><span>{{$t('staff.mibGrade')}}</span>{{ employeeInfo.mibGrade }}</li>
                    <li><span>{{$t('staff.jobGrade')}}</span>{{ employeeInfo.localJobGrade }}</li>
                    <li v-if="isEmployee"><span>{{$t('staff.officeAddress')}}</span>{{ employeeInfo.officeAddress }}</li>
                    <li v-if="isEmployee"><span>{{$t('staff.hireDate')}}</span>{{ employeeInfo.hireDate | formatDate }}</li>
                    <li v-if="isEmployee"><span>{{$t('staff.probation')}}</span>{{ fixDist(employeeInfo.isProbation, 'whetherType') }}</li>
                    <li v-if="isEmployee"><span>{{$t('staff.startDateOfProbation')}}</span>{{ employeeInfo.probationBeginDate | formatDate }}</li>
                    <li v-if="isEmployee"><span>{{$t('staff.endDateOfProbation')}}</span>{{ employeeInfo.probationEndDate | formatDate }}</li>
                    <li v-if="isEmployee"><span>{{$t('staff.statusOfEmployee')}}</span>{{ fixDist(employeeInfo.employeeStatus, 'employeeStatus') }}</li>
                    <li v-if="isOutsource"><span>{{$t('staff.startDateOfOutsourcing')}}</span>{{ employeeInfo.registerDate | formatDate }}</li>
                    <li v-if="isOutsource && isResign"><span>{{$t('staff.endDateOfOutsourcing')}}</span>{{ employeeInfo.endDate | formatDate }}</li>
                    <li v-if="isInterns"><span>{{$t('staff.startDateOfInternship')}}</span>{{ employeeInfo.registerDate | formatDate }}</li>
                    <li v-if="isInterns && isResign"><span>{{$t('staff.endDateOfInternship')}}</span>{{ employeeInfo.endDate | formatDate }}</li>
                  </ul>
                  <div class="edit-form" v-show="show.jobInfo">
                    <v-form ref="jobform" :model="jobInfo" :schema="jobSchema" label-width="250" label-suffix="" :cols="3" form-style="update-interns-form">
                      <text-field property='localEmployeeCode' editor-width="250" v-if="!isInterns"></text-field>
                      <!-- <text-field property='businessCardTitle' editor-width="250" v-if="isEmployee"></text-field>
                      <text-field property='localJobGrade' editor-width="250" v-if="isEmployee"></text-field> -->
                      <text-field property="mentor" @open-selector="openSelector('perselect')" type="selector" :readonly="true" :show="selector.mentor" editor-width="250" v-if="isInterns"></text-field>
                    </v-form>
                    <person-selector ref="perselect" :show="selector.mentor" :handle-comfirmed="selectMentor" :multi-selected="false"></person-selector>
                    <div class="save-info-group">
                        <ui-button color="primary mr10" @click="submitForm('jobInfo')" :loading="loading.jobInfo">{{$t('button.save')}}</ui-button>
                        <ui-button class="btn-default-bd" @click="cancel('jobInfo')" type="flat">{{$t('button.cancel')}}</ui-button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="edit-tab">
                <div class="tab-header">
                  <span>{{$t('staff.contract')}}</span>
                  <i v-show="!show.contractInfo && !isResign && !isMyProfile" class="fa fa-pencil-square-o" aria-hidden="true" @click="edit('contractInfo')"></i>
                </div>
                <div class="tab-content" :class="{'edit-bg': show.contractInfo}">
                  <ul class="fix" v-show="!show.contractInfo">
                    <li><span>{{$t('staff.contractNumber')}}</span>{{ contractTemp.contractNo }}</li>
                    <li><span>{{$t('staff.contractType')}}</span>{{ fixDist(contractTemp.contractType, 'contractType') }}</li>
                    <li><span>{{$t('staff.startDate')}}</span>{{ contractTemp.startDate }}</li>
                    <li><span>{{$t('staff.endDate')}}</span>{{ contractTemp.contractLength !== '2' ? contractTemp.endDate : '' }}</li>
                    <li><span>{{$t('staff.lengthOfContract')}}</span>{{ fixDist(contractTemp.contractLength, 'contractLength') }}</li>
                    <li><span>{{$t('staff.subjectOfContract')}}</span>{{ contractTemp.contractSubject }}</li>
                    <li><span>{{$t('staff.confidentialItems')}}</span>{{ fixDist(contractTemp.isConfidentia, 'confidentiaTypeDist')   }}</li>
                    <li><span>{{$t('staff.nonCompetitionItems')}}</span>{{ fixDist(contractTemp.isNonCompetition, 'confidentiaTypeDist')  }}</li>
                    <li><span>{{$t('staff.attachment')}}</span><em class="down-file" v-if="contractTemp.confidentiaAgreement && contractTemp.confidentiaAgreementName !== null" @click="downFile('confidentiaAgreement')"><i class="fa fa-cloud-download contract-file-download" aria-hidden="true"></i>{{contractTemp.confidentiaAgreementName}}</em></li>
                    <!-- <li><span>Non Confidential Agreement</span><em class="down-file" v-if="contractTemp.nonCompetitionAgreement" @click="downFile('nonCompetitionAgreement')"><i class="fa fa-cloud-download contract-file-download" aria-hidden="true"></i>{{contractTemp.nonCompetitionAgreementName}}</em></li> -->
                  </ul>
                  <div class="edit-form" v-show="show.contractInfo">
                    <v-form ref="contractform" :model="contract" :schema="contractSchema" label-width="250" label-suffix="" :cols="4" form-style="update-interns-form">
                        <text-field property="contractNo" editor-width="250"></text-field>
                        <select-field property="contractType" :mapping="dist.contractType" editor-width="250"></select-field>
                        <select-field property="contractLength" :mapping="dist.contractLength" editor-width="250" :select-change="changeLength"></select-field>
                        <text-field property="startDate" :max-date="contract.endDate" editor-width="250"></text-field>
                        <text-field v-show="contract.contractLength !== '2'" property="endDate" :min-date="contract.startDate" editor-width="250"></text-field>
                        <text-field property="contractSubject" editor-width="250"></text-field>

                        <select-field  property="isConfidentia" :mapping="dist.confidentiaTypeDist" editor-width="250"></select-field>
                        <select-field  property="isNonCompetition" :mapping="dist.confidentiaTypeDist" editor-width="250"></select-field>

                        <text-increment property="confidentiaAgreement" editor-width="250" class="hide-text-editor">
                          <!-- <input type="file" class="contract-file" name="confidentiaAgreement" value="" @change="changeFile($event, 'confidentiaAgreement')" accept="image/gif,image/jpg,image/jpeg,image/png,application/pdf,application/msexcel,application/msword,application/x-zip-compressed"> -->
                          <!-- <input-file name="confidentiaAgreement" :file-name="contractTemp.confidentiaAgreementName" :change-file="changeConFile" :del-file="delConFile" accept="image/gif,image/jpg,image/jpeg,image/png,application/pdf,application/msexcel,application/msword,application/x-zip-compressed"></input-file> -->
                          <div class="file-upload-content">
                            <file-upload ref="upload" :title="$t('button.upload')" class="file-upload" name="confidentiaAgreementFile" :post-action="contractFile.url" :extensions="contractFile.extensions" :accept="contractFile.accept" :multiple="contractFile.multiple" :size="contractFile.size" :drop="contractFile.drop"></file-upload>
                            <span class="file-name" :title="contract.confidentiaAgreementName">{{contract.confidentiaAgreementName}}</span>
                            <i v-show="contract.confidentiaAgreementName || contract.confidentiaAgreementName === '0'" class="fa fa-trash-o" aria-hidden="true" @click="delConFile"></i>
                          </div>
                        </text-increment>
                        <!-- <text-increment property="nonCompetitionAgreement" editor-width="250" class="hide-text-editor">
                          <input-file name="nonCompetitionAgreement" :file-name="contractTemp.nonCompetitionAgreement" :change-file="changeNonConFile" :del-file="delNonConFile" accept="image/gif,image/jpg,image/jpeg,image/png,application/pdf,application/msexcel,application/msword,application/x-zip-compressed"></input-file>
                        </text-increment> -->
                    </v-form>
                    <div class="save-info-group">
                        <ui-button color="primary mr10" @click="submitForm('contractInfo')">{{$t('button.save')}}</ui-button>
                        <ui-button class="btn-default-bd" @click="cancel('contractInfo')" type="flat">{{$t('button.cancel')}}</ui-button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="edit-tab" v-if="isEmployee">
                <div class="tab-header">
                  <span>{{$t('staff.partTimeInformation')}}</span>
                </div>
                <div class="vuetable-wrapper">
                  <vuetable :api-url="tableUrl.partTimeUrl" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="tableColumns.partTimeColumns" per-page="10">
                  </vuetable>
                </div>
              </div>

            </ui-tab>
            <ui-tab :title="$t('staff.professionalInformation')" id='professional-info'>
              <div class="edit-tab">
                <div class="tab-header">
                  <span>{{$t('staff.trainingCourse')}}</span>
                  <i v-show="!show.trainingInfo && !isResign" class="fa fa-plus-square-o" aria-hidden="true" @click="add('trainingInfo')"></i>
                </div>
                <div class="training-tab tab-content">
                  <div class="list-head training-head fix">
                    <span class="require">{{$t('staff.trainingName')}}</span>
                    <span class="require">{{$t('staff.course')}}</span>
                    <span class="require">{{$t('staff.startDate')}}</span>
                    <span class="require">{{$t('staff.endDate')}}</span>
                    <span>{{$t('staff.nameofCertificate')}}</span>
                    <span>{{$t('staff.typeofTraining')}}</span>
                  </div>
                  <div class="training-list list-body fix" v-for="(item, index) in trainingList">
                    <div class="fix">
                      <span>{{item.trainingName}}</span>
                      <span>{{item.courses}}</span>
                      <span>{{item.startDate}}</span>
                      <span>{{item.endDate}}</span>
                      <span>{{item.certificate}}</span>
                      <span class="list-last-el">{{fixDist(item.trainingType, 'trainingType')}}</span>
                    </div>
                    <span class="list-operate training-operate" v-show="!isResign"><i class="fa fa-pencil-square-o" aria-hidden="true" @click="edit('trainingInfo', index)"></i><i class="fa fa-trash-o" aria-hidden="true" @click="del('trainingInfo', index)"></i></span>
                  </div>
                  <div class="edit-form edit-bg" v-show="show.trainingInfo">
                    <v-form ref="trainingform" :model="training" :schema="trainingSchema" label-width="140" label-suffix="" :cols="6" form-style="update-interns-form">
                        <text-field :hide-label="true" property="trainingName" editor-width="140"></text-field>
                        <text-field :hide-label="true" property="courses" editor-width="140"></text-field>
                        <text-field :hide-label="true" property="startDate" :max-date="training.endDate || curDate" editor-width="140"></text-field>
                        <text-field :hide-label="true" property="endDate" :min-date="training.startDate" editor-width="140"></text-field>
                        <text-field :hide-label="true" property="certificate" editor-width="140"></text-field>
                        <select-field :hide-label="true" property="trainingType" :mapping="dist.trainingType" editor-width="140"></select-field>
                    </v-form>
                    <div class="save-info-group">
                        <ui-button color="primary mr10" @click="submitForm('trainingInfo')">{{$t('button.save')}}</ui-button>
                        <ui-button class="btn-default-bd" @click="cancel('trainingInfo')" type="flat">{{$t('button.cancel')}}</ui-button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="edit-tab">
                <div class="tab-header">
                  <span>{{$t('staff.academicBackground')}}</span>
                  <i v-show="!show.eduInfo && !isResign && !isMyProfile" class="fa fa-plus-square-o" aria-hidden="true" @click="add('eduInfo')"></i>
                </div>
                <div class="edu-tab tab-content">
                  <div class="edu-list fix" v-for="(item, index) in eduList">
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
                    <span class="list-operate edu-operate" v-show="!isResign && !isMyProfile"><i class="fa fa-pencil-square-o" aria-hidden="true" @click="edit('eduInfo', index)"></i><i v-show="eduList.length > 1" class="fa fa-trash-o" aria-hidden="true" @click="del('eduInfo', index)"></i></span>
                  </div>
                  <div class="edit-form edit-bg" v-show="show.eduInfo">
                    <v-form ref="eduform" :model="edu" :schema="eduSchema" label-width="220" label-suffix="" :cols="4" form-style="update-interns-form">
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
                        <ui-button color="primary mr10" @click="submitForm('eduInfo')" :loading="loading.eduInfo">{{$t('button.save')}}</ui-button>
                        <ui-button class="btn-default-bd" @click="cancel('eduInfo')" type="flat">{{$t('button.cancel')}}</ui-button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="edit-tab">
                <div class="tab-header">
                  <span>{{$t('staff.skillLanguage')}}</span>
                  <i v-show="!show.skillInfo && !isResign" class="fa fa-plus-square-o" aria-hidden="true" @click="add('skillInfo')"></i>
                </div>
                <div class="skill-tab tab-content">
                  <div class="skill-list fix" v-for="(item, index) in skillList">
                    <p>
                      <span class="skill-type">{{item.skillType}}</span>
                      <span class="skill-level">{{fixDist(item.skillLevel, 'grade')}}</span>
                      <span class="list-operate" v-show="!isResign"><i class="fa fa-pencil-square-o" aria-hidden="true" @click="edit('skillInfo', index)"></i><i class="fa fa-trash-o" aria-hidden="true" @click="del('skillInfo', index)"></i></span>
                    </p>
                  </div>
                  <div class="edit-form edit-bg" v-show="show.skillInfo">
                    <v-form ref="skillform" :model="skill" :schema="skillSchema" label-width="227" label-suffix="" :cols="4" form-style="update-interns-form">
                        <text-field property="skillType" editor-width="227"></text-field>
                        <select-field :mapping="dist.grade" property="skillLevel" editor-width="227"></select-field>
                    </v-form>
                    <div class="save-info-group">
                        <ui-button color="primary mr10" @click="submitForm('skillInfo')">{{$t('button.save')}}</ui-button>
                        <ui-button class="btn-default-bd" @click="cancel('skillInfo')" type="flat">{{$t('button.cancel')}}</ui-button>
                    </div>
                  </div>
                </div>
              </div>
            </ui-tab>
            <ui-tab :title="$t('staff.workExperience')" id='work-exp'>
              <div class="edit-tab">
                <div class="tab-header">
                  <span>{{$t('staff.professionalExperience')}}</span>
                  <i v-show="!show.expInfo && !isResign && !isMyProfile" class="fa fa-plus-square-o" aria-hidden="true" @click="add('expInfo')"></i>
                </div>
                <div class="exp-tab tab-content">
                  <div class="exp-list fix" v-for="(item, index) in expList">
                    <ul class="fix">
                      <li><span>{{$t('staff.previousPosition')}}</span>{{item.positionName}}</li>
                      <li><span>{{$t('staff.previousCompany')}}</span>{{item.company}}</li>
                      <li><span>{{$t('staff.startDate')}}</span>{{item.startDate}}</li>
                      <li><span>{{$t('staff.endDate')}}</span>{{item.endDate}}</li>
                      <li><span>{{$t('staff.references')}}</span>{{item.witness}}</li>
                      <li><span>{{$t('staff.contactInfoofReferences')}}</span>{{item.witnessContact}}</li>
                    </ul>
                    <span class="list-operate exp-operate" v-show="!isResign && !isMyProfile"><i class="fa fa-pencil-square-o" aria-hidden="true" @click="edit('expInfo', index)"></i><i class="fa fa-trash-o" aria-hidden="true" @click="del('expInfo', index)"></i></span>
                  </div>
                  <div class="edit-form edit-bg" v-show="show.expInfo">
                    <v-form ref="expform" :model="exp" :schema="expSchema" label-width="220" label-suffix="" :cols="4" form-style="update-interns-form">
                      <text-field property="positionName" editor-width="220"></text-field>
                      <text-field property="company" editor-width="220"></text-field>
                      <text-field property="startDate" :max-date="exp.endDate" editor-width="220"></text-field>
                      <text-field property="endDate" :min-date="exp.startDate" editor-width="220"></text-field>
                      <text-field property="witness" editor-width="220"></text-field>
                      <text-field property="witnessContact" editor-width="220"></text-field>
                    </v-form>
                    <div class="save-info-group">
                        <ui-button color="primary mr10" @click="submitForm('expInfo')">{{$t('button.save')}}</ui-button>
                        <ui-button class="btn-default-bd" @click="cancel('expInfo')" type="flat">{{$t('button.cancel')}}</ui-button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="edit-tab" v-if="isEmployee">
                <div class="tab-header">
                  <span>{{$t('staff.dispatchExperience')}}</span>
                </div>
                <div class="vuetable-wrapper">
                  <vuetable :api-url="tableUrl.disExpUrl" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="tableColumns.disExpColumns" per-page="10">
                  </vuetable>
                </div>
              </div>
              <div class="edit-tab" v-if="isEmployee">
                <div class="tab-header">
                  <span>{{$t('staff.promotionRecords')}}</span>
                </div>
                <div class="vuetable-wrapper">
                  <vuetable :api-url="tableUrl.proRecUrl" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="tableColumns.proRecColumns" per-page="10">
                  </vuetable>
                </div>
              </div>
              <div class="edit-tab" v-if="isEmployee">
                <div class="tab-header">
                  <span>{{$t('staff.transferRecords')}}</span>
                </div>
                <div class="vuetable-wrapper">
                  <vuetable :api-url="tableUrl.traRecUrl" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="tableColumns.traRecColumns" per-page="10">
                  </vuetable>
                </div>
              </div>
            </ui-tab>
            <ui-tab :title="$t('staff.additionalInformation')" id='additional-info'>
              <div class="edit-tab">
                <div class="tab-header">
                  <span>{{$t('staff.additionalInformation')}}</span>
                  <i v-show="!show.additionalInfo && !isResign && !isMyProfile" class="fa fa-pencil-square-o" aria-hidden="true" @click="edit('additionalInfo')"></i>
                </div>
                <div class="additional-tab tab-content">
                  <div class="additional-list" v-show="!show.additionalInfo">
                    <ul class="fix">
                      <li v-for="item in additionalList">
                        <span>{{item.name}}</span>
                        {{item.dist ? fixDist(item.value, item.dist) : item.value }}
                      </li>
                    </ul>
                  </div>
                  <div class="edit-form edit-bg" v-show="show.additionalInfo">
                    <v-form ref="areaform" :model="template" :schema="templateSchema" label-width="250" label-suffix="" :cols="4" form-style="update-interns-form">
                        <select-field :select-change="changeTemplate" property="templateArea" :mapping="templateList" editor-width="250"></select-field>
                    </v-form>
                    <v-form ref="areatemplate" :model="detailsList" :schema="detailsListSchema" label-width="250" label-suffix="" :cols="4" form-style="update-interns-form">
                      <template v-for="item in areaTemplateDetails">
                        <text-field v-if="item.fieldType === '0' && item.isShow === 'Y'" :property="item.fieldName" editor-width="250"></text-field>
                        <select-field v-if="item.fieldType === '1' && item.isShow === 'Y'" :property="item.fieldName" editor-width="250"></select-field>
                      </template>
                    </v-form>
                    <div class="save-info-group">
                        <ui-button color="primary mr10" @click="submitForm('additionalInfo')">{{$t('button.save')}}</ui-button>
                        <ui-button class="btn-default-bd" @click="cancel('additionalInfo')" type="flat">{{$t('button.cancel')}}</ui-button>
                    </div>
                  </div>
                </div>
              </div>
            </ui-tab>
          </ui-tabs>
        </div>
    </div>

</template>

<script>
import {
    getDictMapping,formatDate,convert,downloadFile,transformDict
}
from '../../util/assist.js';
import {default as Message} from '../../components/basic/message';
import {
    default as Schema
} from '../../schema/index';
Vue.component('visa', {
    template: [
      '<div>',
        '<em v-if="rowData.visa" class="down-file" @click="download(rowData)"><i class="fa fa-cloud-download id-file-download" aria-hidden="true"></i>{{rowData.attachmentName}}</em>',
      '</div>'
    ].join(''),
    //
    // vuetable will inject the row data via `row-data` prop
    props: {
      rowData: {
        type: Object,
        required: true
      }
    },
    methods: {
      download: function(data) {
        if (data.visa) {
          downloadFile('/system/attachment/downloadFile', {attachmentId: data.visa});
        }
      }
    }
  })
export default {
    data() {
      var _self = this;
      var isInterns = this.$route.name === 'internsView';
      var isOutsource = this.$route.name === 'outsourceView';
      var isEmployee = !isInterns && !isOutsource;
      var isResign = this.$route.name === 'resignedEmployeesView';
      var isMyProfile = this.$route.name === 'myProfile';
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
          placeBirth: {},
          maritalStatus: {
              label: this.$t('staff.maritalStatus'),
              required: true
          },
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
          photoId: {}
      };
      if (isOutsource) {
        delete internsPerData.englishLevel;
        delete internsPerData.emergencyContact;
        delete internsPerData.emergencyContactPhone;
        delete internsPerData.idRegisteredAddress;
      }
      if (!isEmployee) {
        delete internsPerData.employeeSource;
      }
      if (isMyProfile) {
        internsPerData = {
          maritalStatus: {
              label: this.$t('staff.maritalStatus'),
              required: true
          },
          emergencyContact: {
              label: this.$t('staff.emergencyContactName')
          },
          emergencyContactPhone: {
              label: this.$t('staff.emergencyContactPhone'),
              required: true
          }
        };
      }
      var idSchema = new Schema({
          idType: {
              label: this.$t('staff.idType'),
              required: true
          },
          idNumber: {
              label: this.$t('staff.IDNumber'),
              required: true,
              rules: {
                type: 'custom',
                message: this.$t('staff.message.typeError'),
                validate() {
                  return _self.idNumberValiate;
                }
              }
          },
          idIssueDate: {
              type: 'date',
              label: this.$t('staff.issueDateOfID')
          },
          idExpiredDate: {
              type: 'date',
              label: this.$t('staff.expiryDateOfID')
          },
          attachmentId: {
              label: this.$t('staff.IDAttachment')
          },
          mainDocuments: {
            label: this.$t('staff.primaryID'),
            default: '0'
          }
      });
      var perContactData = {
          homeAddress: {
              label: this.$t('staff.homeAddress'),
              required: true,
              whitespace: false
          },
          homeCityTown: {
              label: this.$t('staff.cityorTown')
          },
          homeState: {
              label: this.$t('staff.state')
          },
          homeCountry: {
              label: this.$t('staff.country')
          },
          homeZipcode: {
              label: this.$t('staff.ZIPCodePersonal'),
              required: true
          },
          personalPhone: {
              label: this.$t('staff.phonePersonal')
          },
          personalMobile: {
              label: this.$t('staff.mobilePersonal')
          },
          personalEmail: {
              label: this.$t('staff.emailPersonal'),
              rules: {
                type: 'custom',
                message: this.$t('staff.message.typeError'),
                validate() {
                  return _self.personalEmail;
                }
              }
          },
          workAddress: {
              label: this.$t('staff.workAddress'),
              required: true
          },
          workCityTown: {
              label: this.$t('staff.cityorTown')
          },
          workState: {
              label: this.$t('staff.state')
          },
          workCountry: {
              label: this.$t('staff.country')
          },
          workZipcode: {
              label: this.$t('staff.ZIPCodeWork'),
              required: true
          },
          workPhone: {
              label: this.$t('staff.phoneWork')
          },
          workMobile: {
              label: this.$t('staff.mobileWork')
          },
          workEmail: {
              label: this.$t('staff.emailWork'),
              rules: {
                type: 'custom',
                message: this.$t('staff.message.typeError'),
                validate() {
                  return _self.workEmail;
                }
              }
          },
          skype: {
              label: this.$t('staff.skype')
          },
          facebook: {
              label: this.$t('staff.facebook')
          },
          google: {
              label: this.$t('staff.google')
          },
          linkedin: {
              label: this.$t('staff.linkedin')
          },
          twitter: {
              label: this.$t('staff.twitter')
          }
      };
      var familySchema = new Schema({
          name: {
              label: this.$t('staff.name'),
              required: true
          },
          relationship: {
              label: this.$t('staff.relationship'),
              required: true
          },
          isInternalRelatives: {
              label: this.$t('staff.internalRelatives'),
              default: '2'
          },
          familyCompany: {
              label: this.$t('staff.company')
          },
          primaryPhone: {
              label: this.$t('staff.primaryPhone')
          }
      });
      var bankSchema = new Schema({
          brakName: {
              label: this.$t('staff.branchNameofBank'),
              required: true
          },
          bankHolder: {
              label: this.$t('staff.bankHolder'),
              required: true
          },
          bankNumber: {
              label: this.$t('staff.bankAccountNumber'),
              type: 'number',
              required: true
          },
          medicareNumber: {
              label: this.$t('staff.medicalInsuranceNumber'),
              type: 'number',
              required: true
          },
          taxableNumber: {
              label: this.$t('staff.taxableNumber'),
              type: 'number',
              required: true
          }
      });
      var jobData = {
          localEmployeeCode: {
              label: this.$t('staff.localEmployeeId')
          },
          positionName: {},
          positionId: {},
          positionCode: {},
          unitShortName: {},
          unitId: {},
          mibGrade: {},
          businessCardTitle: {
              label: this.$t('staff.position')
          },
          localJobGrade: {
              label: this.$t('staff.jobGrade')
          },
          mentor: {
              label: this.$t('staff.mentor'),
              required: false
          }
      };
      if (!isInterns) {
          delete jobData.mentor;
      }
      if (isInterns) {
          delete jobData.localEmployeeCode;
      }
      if (!isEmployee) {
          delete jobData.businessCardTitle;
          delete jobData.localJobGrade;
      }
      var trainingSchema = new Schema({
          trainingName: {
              label: this.$t('staff.trainingName'),
              required: true
          },
          courses: {
              label: this.$t('staff.course'),
              required: true
          },
          startDate: {
              label: this.$t('staff.startDate'),
              type: 'date',
              required: true
          },
          endDate: {
              type: 'date',
              label: this.$t('staff.endDate'),
              required: true
          },
          certificate: {
              label: this.$t('staff.nameofCertificate')
          },
          trainingType: {
              label: this.$t('staff.typeofTraining')
          }
      });
      var eduSchema = new Schema({
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
      });
      var skillSchema = new Schema({
        skillType: {
            label: this.$t('staff.skillorLanguageLabel'),
            required: true
        },
        skillLevel: {
            label: this.$t('staff.grade'),
            required: true
        }
      });
      var expSchema = new Schema({
          positionName: {
              label: this.$t('staff.previousPosition'),
              required: true
          },
          company: {
              label: this.$t('staff.previousCompany'),
              required: true
          },
          startDate: {
              label: this.$t('staff.startDate'),
              type: 'date',
              required: true
          },
          endDate: {
              type: 'date',
              label: this.$t('staff.endDate'),
              required: true
          },
          witness: {
              label: this.$t('staff.references')
          },
          witnessContact: {
              label: this.$t('staff.contactInfoofReferences')
          }
      });
      var contractSchema = new Schema({
          contractNo: {
              label: this.$t('staff.contractNumber')
          },
          contractType: {
              label: this.$t('staff.contractType'),
              required: true
          },
          startDate: {
              label: this.$t('staff.startDate'),
              type: 'date',
              required: true
          },
          endDate: {
              label: this.$t('staff.endDate'),
              type: 'date',
              required: true
          },
          contractLength: {
              label: this.$t('staff.lengthOfContract'),
              required: true
          },
          contractSubject: {
              label: this.$t('staff.subjectOfContract'),
              required: true,
              whitespace: false
          },
          isConfidentia: {
              label: this.$t('staff.confidentialItems'),
          },
          isNonCompetition: {
              label: this.$t('staff.nonCompetitionItems'),
          },
          confidentiaAgreement: {
              label: this.$t('staff.attachment'),
          },
          nonCompetitionAgreement: {
              label: this.$t('staff.attachment'),
          },
          confidentiaAgreementName: {}
      });
      var templateSchema = new Schema({
        templateArea: {
          label: this.$t('staff.informationTemplate'),
          required: true
        }
      });
        return {
          personalEmail: true,
          workEmail: true,
          isInterns: isInterns,
          isOutsource: isOutsource,
          isEmployee: isEmployee,
          isResign: isResign,
          isMyProfile: isMyProfile,
          employeeId: this.$route.params.employeeId,
          employeeInfo: {},
          idNumberValiate: true,
          idFileName: '',
          treeArea: [],
          dist: {
            area: {},
            learnType: {},
            grade: {},
            whetherType: {},
            mibGradeDist: {},
            relationshipDist: {},
            homeStateMapping: {},
            workStateMapping: {},
            degree: {},
            trainingType: {},
            contractType: {},
            contractLength: {},
            confidentiaTypeDist:{},
            idType: {},
            gender: {},
            bloodType: {},
            maritalStatus: {},
            englishLevel: {},
            changeReason: {},
            employeeStatus: {},
            employementCategory: {},
            expatriationCategory: {},
            repatriateReason: {},
            idTypeDist: {},
            employeeSource: {},
            overtimeValid: {}
          },
          loading: {
            idInfo: false,
            perInfo: false,
            jobInfo: false,
            eduInfo: false
          },
          show: {
            perInfo: false,
            perContact: false,
            familyInfo: false,
            bankInfo: false,
            jobInfo: false,
            trainingInfo: false,
            eduInfo: false,
            skillInfo: false,
            expInfo: false,
            contractInfo: false,
            additionalInfo: false,
            idInfo: false
          },
          showdel: false,
          delName: '',
          delIndex: -1,
          index: {
            family: -1,
            training: -1,
            edu: -1,
            skill: -1,
            exp: -1,
            id: -1
          },
          file: {
            confidentiaAgreementFile: [],
            nonCompetitionAgreementFile: []
          },
          contractFile: {
            url: Vue.config.APIURL + '/system/attachment/uploadFile',
            accept: 'image/:,application+/msexcel,application/msword,application/pdf',
            size: 1024 * 1024 * 2,
            multiple: false,
            extensions: 'gif,jpg,jpeg,png,pdf,doc,docx,xlsx,xls',
            // extensions: ['gif','jpg','png'],
            // extensions: /\.(gif|png|jpg)$/i,
            files: [],
            upload: {},
            drop: true,
            auto: false
          },
          files: {
            url: Vue.config.APIURL + '/system/attachment/uploadFile',
            accept: 'image/:,application+/msexcel,application/msword,application/pdf',
            size: 1024 * 1024 * 2,
            multiple: false,
            extensions: 'gif,jpg,jpeg,png,pdf,doc,docx,xlsx,xls',
            // extensions: ['gif','jpg','png'],
            // extensions: /\.(gif|png|jpg)$/i,
            files: [],
            upload: {},
            drop: true,
            auto: true
          },
          selector: {
            placeBirth: {
              modal: false
            },
            mentor: {
              modal: false
            }
          },
          internsPerData: internsPerData,
          internsPerSchema: new Schema(internsPerData),
          perInfo: {},
          idSchema: idSchema,
          id: idSchema.newModel(),
          perContactData: perContactData,
          perContactSchema: new Schema(perContactData),
          perContact: {},
          perContactTemp: {},
          familySchema: familySchema,
          family: {},
          familyList: [],
          bankSchema: bankSchema,
          bank: {},
          bankTemp: {
            brakName: '',
            bankHolder: '',
            bankNumber: '',
            medicareNumber: '',
            taxableNumber: ''
          },
          jobData: jobData,
          jobInfo: {},
          jobSchema: new Schema(jobData),
          trainingList: [],
          trainingSchema: trainingSchema,
          training: {},
          eduList: [],
          edu: {},
          eduSchema: eduSchema,
          skillSchema: skillSchema,
          skill: {},
          skillList: [],
          exp: {},
          expSchema: expSchema,
          expList: [],
          contract: {},
          contractSchema: contractSchema,
          contractTemp: {},
          templateSchema: templateSchema,
          template: templateSchema.newModel(),
          templateList: {},
          additionalList: [],
          detailsList: {},
          detailsListData: {},
          detailsListSchema: {},
          areaTemplateId: '',
          areaTemplateDetails: [],
          additionalData: {},
          templateArea: '',
          tableUrl: {
            partTimeUrl: '',
            disExpUrl: '',
            proRecUrl: '',
            traRecUrl: ''
          },
          tableColumns: {
            partTimeColumns: [
              {
                name: 'unitName',
                title: this.$t('staff.parttimeOrganization')
              },
              {
                name: 'positionName',
                title: this.$t('staff.partTimeRole')
              },
              {
                name: 'beginDate',
                title: this.$t('staff.startDate'),
                dataClass: 'tr',
                titleClass: 'mw80',
                callback(value) {
                  return _self.format(value);
                }
              },
              {
                name: 'endDate',
                title: this.$t('staff.endDate'),
                dataClass: 'tr',
                titleClass: 'mw80',
                callback(value) {
                  return _self.format(value);
                }
              }
            ],
            disExpColumns: [
              {
                name: 'disptachUnitName',
                title: this.$t('staff.hostCompany')
              },
              {
                name: 'dispatchAddress',
                title: this.$t('staff.expatriationAddress')
              },
              {
                name: 'dispatchPositionName',
                title: this.$t('staff.mibPostion')
              },
              {
                name: 'expatriationCategory',
                title: this.$t('staff.expatriation'),
                callback: function(value) {
                    return _self.fixDist(value, 'expatriationCategory');
                }
              },
              {
                name: 'roles',
                title: this.$t('staff.rolesResponsibilities')
              },
              {
                name: 'startDate',
                dataClass: 'tr',
                titleClass: 'mw80',
                title: this.$t('staff.startDate')
              },
              {
                name: 'endDate',
                dataClass: 'tr',
                titleClass: 'mw80',
                title: this.$t('staff.endDate')
              },
              {
                name: 'expatriationCategory',
                title: this.$t('staff.expatriationCategory'),
                callback: function(value) {
                    return _self.fixDist(value, 'expatriationCategory');
                }
              },
              {
                name: '__component:visa',
                title: this.$t('staff.visaAttachment')
              },
              {
                name: 'isFirstDispatch',
                title: this.$t('staff.firstexpatriationassignment'),
                callback: function(value) {
                    return _self.fixDist(value, 'whetherType');
                }
              }
            ],
            proRecColumns: [
              {
                name: 'effectiveDate',
                dataClass: 'tr',
                titleClass: 'mw80',
                title: this.$t('staff.effectiveDate')
              },
              {
                name: 'transferUnitName',
                title: this.$t('staff.organizationafterPromotion')
              },
              {
                name: 'transferPositionName',
                title: this.$t('staff.positionafterPromotion')
              },
              {
                name: 'jobGrade',
                title: this.$t('staff.jobGradeafterPromotion')
              },
              {
                name: 'localGrade',
                title: this.$t('staff.localGradeafterPromotion')
              },
              {
                name: 'workCity',
                title: this.$t('staff.workCityAfterPromotion')
              }
            ],
            traRecColumns: [
              {
                name: 'reason',
                title: this.$t('staff.reasonforTransfer'),
                callback: function(value) {
                    return _self.fixDist(value, 'changeReason');
                }
              },
              {
                name: 'effectiveDate',
                dataClass: 'tr',
                titleClass: 'mw80',
                title: this.$t('staff.effectiveDate')
              },
              {
                name: 'transferUnitName',
                title: this.$t('staff.organizationafterTransfer')
              },
              {
                name: 'transferPositionName',
                title: this.$t('staff.positionafterTransfer')
              },
              {
                name: 'jobGrade',
                title: this.$t('staff.jobGradeafterTransfer')
              },
              {
                name: 'workCity',
                title: this.$t('staff.workCityAfterTransfer')
              }
            ]
          }
        };
    },
    computed: {
      curDate() {
        return formatDate(new Date());
      },
      mainDocumentsDist() {
        var obj = {};
        var dist = this.dist.whetherType;
        if (dist) {
          for (let key of Object.keys(dist)) {
            if (dist[key] === '1') {
              obj[key] = '1';
            } else if(dist[key] === '2') {
              obj[key] = '0';
            }
          }
        }
        return obj;
      }
    },
    created() {
      var self = this;
      let dictCodes = ['CONFIDENTIA_TYPE','ENGLISH_LEVEL', 'LEARN_TYPE', 'LEARN_GRADE','WHETHER_TYPE','MIB_RANK','RELATIONSHIP','DEGREE','TRAINING_TYPE','CONTRACT_TYPE','CONTRACT_LENGTH','ID_TYPE','GENDER','MARITAL_STATUS','BLOOD_TYPE','CHANGE_REASON','EMPLOYEE_STATUS','EMPLOYEE_CATEGORY','EXPATRIATION_CATEGORY','REPATRIATION_REASON','EMPLOYEE_SOURCE','OVERTIME_CLASSIFICATION'];
      this.$http.post('/public-access/dicts/items', {
        dictCodes
      }, {
          emulateJSON: true
      }).then((response) => {
        for (var d of response.data) {

            if (d.dictName === 'LEARN_TYPE') {
               self.dist.learnType = transformDict(d.dict);
            }
            if (d.dictName === 'LEARN_GRADE') {
               self.dist.grade = transformDict(d.dict);
            }
            if (d.dictName === 'WHETHER_TYPE') {
               self.dist.whetherType = transformDict(d.dict);
            }
            if (d.dictName === 'MIB_RANK') {
               self.dist.mibGradeDist = transformDict(d.dict);
            }
            if (d.dictName === 'RELATIONSHIP') {
               self.dist.relationshipDist = transformDict(d.dict);
            }
            if (d.dictName === 'DEGREE') {
               self.dist.degree = transformDict(d.dict);
            }
            if (d.dictName === 'TRAINING_TYPE') {
               self.dist.trainingType = transformDict(d.dict);
            }
            if (d.dictName === 'CONTRACT_TYPE') {
               self.dist.contractType = transformDict(d.dict);
            }
            if (d.dictName === 'CONFIDENTIA_TYPE') {
               self.dist.confidentiaTypeDist = transformDict(d.dict);
            }
            if (d.dictName === 'CONTRACT_LENGTH') {
               self.dist.contractLength = transformDict(d.dict);
            }
            if (d.dictName === 'GENDER') {
               self.dist.gender = transformDict(d.dict);
            }
            if (d.dictName === 'MARITAL_STATUS') {
               self.dist.maritalStatus = transformDict(d.dict);
            }
            if (d.dictName === 'BLOOD_TYPE') {
               self.dist.bloodType = transformDict(d.dict);
            }
            if (d.dictName === 'ENGLISH_LEVEL') {
               self.dist.englishLevel = transformDict(d.dict);
            }
            if (d.dictName === 'CHANGE_REASON') {
               self.dist.changeReason = transformDict(d.dict);
            }
            if (d.dictName === 'EMPLOYEE_STATUS') {
               self.dist.employeeStatus = transformDict(d.dict);
            }
            if (d.dictName === 'EMPLOYEE_CATEGORY') {
               self.dist.employementCategory = transformDict(d.dict);
            }
            if (d.dictName === 'EXPATRIATION_CATEGORY') {
               self.dist.expatriationCategory = transformDict(d.dict);
            }
            if (d.dictName === 'REPATRIATION_REASON') {
               self.dist.repatriateReason = transformDict(d.dict);
            }
            if (d.dictName === 'ID_TYPE') {
               self.dist.idTypeDist = transformDict(d.dict);
            }
            if (d.dictName === 'EMPLOYEE_SOURCE') {
               self.dist.employeeSource = transformDict(d.dict);
            }
            if (d.dictName === 'OVERTIME_CLASSIFICATION') {
               self.dist.overtimeValid = transformDict(d.dict);
            }

        }
      });
      // 员工自助查看时
      if (this.isMyProfile) {
        this.isMyProfile = true;
        this.$http.get('/employee/employees/getEmployeeId').then((response) => {
          this.employeeId = response.data.employeeId;
          var employementCategory = response.data.employementCategory;
          this.$refs.employeecommoninfo.getData(this.employeeId);
          this.setEmployementCategory(employementCategory);
        })
      } else {
        this.getData();
      }
    },
    watch: {
      'employeeInfo.employementCategory': function(newVal) {
        this.setEmployementCategory(newVal);
      }
    },
    mounted() {
      this.perInfo = this.internsPerSchema.newModel();
      this.perContact = this.perContactSchema.newModel();
      this.family = this.familySchema.newModel();
      this.bank = this.bankSchema.newModel();
      this.jobInfo = this.jobSchema.newModel();
      this.training = this.trainingSchema.newModel();
      this.edu = this.eduSchema.newModel();
      this.skill = this.skillSchema.newModel();
      this.exp = this.expSchema.newModel();
      this.contract = this.contractSchema.newModel();
    },
    
    methods: {
      openSelector(selector) {
        this.$refs[selector].open();
      },
      isEmail(value) {
        return !value || /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(value);
      },
      changeHomeCountry(val, changeState) {
        if (!changeState) {
          this.perContact.homeState = '';
        }
        if (val === undefined || val === '' || val === null) {
          this.dist.homeStateMapping = {};
          return;
        }
        this.$http.get(`/org/area/${val}/child`).then((response) => {
            if (response.data) {
                let result = {},
                    datas = response.data;
                for (var i = 0, l = datas.length; i < l; i++) {
                    result[datas[i].areaName] = datas[i].areaId;
                }
                this.dist.homeStateMapping = result;
            }
        });
      },
      changeWorkCountry(val, changeState) {
        if (!changeState) {
          this.perContact.workState = '';
        }
        if (val === undefined || val === '' || val === null) {
          this.dist.workStateMapping = {};
          return;
        }
        this.$http.get(`/org/area/${val}/child`).then((response) => {
            if (response.data) {
                let result = {},
                    datas = response.data;
                for (var i = 0, l = datas.length; i < l; i++) {
                    result[datas[i].areaName] = datas[i].areaId;
                }
                this.dist.workStateMapping = result;
            }
        });
      },
      getDistArea() {
        var self = this;
        if (Object.keys(self.dist.area).length > 0) {
          return;
        }
        this.$http.get('/org/area/0/child').then((response) => {
            this.treeArea = response.data;
            if (response.data) {
                let result = {},
                    datas = response.data;
                for (var i = 0, l = datas.length; i < l; i++) {
                    result[datas[i].areaName] = datas[i].areaId;
                }
                self.dist.area = result;
            }
        });
      },
      changeTemplate(value) {
        if (value) {
          this.setAreaTemplate(value);
        }
      },
      setEmployementCategory(employementCategory) {
        if (employementCategory === '7') {
          this.isEmployee = false;
          this.isOutsource = false;
          this.isInterns = true;
        } else if (employementCategory === '6') {
          this.isEmployee = false;
          this.isInterns = false;
          this.isOutsource = true;
        }
        this.getData();
      },
      getData() {
        this.$http.get('/employee/employees/' + this.employeeId + '/FamilyMember?pageSize=9999&pageIndex=1').then(function(res) {
          this.familyList = res.data.data;
        });
        this.$http.get('/employee/employees/' + this.employeeId + '/Contacts').then(function(res) {
          this.perContactTemp = res.data;
          Object.assign(this.perContact, this.perContactTemp);
        });
        this.$http.get('/employee/employeeBankTax/bankTax/' + this.employeeId).then(function(res) {
          if (res.data) {
            this.bankTemp = res.data;
          }
        });
        this.$http.get('/employee/employees/' + this.employeeId + '/Education?pageSize=9999&pageIndex=1').then(function(res) {
            var data = res.data.data;
            for(var i = 0, len = data.length; i < len; i++) {
              data[i].graduationDate = formatDate(new Date(data[i].graduationDate));
              data[i].admissionDate = formatDate(new Date(data[i].admissionDate));
            }
            this.arrSort(data, 'admissionDate');
            this.eduList = data;
        });
      },
      edit(name, index) {
        if (this.show[name]) {
          return;
        }
        this.show[name] = true;
        switch (name) {
          case 'perInfo':
            this.getDistArea();
            Object.assign(this.perInfo, this.employeeInfo);
            break;
          case 'idInfo':
            this.insertNode('id', index);
            this.idFileName = this.employeeInfo.dictPassportList[index].attachmentName;
            Object.assign(this.id, this.employeeInfo.dictPassportList[index]);
            break;
          case 'jobInfo':
            Object.assign(this.jobInfo, this.employeeInfo);
            break;
          case 'perContact':
            this.changeHomeCountry(this.perContactTemp.homeCountry, true);
            this.changeWorkCountry(this.perContactTemp.workCountry, true);
            this.getDistArea();
            Object.assign(this.perContact, this.perContactTemp);
            break;
          case 'familyInfo':
            this.insertNode('family', index);
            Object.assign(this.family, this.familyList[index]);
            break;
          case 'bankInfo':
            this.bank.reset();
            Object.assign(this.bank, this.bankTemp);
            break;
          case 'trainingInfo':
            this.insertNode('training', index);
            Object.assign(this.training, this.trainingList[index]);
            break;
          case 'eduInfo':
            this.insertNode('edu', index);
            Object.assign(this.edu, this.eduList[index]);
            break;
          case 'skillInfo':
            this.insertNode('skill', index);
            Object.assign(this.skill, this.skillList[index]);
            break;
          case 'expInfo':
            this.insertNode('exp', index);
            Object.assign(this.exp, this.expList[index]);
            break;
          case 'contractInfo':
            this.contract.reset();
            Object.assign(this.contract, this.contractTemp);
            break;
          case 'additionalInfo':
            var detailsList = this.detailsList;
            this.additionalList.forEach(function(item) {
              var obj = {};
              obj[item.label] = item.mappingValue || item.value;
              Object.assign(detailsList, obj);
            });
            break;
        }
      },
      add(name) {
        this.show[name] = true;
        switch (name) {
          case 'idInfo':
            this.insertNode('id');
            break;
          case 'familyInfo':
            this.insertNode('family');
            break;
          case 'trainingInfo':
            this.insertNode('training');
            break;
          case 'eduInfo':
            this.insertNode('edu');
            break;
          case 'skillInfo':
            this.insertNode('skill');
            break;
          case 'expInfo':
            this.insertNode('exp');
            break;
        }
      },
      insertNode(text, index) {
        var curIndex = index;
        var nodeIndex = index;
        if (index === undefined) {
          curIndex = -1;
          nodeIndex = 0;
        }
        this.index[text] = curIndex;
        this.show[text + 'Info'] = true;
        this[text].reset();
        var el = this.$refs[text + 'form'].$el.parentNode;
        var list = document.getElementsByClassName(text + '-tab')[0];
        var node = list.getElementsByClassName(text + '-list')[nodeIndex];
        if (node) {
          list.insertBefore(el, node);
        }
        if (index !== undefined) {
          node.style.display = 'none';
        }
      },
      del(name, index) {
        this.delName = name;
        this.delIndex = index;
        this.showdel = true;
      },
      delList() {
        var item = {};
        var finalData = {};
        switch(this.delName) {
          case 'idInfo':
            var passportList = this.getIdList();
            passportList.splice(this.delIndex, 1);
            item['dictEducationList'] = this.getEducationList();
            item['dictPassportList'] = passportList;
            Object.assign(finalData, this.replaceData(this.internsPerData, this.employeeInfo));
            Object.assign(finalData, this.replaceData(this.jobData, this.employeeInfo));
            convert(item, finalData, "", true);
            this.$http.put('/employee/employees/' + this.employeeId, finalData, {
                emulateJSON: true
            }).then(function(res) {
              this.$refs.employeecommoninfo.getData(this.employeeId);
              this.deleteSuccess();
            })
            break;
          case 'familyInfo':
            this.$http.delete('/employee/employees/'+this.employeeId+'/FamilyMember/'+this.familyList[this.delIndex].familyMemberId).then(function(){
              this.familyList.splice(this.delIndex, 1);
              this.deleteSuccess();
            });
            break;
          case 'trainingInfo':
            this.$http.delete('/employee/employees/'+this.employeeId+'/Training/'+this.trainingList[this.delIndex].trainingId).then(function(){
              this.trainingList.splice(this.delIndex, 1);
              this.deleteSuccess();
            })
            break;
          case 'skillInfo':
            this.$http.delete('/employee/employees/'+this.employeeId+'/Skill/'+this.skillList[this.delIndex].skillId).then(function(){
              this.skillList.splice(this.delIndex, 1);
              this.deleteSuccess();
            })
            break;
          case 'expInfo':
            this.$http.delete('/employee/employees/'+this.employeeId+'/WorkExperience/'+this.expList[this.delIndex].workHistoryId).then(function(){
              this.expList.splice(this.delIndex, 1);
              this.deleteSuccess();
            })
            break;
          case 'eduInfo':
            var eduListArr = this.getEducationList();
            eduListArr.splice(this.delIndex, 1);
            item['dictEducationList'] = eduListArr;
            item['dictPassportList'] = this.getIdList();
            Object.assign(finalData, this.replaceData(this.internsPerData, this.employeeInfo));
            Object.assign(finalData, this.replaceData(this.jobData, this.employeeInfo));
            convert(item, finalData, "", true);
            this.$http.put('/employee/employees/' + this.employeeId, finalData, {
                emulateJSON: true
            }).then(function(res) {
              this.eduList.splice(this.delIndex, 1);
              this.deleteSuccess();
            })
            break;
        }
      },
      saveSuccess() {
        Message({type:'success',message:this.$t('common.saveSuccess')});
      },
      deleteSuccess() {
        Message({type:'success',message:this.$t('common.deleteSuccess')});
      },
      submitForm(name) {
        var data = {};
        var index = -1;
        var passed = true;
        var item = {};
        var finalData = {};
        switch (name) {
          case 'idInfo':
            switch (this.id.idType) {
              // 中国身份证
              case '1':
                if(this.id.idNumber.length < 15 || this.id.idNumber.length > 18) {
                  this.idNumberValiate = false;
                }
                break;
              // 越南身份证
              case '4':
                if(this.id.idNumber.length !== 12 && this.id.idNumber.length !== 9) {
                  this.idNumberValiate = false;
                }
                break;
            }
            passed = this.$refs.idform.isFormValidate();
            this.idNumberValiate = true;
            if (!passed) {
              return;
            }
            this.loading.idInfo = true;
            var passportList = this.getIdList();
            data = {
              idType: this.id.idType,
              idNumber: this.id.idNumber
            };
            if (this.id.idIssueDate) {
              data.idIssueDate = formatDate(new Date(this.id.idIssueDate));
            }
            if (this.id.idExpiredDate) {
              data.idExpiredDate = formatDate(new Date(this.id.idExpiredDate));
            }
            data.attachmentId = this.id.attachmentId;
            data.mainDocuments = this.id.mainDocuments || 0;
            index = this.index.id;

            var hasPrimaryID = false;
            passportList.forEach(function(item) {
              if (data.mainDocuments === '1') {
                item.mainDocuments = '0';
              } else if (item.mainDocuments === '1') {
                hasPrimaryID = true;
              }
            })
            if (!hasPrimaryID) {
              data.mainDocuments = '1';
            }

            if (index === -1) {
              passportList.push(data);
            } else {
              Object.assign(passportList[index], data);
            }
            item['dictPassportList'] = passportList;
            item['dictEducationList'] = this.getEducationList();
            Object.assign(data, this.replaceData(this.internsPerData, this.employeeInfo));
            Object.assign(data, this.replaceData(this.jobData, this.employeeInfo));
            data.employeeId = this.employeeId;
            convert(item, data, "", true);
            this.$http.put('/employee/employees/' + this.employeeId, data, {
                emulateJSON: true
            }).then(function(res) {
                this.idFileName = '';
                this.loading.idInfo = false;
                this.$refs.employeecommoninfo.getData(this.employeeId);
                this.show.idInfo = false;
                this.index.id = -1;
                this.saveSuccess();
            }, function() {
              this.loading.idInfo = false;
            });
            break;
          case 'perInfo':
            passed = this.$refs.perinfoform.isFormValidate();
            if (!passed) {
              return;
            }
            this.loading.perInfo = true;
            item['dictPassportList'] = this.getIdList();
            item['dictEducationList'] = this.getEducationList();
            data = this.replaceData(this.internsPerData, this.perInfo);
            data.birthDate = formatDate(new Date(data.birthDate));
            Object.assign(data, this.replaceData(this.jobData, this.employeeInfo));
            data.employeeId = this.employeeId;
            convert(item, data, "", true);
            this.$http.put('/employee/employees/' + this.employeeId, data, {
                emulateJSON: true
            }).then(function(res) {
                this.loading.perInfo = false;
                this.$refs.employeecommoninfo.getData(this.employeeId);
                this.show.perInfo = false;
                Object.assign(this.employeeInfo, this.perInfo);
                this.saveSuccess();
            }, function() {
              this.loading.perInfo = false;
            });
            break;
          case 'jobInfo':
            passed = this.$refs.jobform.isFormValidate();
            if (!passed) {
              return;
            }
            this.loading.jobInfo = true;
            item['dictPassportList'] = this.getIdList();
            item['dictEducationList'] = this.getEducationList();
            data = this.replaceData(this.jobData, this.jobInfo);
            Object.assign(data, this.replaceData(this.perInfo, this.employeeInfo));
            data.employeeId = this.employeeId;
            convert(item, data, "", true);
            this.$http.put('/employee/employees/' + this.employeeId, data, {
                emulateJSON: true
            }).then(function(res) {
                this.loading.jobInfo = false;
                this.show.jobInfo = false;
                Object.assign(this.employeeInfo, this.jobInfo);
                this.saveSuccess();
            }, function() {
              this.loading.jobInfo = false;
            });
            break;
          case 'perContact':
            this.personalEmail = this.isEmail(this.perContact.personalEmail);
            this.workEmail = this.isEmail(this.perContact.workEmail);
            passed = this.$refs.percontactform.isFormValidate();
            if (!passed) {
              this.personalEmail = true;
              this.workEmail = true;
              return;
            }
            var contactsId = this.perContactTemp.contactsId;
            data = this.replaceData(this.perContactData, this.perContact);
            if (!contactsId) {
              convert({}, data, "", true);
              this.$http.post('/employee/employees/' + this.employeeId + '/Contacts', data, {
                  emulateJSON: true
              }).then(function(res) {
                this.$refs.employeecommoninfo.getData(this.employeeId);
                Object.assign(this.perContactTemp, this.perContact);
                this.perContactTemp.workCountryName = this.fixDist(this.perContact.workCountry, 'area');
                this.perContactTemp.workStateName = this.fixDist(this.perContact.workState, 'workStateMapping');
                this.perContactTemp.homeCountryName = this.fixDist(this.perContact.homeCountry, 'area');
                this.perContactTemp.homeStateName = this.fixDist(this.perContact.homeState, 'homeStateMapping');
                this.show.perContact = false;
                this.perContactTemp.contactsId = res.body;
                this.saveSuccess();
              });
            } else {
              data.contactsId = contactsId;
              convert({}, data, "", true);
              this.$http.put('/employee/employees/' + this.employeeId + '/Contacts/' + contactsId, data, {
                  emulateJSON: true
              }).then(function(res) {
                this.$refs.employeecommoninfo.getData(this.employeeId);
                Object.assign(this.perContactTemp, this.perContact);
                this.perContactTemp.workCountryName = this.fixDist(this.perContact.workCountry, 'area');
                this.perContactTemp.workStateName = this.fixDist(this.perContact.workState, 'workStateMapping');
                this.perContactTemp.homeCountryName = this.fixDist(this.perContact.homeCountry, 'area');
                this.perContactTemp.homeStateName = this.fixDist(this.perContact.homeState, 'homeStateMapping');
                this.show.perContact = false;
                this.saveSuccess();
              });
            }
            break;
          case 'familyInfo':
            passed = this.$refs.familyform.isFormValidate();
            if (!passed) {
              return;
            }
            index = this.index.family;
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
                this.show.familyInfo = false;
                data.familyMemberId = res.body;
                this.familyList.push(data);
                this.saveSuccess();
              });
            } else {
              data.familyMemberId = this.familyList[index].familyMemberId;
              this.$http.put('/employee/employees/'+this.employeeId +'/FamilyMember/'+ data.familyMemberId,data,{
                  emulateJSON: true
              }).then(function(){
                this.show.familyInfo = false;
                Object.assign(this.familyList[index], this.family);
                document.getElementsByClassName('family-list')[index].style.display = 'block';
                this.saveSuccess();
              });
            }
            break;
          case 'bankInfo':
            passed = this.$refs.bankform.isFormValidate();
            if (!passed) {
              return;
            }
            var bankTaxId = this.bankTemp.bankTaxId;
            data = {
              employeeId: this.employeeId,
              brakName: this.bank.brakName,
              bankHolder: this.bank.bankHolder,
              bankNumber: this.bank.bankNumber,
              medicareNumber: this.bank.medicareNumber,
              taxableNumber: this.bank.taxableNumber
            }
            if (bankTaxId) {
              //WXY更新
              data.bankTaxId = bankTaxId;
              this.$http.put('/employee/employeeBankTax/' + bankTaxId, data, {
                  emulateJSON: true
              }).then(function(res) {
                this.show.bankInfo = false;
                Object.assign(this.bankTemp, this.bank);
                this.saveSuccess();
              });
            } else {
              //WXY新增
              this.$http.post('/employee/employeeBankTax/', data, {
                  emulateJSON: true
              }).then(function(res) {
                this.show.bankInfo = false;
                Object.assign(this.bankTemp, this.bank);
                this.bankTemp.bankTaxId = res.body;
                this.saveSuccess();
              });
            }
            break;
          case 'trainingInfo':
            passed = this.$refs.trainingform.isFormValidate();
            if (!passed) {
              return;
            }
            index = this.index.training;
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
                this.show.trainingInfo = false;
                data.trainingId = res.body;
                this.trainingList.push(data);
                this.arrSort(this.trainingList, 'startDate');
                this.saveSuccess();
              });
            } else {
              data.trainingId = this.trainingList[index].trainingId;
              this.$http.put('/employee/employees/'+this.employeeId+'/Training/'+data.trainingId,data,{
                  emulateJSON: true
              }).then(function(){
                this.show.trainingInfo = false;
                Object.assign(this.trainingList[index], this.training);
                document.getElementsByClassName('training-list')[index].style.display = 'block';
                this.arrSort(this.trainingList, 'startDate');
                this.saveSuccess();
              });
            }
            break;
          case 'eduInfo':
            passed = this.$refs.eduform.isFormValidate();
            if (!passed) {
              return;
            }
            this.loading.eduInfo = true;
            index = this.index.edu;
            var eduListArr = this.getEducationList();
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
            Object.assign(finalData, this.replaceData(this.perInfo, this.employeeInfo));
            if (index === -1) {
              eduListArr.push(data);
            } else {
              Object.assign(eduListArr[index], data);
            }
            item['dictEducationList'] = eduListArr;
            item['dictPassportList'] = this.getIdList();
            finalData.employeeId = this.employeeId;
            convert(item, finalData, "", true);
            this.$http.put('/employee/employees/' + this.employeeId, finalData, {
                emulateJSON: true
            }).then(function(res) {
                this.loading.eduInfo = false;
                this.show.eduInfo = false;
                this.eduList.splice(0, this.eduList.length);
                this.eduList = this.eduList.concat(eduListArr);
                if (index !== -1) {
                  document.getElementsByClassName('edu-list')[index].style.display = 'block';
                }
                this.arrSort(this.eduList, 'admissionDate');
                this.saveSuccess();
            },function() {
                this.loading.eduInfo = false;
            });
            break;
          case 'skillInfo':
            passed = this.$refs.skillform.isFormValidate();
            if (!passed) {
              return;
            }
            data = {
              employeeId: this.employeeId,
              skillLevel: this.skill.skillLevel,
              skillType: this.skill.skillType
            };
            index = this.index.skill;
            if (index === -1) {
              this.$http.post('/employee/employees/'+this.employeeId+'/Skill',data,{
                  emulateJSON: true
              }).then(function(res){
                this.show.skillInfo = false;
                data.skillId = res.body;
                this.skillList.push(data);
                this.saveSuccess();
              });
            } else {
              data.skillId = this.skillList[index].skillId;
              this.$http.put('/employee/employees/'+this.employeeId+'/Skill/'+data.skillId,data,{
                  emulateJSON: true
              }).then(function(){
                this.show.skillInfo = false;
                Object.assign(this.skillList[index], this.skill);
                document.getElementsByClassName('skill-list')[index].style.display = 'block';
                this.saveSuccess();
              });
            }
            break;
          case 'expInfo':
            passed = this.$refs.expform.isFormValidate();
            if (!passed) {
              return;
            }
            this.exp.startDate = formatDate(new Date(this.exp.startDate));
            this.exp.endDate = formatDate(new Date(this.exp.endDate));
            data = {
              employeeId: this.employeeId,
              positionName: this.exp.positionName,
              company: this.exp.company,
              startDate: this.exp.startDate,
              endDate: this.exp.endDate,
              witness: this.exp.witness,
              witnessContact: this.exp.witnessContact
            };
            index = this.index.exp;
            if (index === -1) {
              this.$http.post('/employee/employees/'+this.employeeId+'/WorkExperience',data,{
                  emulateJSON: true
              }).then(function(res){
                this.show.expInfo = false;
                data.workHistoryId = res.body;
                this.expList.push(data);
                this.arrSort(this.expList, 'startDate');
                this.saveSuccess();
              });
            } else {
              data.workHistoryId = this.expList[index].workHistoryId;
              this.$http.put('/employee/employees/'+this.employeeId+'/WorkExperience/'+data.workHistoryId,data,{
                  emulateJSON: true
              }).then(function(){
                this.show.expInfo = false;
                Object.assign(this.expList[index], this.exp);
                document.getElementsByClassName('exp-list')[index].style.display = 'block';
                this.arrSort(this.expList, 'startDate');
                this.saveSuccess();
              });
            }
            break;
          case 'contractInfo':
            if (this.contract.contractLength === '2') {
              this.contract.endDate = formatDate(new Date());
            }
            passed = this.$refs.contractform.isFormValidate();
            if (this.contract.contractLength === '2') {
              this.contract.endDate = '';
            }
            if (!passed) {
              return;
            }
            var contractId = this.contractTemp.contractId;
            var data = {
              employeeId: this.employeeId,
              contractNo: this.contract.contractNo || '',
              contractType: this.contract.contractType,
              startDate: formatDate(new Date(this.contract.startDate)),
              endDate: formatDate(new Date(this.contract.endDate)),
              contractLength: this.contract.contractLength,
              contractSubject: this.contract.contractSubject,
              isConfidentia: this.contract.isConfidentia,
              isNonCompetition: this.contract.isNonCompetition,
              confidentiaAgreement: this.contract.confidentiaAgreement || ''
            };
            if (contractId) {
        			//WXY更新
              data.contractId = contractId;
              this.contractFile.url = Vue.config.APIURL + '/employee/employees/' + this.employeeId + '/Contract/update';
        			// this.$http.post('/employee/employees/' + this.employeeId + '/Contract/' + contractId, formData).then(function(res) {
              //   this.show.contractInfo = false;
              //   this.getContract();
        			// 	this.saveSuccess();
        			// });
        		} else {
        			//WXY新增
              this.contractFile.url = Vue.config.APIURL + '/employee/employees/' + this.employeeId + '/Contract/';
        			// this.$http.post('/employee/employees/' + this.employeeId + '/Contract/' , formData).then(function(res) {
              //   this.show.contractInfo = false;
        			// 	this.contractTemp.contractId = res.body;
              //   this.getContract();
        			// 	this.saveSuccess();
        			// });
        		}
            var upload = this.$refs.upload;
            upload.request = {
              data: data
            };
            this.$refs.upload.active = true;
            break;
          case 'additionalInfo':
            passed = this.$refs.areatemplate.isFormValidate();
            if (!passed) {
              return;
            }
            passed = this.$refs.areaform.isFormValidate();
            if (!passed) {
              return;
            }
            data = this.replaceData(this.detailsListData, this.detailsList);
            data.employeeId = this.employeeId;
            data.areaTemplateId = this.template.templateArea;
          	this.$http.post('/employee/employees/empAreaTemplates', data, {
                emulateJSON: true
            }).then(function(res) {
              var detailsList = this.detailsList;
              this.show.additionalInfo = false;
              this.templateArea = this.template.templateArea;
              this.additionalData = detailsList;
              this.additionalList.forEach(function(item) {
                item.value = detailsList[item.label];
              });
          		this.saveSuccess();
          	});
            break;
        }
      },
      cancel(name) {
        this.show[name] = false;
        switch (name) {
          case 'idInfo':
            if (this.index.id !== -1) {
              document.getElementsByClassName('id-list')[this.index.id].style.display = 'block';
            }
            this.index.id = -1;
            break;
          case 'familyInfo':
            if (this.index.family !== -1) {
              document.getElementsByClassName('family-list')[this.index.family].style.display = 'block';
            }
            this.index.family = -1;
            break;
          case 'trainingInfo':
            if (this.index.training !== -1) {
              document.getElementsByClassName('training-list')[this.index.training].style.display = 'block';
            }
            this.index.training = -1;
            break;
          case 'eduInfo':
            if (this.index.edu !== -1) {
              document.getElementsByClassName('edu-list')[this.index.edu].style.display = 'block';
            }
            this.index.edu = -1;
            break;
          case 'skillInfo':
            if (this.index.skill !== -1) {
              document.getElementsByClassName('skill-list')[this.index.skill].style.display = 'block';
            }
            this.index.skill = -1;
            break;
          case 'expInfo':
            if (this.index.exp !== -1) {
              document.getElementsByClassName('exp-list')[this.index.exp].style.display = 'block';
            }
            this.index.exp = -1;
            break;
          case 'additionalInfo':
            this.setAreaTemplate(this.templateArea, this.additionalData);
            break;
        }
      },
      getEducationList() {
        var eduListArr = [];
        var eduList = this.eduList;
        for (var i = 0, len = eduList.length; i < len; i++) {
          var obj = {};
          obj.institution = eduList[i].institution;
          obj.major = eduList[i].major;
          obj.admissionDate = formatDate(new Date(eduList[i].admissionDate));
          obj.graduationDate = formatDate(new Date(eduList[i].graduationDate));
          obj.educationLevel = eduList[i].educationLevel;
          obj.certificateNumber = eduList[i].certificateNumber;
          obj.learnType = eduList[i].learnType;
          if (this.edu.isTopGrade === '1') {
            obj.isTopGrade = '2';
          } else {
            obj.isTopGrade = eduList[i].isTopGrade;
          }
          obj.grade = eduList[i].grade;
          eduListArr.push(obj);
        }
        return eduListArr;
      },
      selectMentor(value) {
          if (value && value instanceof Array) {
              let tempNames = [],
                  tempIds = [];
              for (let index of value.keys()) {
                  tempNames.push(value[index].employeeName);
                  tempIds.push(value[index].employeeId);
              }
              this.jobInfo.mentor = tempNames.join(',');
          }
      },
      // 获得要提交的数据字段，删除不需要的
      replaceData(obj, newObj) {
        var data = {};
        for (let key of Object.keys(obj)) {
          if (newObj.hasOwnProperty(key) && newObj[key] !== undefined) {
            data[key] = newObj[key];
          }
        }
        return data;
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
      // 对数组排序
      arrSort(arr, key) {
        arr.sort(function(a, b) {
          return b[key] > a[key] ? 1 : -1;
        })
      },
      // 格式化时间
      format(value) {
        if (!value) {
          return;
        }
        return formatDate(new Date(value));
      },
      changeFile(e, fileName) {
        var srcElement__src = e.srcElement.files;
        var files = Array.prototype.slice.call(srcElement__src, 0);
        if (!this.checkFileSize(files)) {
          return;
        }
        switch (fileName) {
          case 'confidentiaAgreement':
            this.file.confidentiaAgreementFile = files;
            break;
          case 'nonCompetitionAgreement':
            this.file.nonCompetitionAgreementFile = files;
            break;
        }
      },
      changeConFile(e) {
        var srcElement__src = e.srcElement.files;
        var files = Array.prototype.slice.call(srcElement__src, 0);
        if (!this.checkFileSize(files)) {
          return;
        }
        this.file.confidentiaAgreementFile = files;
      },
      delConFile() {
        this.file.confidentiaAgreementFile = [];
        this.contract.confidentiaAgreement = '';
        this.contract.confidentiaAgreementName = '';
        this.$refs.upload.files = [];
      },
      changeNonConFile(e) {
        var srcElement__src = e.srcElement.files;
        var files = Array.prototype.slice.call(srcElement__src, 0);
        if (!this.checkFileSize(files)) {
          return;
        }
        this.file.nonConfidentiaAgreementFile = files;
      },
      delNonConFile() {
        this.file.nonConfidentiaAgreementFile = [];
        this.contract.nonConfidentiaAgreement = '';
      },
      delIdFile() {
        this.id.attachmentId = '';
        this.idFileName = '';
      },
      checkFileSize(files) {
        var validate = true;
        if (files) {
          files.forEach(function(item) {
            if (item.size >= 2*1024*1024) {
              validate = false;
            }
          })
        }
        if (!validate) {
          Message({type: 'error', message: this.$t('staff.message.fileUploadSize')});
        }
        return validate;
      },
      downFile(file) {
        var attachmentId = '';
        if (file === 'confidentiaAgreement') {
          attachmentId = this.contractTemp.confidentiaAgreement;
        } else if (file === 'nonCompetitionAgreement') {
          attachmentId = this.contractTemp.nonCompetitionAgreement;
        } else {
          attachmentId = this.employeeInfo.dictPassportList[file].attachmentId;
        }
        downloadFile('/system/attachment/downloadFile', {attachmentId: attachmentId});
      },
      getProfessionalInfo() {
        this.$http.get('/employee/employees/' + this.employeeId + '/Training?pageSize=9999&pageIndex=1').then(function(res) {
          var data = res.data.data;
          for(var i = 0, len = data.length; i < len; i++) {
            data[i].startDate = formatDate(new Date(data[i].startDate));
            data[i].endDate = formatDate(new Date(data[i].endDate));
          }
          this.arrSort(data, 'startDate');
          this.trainingList = data;
        });
        this.$http.get('/employee/employees/' + this.employeeId + '/Skill?pageSize=9999&pageIndex=1').then(function(res) {
            this.skillList = res.data.data;
        });
      },
      getExpInfo() {
        this.$http.get('/employee/employees/' + this.employeeId + '/WorkExperience?pageSize=10&pageIndex=1').then(function(res) {
            var data = res.data.data;
            for(var i = 0, len = data.length; i < len; i++) {
              data[i].startDate = formatDate(new Date(data[i].startDate));
              data[i].endDate = formatDate(new Date(data[i].endDate));
            }
            this.arrSort(data, 'startDate');
            this.expList = data;
        });
        this.getContract();
      },
      getContract() {
        this.$http.get('/employee/employees/' + this.employeeId + '/Contract').then(function(res) {
          this.contractTemp = res.data;
        });
      },
      selectPlaceBirth(node, el) {
        if (node.areaName) {
          this.perInfo.placeBirth = node.areaId;
          this.perInfo.placeBirthName = node.areaName;
          while (el.level && el.level !== 0) {
            el = el.$parent;
            this.perInfo.placeBirthName = el.label + ',' + this.perInfo.placeBirthName;
          }
        }
      },
      getIdDate(list, type) {
        if (!list) {
          return;
        }
        var result = '';
        for(var i = 0, len = list.length; i < len; i++) {
          if (list[i].mainDocuments === '1') {
            if (type === 'IssueDate') {
              result = list[i].idIssueDate;
              break;
            } else if (type === 'ExpiryDate') {
              result = list[i].idExpiredDate;
              break;
            }
          }
        }
        return result;
      },
      setAreaTemplate(areaTemplateId, assignData) {
        // 读取模板数据
        if (!areaTemplateId) {
          return;
        }
        this.$http.post('/area/template/getAreaTemplateById?areaTemplateId=' + areaTemplateId).then(function(response) {
          var data = response.data;
          if (data) {
            var self = this;
            var additionalList = this.additionalList;
            additionalList.splice(0, additionalList.length);
            data.areaTemplateDetails.forEach(function(item) {
                if (item.isShow === 'Y') {
                  self.detailsListData[item.fieldName] = {
                    label: item.fieldBusinessName,
                    required: item.isMustFill === 'Y' && item.isShow === 'Y' ? true : false
                  }
                  var obj = {};
                  obj.name = item.fieldBusinessName;
                  obj.label = item.fieldName;
                  var value = assignData ? assignData[item.fieldName] : '';
                  if (item.dataDictionary && item.fieldType === '1') {
                    obj.dataDictionary = item.dataDictionary;
                    var mapping = getDictMapping(item.dataDictionary)
                    self.detailsListData[item.fieldName].mapping = function() {
                      return mapping;
                    }
                    obj.mappingValue = data[item.fieldName];
                    mapping.then(function(dist) {
                      obj.dist = dist;
                      obj.value = value;
                      additionalList.push(obj);
                    })
                  } else {
                    obj.value = value;
                    additionalList.push(obj);
                  }
                }
            })
            this.detailsListSchema = new Schema(self.detailsListData);
            this.detailsList = this.detailsListSchema.newModel();
            this.areaTemplateDetails = data.areaTemplateDetails;
            if (assignData) {
              Object.assign(this.detailsList, assignData);
            }
          }
        })
      },
      getDisableValue(index) {
        var arr = [];
        var list = this.employeeInfo.dictPassportList;
        if (!list) {
          return;
        }
        list.forEach(function(item, idx){
          if ((item.idType || item.idType === '0') && index !== idx) {
            arr.push(item.idType);
          }
        })
        return arr;
      },
      getIdList() {
        var idList = this.employeeInfo.dictPassportList;
        var idListArr = [];
        for (let i = 0, len = idList.length; i < len; i++) {
          let obj = {};
          obj.idType = idList[i].idType;
          obj.idNumber = idList[i].idNumber;
          if (idList[i].idIssueDate) {
            obj.idIssueDate = formatDate(new Date(idList[i].idIssueDate));
          }
          if (idList[i].idExpiredDate) {
            obj.idExpiredDate = formatDate(new Date(idList[i].idExpiredDate));
          }
          if (idList[i].attachmentId) {
            obj.attachmentId = idList[i].attachmentId;
          }
          obj.mainDocuments = idList[i].mainDocuments || 0;
          idListArr.push(obj);
        }
        return idListArr;
      },
      changeLength(value) {
        if (value === '2') {
          this.contract.endDate = undefined;
        }
      },
      tabChange(tabId) {
        switch (tabId) {
          case 'professional-info':
            this.getProfessionalInfo();
            break;
          case 'job-info':
            this.getExpInfo();
            this.tableUrl.partTimeUrl = '/employee/employees/' + this.employeeId +'/partTime';
            break;
          case 'work-exp':
            this.getExpInfo();
            this.tableUrl.disExpUrl = '/employee/employees/'+ this.employeeId + '/expatriation';
            this.tableUrl.proRecUrl = '/employee/employees/'+ this.employeeId + '/transfer/1';
            this.tableUrl.traRecUrl = '/employee/employees/'+ this.employeeId + '/transfer/2';
            break;
          case 'additional-info':
          var employementCategory;
          if (this.isInterns) {
            employementCategory = 7;
          } else if (this.isOutsource) {
            employementCategory = 6;
          } else {
            employementCategory = 9;
          }
          this.$http.get('/area/template/active?employementCategory=' + employementCategory).then(function(response) {
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
            this.$http.get('/employee/employees/empAreaTemplates/' + this.employeeId).then(function(res) {
              var data = res.data;
              if (!data.areaTemplateId) {
                return;
              }
              this.templateArea = data.areaTemplateId;
              this.additionalData = res.data;
              this.areaTemplateId = data.areaTemplateId;
              this.template.templateArea = data.areaTemplateId;
              this.setAreaTemplate(data.areaTemplateId, data);
            });
            break;
        }
      },
      addFileUpload(file, component) {
        if (this.files.auto && component.name === 'file') {
          component.active = true;
        } else {
          this.contract.confidentiaAgreementName = file.name;
          this.contract.confidentiaAgreement = '';
        }
      },
      afterFileUpload(file, component) {
        if (component.name === 'file') {
          this.id.attachmentId = file.data;
          this.id.attachmentName = file.name;
          this.idFileName = file.name;
        } else {
          if(!this.contractTemp.contractId) {
            this.contractTemp.contractId = file.data;
          }
          this.$refs.upload.active = false;
          this.$refs.upload.files = [];
          this.show.contractInfo = false;
          this.getContract();
          this.saveSuccess();
        }
      }
    },
    components: {
        EmployeeCommonInfo: require('./employeeCommonInfo.vue'),
        InputFile: require('./input-file.vue'),
        FileUpload: require('../../components/basic/FileUpload.vue')
    }
};
</script>
