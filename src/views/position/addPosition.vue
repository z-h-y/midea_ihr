<style lang="less">

.ihr-position-addPosition {
    * {
        box-sizing: border-box;
    }
    position: relative;
    .panel-b {
        padding-bottom: 88px;
    }
    .field-content {
        padding-right: 0;
    }
    .dottedList-label {
        float: left;
        margin-right: 8px;
        color: #545454;
        width: 118px;
        text-align: right;
    }
    .dottedList {
        width: 400px;
        margin: 0 0 0 128px;
        position: relative;
    }
    .w202 {
        width: 202px;
    }
    .dotted-report-line {
        padding: 0 0 0 105px;
        position: relative;
        width: 638px;
        > label {
            display: none;
        }
        .fa-f16() {
            font-size: 16px;
        }
        .icon-area-plus {
            position: absolute;
            right: -40px;
            top: 0;
            .fa {
                .fa-f16;
            }
        }
        .icon-area-trash {
            position: absolute;
            right: -55px;
            top: 0;
            .fa {
                .fa-f16;
            }
        }
    }
    .positionName::after {
        content: '*';
        color: #ed5565;
        margin-right: 2px;
        margin-left: 4px;
        vertical-align: sub;
    }
    .standardJobName .field-hint {
        width: 230px;
    }
    .unintName {
        .inrement-text {
            white-space: nowrap;
            text-overflow: ellipsis;
            width: 400px;
            overflow: hidden;
        }
    }
    .dottedList .fa-close {
        position: absolute;
        top: 8px;
        right: 15px;
        cursor: pointer;
    }
    .posFaTh {
        width: 20px;
        height: 25px;
        position: absolute;
        top: 4px;
        right: 2px;
        cursor: pointer;
        background: url("../../assets/images/public/transparent.png") no-repeat center center;
    }
    .parentPositionName {
        width: 637px;
    }
    .org-form {
        width: 710px;
    }
    .hide-text-editor {
        position: relative;
        height: 44px;
        // label {
        //     display: none;
        // }
        .field-content {
            margin-left: 0!important;
        }
        .text-editor {
            display: none;
        }
    }
    .btn-file {
        width: 88px;
        height: 36px;
        position: relative;
        overflow: hidden;
    }
    .upload {
        width: 88px;
        .field-content {
            position: relative;
            width: 88px;
            height: 36px;
            overflow: hidden;
            margin-left: 0px !important;
        }
    }
    .fileupload {
        position: absolute;
        cursor: pointer;
        width: 150px;
        height: 36px;
        top: 0;
        left: -64px;
        opacity: 0;
    }
    .upload .btn {
        padding: 5px 12px;
        background-color: #6ec3ff;
        color: #fff;
        font-size: 13px;
        line-height: 1.5;
        border-radius: 3px;
    }
    .upload-div {
        width: 403px;
        height: 36px;
        position: relative;
        float: left;
        margin: 16px 0 16px 234px;
    }
    .businessUnderstanding {
        height: 50px;
    }
    .fileName {
        height: 36px;
        line-height: 36px;
    }
    .positionName .inrement-text {
        width: 100%;
    }
    .text-editor [readonly] {
        background: #f5f5f5;
    }
    .download-btn {
        width: 88px;
        height: 36px;
        margin-left: 5px;
    }
    .file-upload-content {
        .file-upload {
            display: inline-block;
            height: 32px;
            width: 80px;
            background-color: #6ec3ff;
        }
        .file-upload span {
            display: block;
            font-size: 16px;
            line-height: 32px;
            color: #fff;
            text-align: center;
        }
        span.file-name {
            position: absolute;
            max-width: 270px;
            height: 32px;
            line-height: 32px;
            margin-left: 10px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        i {
            position: absolute;
            right: 0;
            top: 9px;
            font-size: 16px;
            cursor: pointer;
        }
        .fa-remove {
            right: 25px;
        }
    }
    .hideReadonlyFlag .text-editor [readonly] {
        background: none;
    }
}

</style>

<template lang="html">

<div class="content-wrap ihr-position-addPosition">
    <panel :title="panelTitle" class="panel-b" header="panel-header">
        <v-form ref="positionform" :model="position" :schema="positionSchema" label-width="235" label-suffix="" :cols="1" form-style="org-form">
            <div class='field'>
                <label style="width:235px;" class="positionName">{{$t('position.label.mibPosition')}}</label>
                <div class="field-content" style="margin-left:235px;">
                    <div class="field-row">
                        <div class="cell w202">
                            <text-field label-width="0" property="module" :hide-label="true" editor-width="195" :readonly="readonlyFlag"></text-field>
                        </div>
                        <div class="cell w202">
                            <text-field class="standardJobName" @open-selector="openSelector" :class="{'hideReadonlyFlag':!readonlyFlag}" label-width="0" property="standardJobName" type="selector" :readonly="true" :hide-label="true" editor-width="195"></text-field>
                        </div>
                    </div>
                </div>
            </div>
            <text-field property='businessTitle' editor-width="400" :readonly="readonlyFlag"></text-field>
            <text-increment v-if="readonlyFlag" property='positionCode' editor-width="400" :readonly="readonlyFlag"></text-increment>
            <text-increment class="unintName" property='unintName' editor-width="400" :readonly="readonlyFlag"></text-increment>
            <div class='field'>
                <label style="width:235px;" class="positionName">{{$t('position.label.mibGrade')}}</label>
                <div class="field-content" style="margin-left:235px;">
                    <div class="field-row">
                        <div class="cell w202">
                            <select-field property='mibGradeStart' :mapping="mibGradeDist" label-width="0" editor-width="195" :hide-label="true" :readonly="readonlyFlag"></select-field>
                        </div>
                        <div class="cell w202">
                            <select-field property='mibGradeEnd' :mapping="mibGradeDist" label-width="0" editor-width="195" :hide-label="true" :readonly="readonlyFlag"></select-field>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <text-increment property='mibGradeName' editor-width="400" v-if="readonlyFlag"></text-increment> -->
            <text-field property='localGrade' editor-width="400" :readonly="readonlyFlag"></text-field>
            <select-field property='positioCategory' editor-width="400" :mapping="dictList.positioCategory"></select-field>

            <!-- <text-field property="parentPositionName" type="selector" :readonly="readonlyFlag" editor-width="400" @click="show('parentPositionName')"></text-field> -->
            <text-field class="rel parentPositionName" property="parentPositionName" type="selector" editor-width="400">
                <div class="posFaTh" @click="showPosition('parentPositionName')"></div>
            </text-field>
            <field class="dotted-report-line" property="dotted" editor-width="450" label-width="0">
                <div class="field-row">
                    <div class="cell fix">
                        <label class="dottedList-label">{{$t('position.label.dottedReportLine')}}</label>
                        <template v-for="(item,index) in dottedList">
                            <v-form class="dottedList" :model="item" :schema="dottedSchema" label-suffix="" :cols="1">
                                <div class="field-row">
                                    <div class="cell roles-cell">
                                        <text-field label-width="0" :show="showDottedPos" :hide-label="true" property="dottedPositionName" editor-width="400" type="selector">
                                            <div class="posFaTh" @click="showPositionDotted('dotted',index)"></div>
                                        </text-field>
                                    </div>
                                </div>
                                <i class="fa fa-close mr10" v-if="show.resetIco" @click="clearPosition(index)"></i>
                                <span class="icon-area-plus poi mr10" @click="handleAdd()"><i class="fa fa-plus-circle"></i></span>
                                <span v-show="dottedList.length > 1" class="icon-area-trash poi" @click="handleRemove(index)"> <i class="fa fa-trash-o del-bottom"></i></span>
                            </v-form>
                        </template>
                    </div>
                </div>
            </field>

            <text-field property='beginDate' editor-width="400" v-if="!readonlyFlag"></text-field>
            <text-increment property='beginDate' editor-width="200" v-if="readonlyFlag"></text-increment>

            <text-field property='businessUnderstanding' :class="['businessUnderstanding']" type="textarea" :editor-height="50" editor-width="400"></text-field>
            <div class="upload-div">
                <text-increment :hide-label="true" property="messageAttachment" editor-width="" class="hide-text-editor">
                    <div class="file-upload-content">
                        <file-upload ref="upload" :title="$t('button.addFile')" class="file-upload" name="jobDescriptionFile" :post-action="files.url" :extensions="files.extensions" :accept="files.accept" :multiple="files.multiple" :size="files.size" :drop="files.drop"></file-upload>
                        <span class="file-name" :title="fileName">{{fileName}}</span>
                        <i class="fa fa-remove poi f14 ml5" v-if="fileName != null && fileName != '' " @click="delFile"></i>
                        <i class="fa fa-download poi f14 ml5" aria-hidden="true" v-if="attachmentId!=null&&attachmentId!=''" @click="downloadFile"></i>
                    </div>
                </text-increment>
            </div>

            <text-field property='generalRequirements' type="textarea" :editor-height="50" editor-width="400"></text-field>
            <text-field property='expertiseRequirements' type="textarea" :editor-height="50" editor-width="400"></text-field>
            <text-field property='academicRequirements' type="textarea" :editor-height="50" editor-width="400"></text-field>
            <text-field property='experienceRequire' type="textarea" :editor-height="50" editor-width="400"></text-field>
        </v-form>
    </panel>
    <div class="btn-group">
        <ui-button @click="submit" color="primary mr10">{{ $t('button.submit') }}</ui-button>
        <ui-button @click="cancel" class="btn-default-bd" type="flat">{{ $t('button.cancel') }}</ui-button>
    </div>
    <ui-confirm :title="show.confirmedhd" @confirmed="confirmed" ref="showConfirmed" close-on-confirm>
        {{ show.confirmedText }}
    </ui-confirm>
    <title-selector ref="showtitle" :handle-comfirmed="titleSelector" v-if="!readonlyFlag"></title-selector>
    <position-selector ref="showpos" :handle-comfirmed="selectedPosition"></position-selector>
    <dottedposition-selector ref="dottedposition" :handle-comfirmed="dottedpositionSelector"></dottedposition-selector>
</div>

</template>

<script>

import {
    default as Schema
}
from '../../schema/index';
import {
    default as Message
}
from '../../components/basic/message';
import {
    convert,
    getDictMapping,
    transformDict,
    formatDate,
    downloadFile
}
from '../../util/assist.js';


export default {
    data() {
            var dottedData = {
                label: this.$t('position.label.roleId'),
                dottedPositionId: {

                },
                dottedPositionName: {

                },
                dataComeFrom: {}
            };
            let positionSchema = new Schema({
                positionId: {

                },
                positionName: {
                    label: this.$t('position.label.positionName'),
                    required: false,
                    whitespace: false,
                },
                module: {
                    label: this.$t('position.label.positionName'),
                    required: true,
                    whitespace: false,
                },

                positionCode: {
                    label: this.$t('position.label.positionID'),
                    default () {
                        return 'Automatically generated';
                    }
                },
                unitId: {

                },
                unintName: {
                    label: this.$t('position.label.restrictToOrganization'),
                    required: false,
                    whitespace: false,
                },

                mibGradeStart: {
                    label: this.$t('position.label.mibGradeStart'),
                    required: true,
                    rules: {
                        type: 'custom',
                        message: this.$t('position.message.jobLevelEnd'),
                        validate() {
                            let end = parseInt(this.mibGradeEnd);
                            let start = parseInt(this.mibGradeStart);
                            if (!this.mibGradeEnd || end >= start) {
                                return true;
                            } else {
                                this.mibGradeStart = '';
                                return false;
                            }
                        }
                    }
                },
                mibGradeEnd: {
                    label: this.$t('position.label.mibGradeEnd'),
                    required: true,
                    rules: {
                        type: 'custom',
                        message: this.$t('position.message.jobLevelEnd'),
                        validate() {
                            let end = parseInt(this.mibGradeEnd);
                            let start = parseInt(this.mibGradeStart);
                            if (!this.mibGradeEnd || end >= start) {
                                return true;
                            } else {
                                this.mibGradeStart = '';
                                return false;
                            }
                        }
                    }
                },
                mibGradeName: {
                    label: this.$t('position.label.mibGrade'),
                },
                localGrade: {
                    label: this.$t('position.label.jobGrade'),
                },
                positioCategory: {
                    label: this.$t('position.label.positionCategory'),
                    required: true,
                    whitespace: false,
                    multiSelect: false
                },
                businessTitle: {
                    label: this.$t('position.label.position'),
                    required: false,
                    whitespace: false,
                },
                standardJobName: {
                    label: this.$t('position.label.standardJobName'),
                    required: true,
                    whitespace: false,
                },
                standardJobId: {

                },
                parentPositionId: {

                },
                parentPositionName: {
                    label: this.$t('position.label.superiorPosition'),
                    required: true,
                    whitespace: false
                },
                beginDate: {
                    label: this.$t('position.label.effectiveDate'),
                    required: true,
                    type: 'date',
                    default () {
                        return new Date();
                    }
                },

                orderNo: { //开始日期
                    label: this.$t('position.label.endDate'),
                    required: true
                },
                DottedReportLine: { //汇报上级职位名称
                    label: this.$t('position.label.dottedReportLine'),
                    required: false,
                    whitespace: false
                },
                businessUnderstanding: { // 业务理解
                    label: this.$t('position.label.jobDescription'),
                    required: false,
                    whitespace: false,
                },
                generalRequirements: { //学历
                    label: this.$t('position.label.generalRequirements'),
                    required: false,
                    whitespace: false,
                },
                expertiseRequirements: {
                    label: this.$t('position.label.certificationRequirement'),
                    required: false,
                    whitespace: false,
                },
                academicRequirements: { //专业要求
                    label: this.$t('position.label.academicRequirements'),
                    required: false,
                    whitespace: false,
                },
                experienceRequire: { //学术要求
                    label: this.$t('position.label.workExperience'),
                    required: false,
                    whitespace: false,
                },
                canDelete: { //学术要求

                }

            });
            let _self = this;
            return {
                panelTitle: this.$t('position.addPosition'),
                positionSchema: positionSchema,
                position: positionSchema.newModel(),

                show: {
                    resetIco: true,
                    confirmedhd: this.$t('position.importantTip'),
                    confirmedText: '',
                    confirmed: false
                },
                files: {
                    url: '',
                    accept: 'image/:,application/msexcel,application/msword,application/pdf',
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
                readonlyFlag: false,
                showPositionType: '',
                dottedList: [],
                dottedSchema: new Schema(dottedData),
                selIndex: 0,
                mibGradeDist: {},
                MIB_RANK: {},
                dictList: {
                    positioCategory: {}
                },
                posFile: [],
                attachmentId: '',
                fileName: ''
            }
        },

        created() {
            var self = this;
            let dictionaryArr = ['POSITION_CATEGORY', 'MIB_RANK'];
            this.$http.post('/public-access/dicts/items', {
                dictCodes: dictionaryArr
            }, {
                emulateJSON: true
            }).then((response) => {
                let resData = response.data;
                resData.forEach(function(item) {
                    let dictionary = item.dictName;
                    if (dictionary === "POSITION_CATEGORY") {
                        self.dictList.positioCategory = transformDict(item.dict);
                    } else {
                        self.MIB_RANK = transformDict(item.dict);
                    }
                });
            });
            this.fetchData();
        },
        methods: {
            titleSelector(data, jobGroup) {
                    let _self = this;
                    _self.position.standardJobName = data.standardJobName;
                    _self.position.standardJobId = data.standardJobId;
                    _self.position.module = jobGroup.jobFamilyName;
                    _self.position.mibGradeStart = '';
                    _self.position.mibGradeEnd = '';
                    _self.$http.get(`/pos/positions/dicts/mibgrade/items/?standardJobId=${data.standardJobId}`).then((response) => {
                        var obj = {};
                        if (response.data) {
                            response.data.forEach(function(item) {
                                obj[item.NAME] = item.VALUE;
                            })
                            this.mibGradeDist = obj;
                        }
                    });
                    return false
                },
                selectedPosition(data) {
                    let _self = this
                    _self.position.parentPositionName = data.positionName;
                    _self.position.parentPositionId = data.positionId;
                    return false
                },
                dottedpositionSelector(data) {
                    if (this.showPositionType === 'dotted') {
                        this.dottedList.forEach((item, i) => {
                            if (i === this.selIndex) {
                                item.dottedPositionId = data.positionId;
                                item.dottedPositionName = data.positionName;
                                item.dataComeFrom = data.dataComeFrom;
                            }
                        })
                    }
                },
                openSelector() {
                    this.$refs.showtitle.open();
                },
                downloadFile() {
                    let exportParam = {
                        attachmentId: this.attachmentId || ""
                    }
                    downloadFile('/system/attachment/downloadFile', exportParam);
                },
                handleAdd() {
                    this.dottedList.push(this.dottedSchema.newModel());
                },
                handleRemove(delIndex) {
                    this.dottedList.splice(delIndex, 1);
                },
                clearPosition(resetIndex) {
                    this.dottedList[resetIndex].dottedPositionName = '';
                    this.dottedList[resetIndex].dottedPositionId = '';
                    this.dottedList[resetIndex].dataComeFrom = '';
                },
                submit() {
                    let _jobGroupModel = this.position;
                    let passed = this.$refs.positionform.isFormValidate();
                    if (!passed) return;

                    this.$http.post('/pos/positions/checkSuperiorPosstion', {
                        mibGradeStart: _jobGroupModel.mibGradeStart,
                        parentPositionId: _jobGroupModel.parentPositionId
                    }, {
                        emulateJSON: true
                    }).then(function(res) {
                        if (!res.data) {
                            Message({
                                type: 'error',
                                message: this.$t('position.message.submitErr')
                            });
                        } else {
                            this.beginSubmit();
                        }
                    });
                },
                beginSubmit() {
                    let _jobGroupModel = this.position,
                        _self = this;
                    let datas = [];
                    for (var u of _self.dottedList) {
                        let obj = {
                            dottedPositionId: u.dottedPositionId,
                            dottedPositionName: u.dottedPositionName,
                            dataComeFrom: u.dataComeFrom
                        }
                        datas.push(obj);
                    }
                    let temp = {
                        dottedDto: datas
                    }
                    let data = {};
                    convert(temp, data, "", true);

                    let posPositionDto = {
                        // dottedDto: datas,
                        positionName: _jobGroupModel.positionName,
                        module: _jobGroupModel.module,
                        standardJobName: _jobGroupModel.standardJobName,
                        positionCode: _jobGroupModel.positionCode,
                        unitId: _jobGroupModel.unitId,
                        unintName: _jobGroupModel.unintName,
                        // mibGrade: _jobGroupModel.mibGrade,
                        mibGradeStart: _jobGroupModel.mibGradeStart,
                        mibGradeEnd: _jobGroupModel.mibGradeEnd,
                        localGrade: _jobGroupModel.localGrade,
                        positioCategory: _jobGroupModel.positioCategory,
                        businessTitle: _jobGroupModel.businessTitle,
                        standardJobId: _jobGroupModel.standardJobId,
                        parentPositionId: _jobGroupModel.parentPositionId,
                        parentPositionName: _jobGroupModel.parentPositionName,
                        beginDate: formatDate(new Date(_jobGroupModel.beginDate)),
                        orderNo: _jobGroupModel.orderNo,
                        businessUnderstanding: _jobGroupModel.businessUnderstanding,
                        generalRequirements: _jobGroupModel.generalRequirements,
                        expertiseRequirements: _jobGroupModel.expertiseRequirements,
                        academicRequirements: _jobGroupModel.academicRequirements,
                        experienceRequire: _jobGroupModel.experienceRequire,
                        canDelete: _jobGroupModel.canDelete,
                        posAttachmentId: this.attachmentId
                    }
                    var uploadData = {};
                    for (var key in posPositionDto) {
                        if (posPositionDto[key] !== undefined && posPositionDto[key] !== null) {
                            // formData.append(key, posPositionDto[key]);
                            uploadData[key] = posPositionDto[key];
                        }
                    }

                    for (var key in data) {
                        if (data[key] !== undefined && data[key] !== null) {
                            // formData.append(key, data[key]);
                            uploadData[key] = data[key];
                        }
                    }

                    if (_self.$route.name === 'addPosition') {
                        this.files.url = Vue.config.APIURL + '/pos/positions/';
                    } else if (_self.$route.name === 'editPosition') {
                        this.files.url = Vue.config.APIURL + '/pos/positions/' + _self.position.positionId;
                    }
                    var upload = this.$refs.upload;
                    upload.request = {
                        data: uploadData
                    };
                    this.$refs.upload.active = true;
                },
                parseFiles(rawFiles) {
                    return Array.prototype.slice.call(rawFiles, 0);
                },
                changeFile(e, fileName) {
                    var srcElement__src = e.srcElement.files;
                    switch (fileName) {
                        case 'messageAttachment':
                            this.posFile = this.parseFiles(srcElement__src);
                            break;
                    }
                    this.fileName = this.posFile[0].name;
                },
                delFile() {
                    this.posFile = [];
                    this.fileName = '';
                },
                cancel() {
                    this.$router.push({
                        name: 'positionSetting',
                        query: {
                            orgId: this.position.unitId
                        }
                    });
                },
                showPosition(type, index) {
                    this.$refs.showpos.open();
                    this.selectType = 'position';
                    this.showPositionType = type;
                    this.selIndex = index;
                    if (this.readonlyFlag) {
                        this.show.confirmedText = this.$t('position.confirmedText');
                        this.show.confirmed = true;
                    } else {
                        this.confirmed();
                    }
                },
                confirmed() {
                    if (this.selectType === 'positionDotted') {} else {}
                },
                showPositionDotted(type, index) {
                    this.$refs.dottedposition.open();
                    this.selectType = 'positionDotted';
                    this.showPositionType = type;
                    this.selIndex = index;
                    if (this.readonlyFlag) {
                        this.show.confirmedText = this.$t('position.confirmedText');
                        this.show.confirmed = true;
                    } else {
                        this.confirmed();
                    }
                },

                fixDist(value) {
                    var dist = this.MIB_RANK || {};
                    for (let key of Object.keys(dist)) {
                        if (dist[key] === value) {
                            value = key;
                            break;
                        }
                    }
                    return value;
                },
                fetchData() {
                    let _self = this;
                    _self.position.positionId = _self.$route.params.positionId;
                    _self.position.unitId = _self.$route.params.id;
                    let operationType = _self.$route.name;
                    if (_self.position.standardJobId) {
                        let obj = {};
                        this.mibGradeDist = obj;
                    }

                    if (operationType === 'addPosition') {
                        _self.panelTitle = _self.$t('position.addPosition');
                        _self.position.unintName = _self.$route.params.orgShortName;
                        _self.dottedList.push(_self.dottedSchema.newModel());

                    } else if (operationType === 'editPosition') {
                        _self.panelTitle = _self.$t('position.editPosition');

                        _self.$http.get(`/pos/positions/${_self.position.positionId}/loadData`).then((response) => {
                            let props = response.json();
                            for (let prop in props) {
                                if (props.hasOwnProperty(prop)) {
                                    _self.position[prop] = props[prop];
                                }
                            }
                            this.dottedList = props.dottedDto;
                            _self.position.beginDate = formatDate(new Date(props.beginDate));
                            _self.position.unintName = props.unitShortName;
                            // _self.unintName = props.unitShortName; //组织名称
                            if (_self.position.dottedDto.length === 0) {
                                _self.dottedList.push(_self.dottedSchema.newModel());
                            }
                            _self.readonlyFlag = !props.canDelete;
                            // 获取职级id,显示标准职位的设置范围
                            _self.$http.get(`/pos/positions/dicts/mibgrade/items/?standardJobId=${props.standardJobId}`).then((response) => {
                                var obj = {};
                                if (response.data) {
                                    response.data.forEach(function(item) {
                                        obj[item.NAME] = item.VALUE;
                                    })
                                    this.mibGradeDist = obj;
                                }
                            });
                            _self.position.mibGradeName = _self.fixDist(_self.position.mibGrade);
                            _self.attachmentId = props.posAttachmentId;
                            _self.fileName = props.posAttachmentName;

                        });

                    }
                }
        },
        watch: {
            // 如果路由有变化，会再次执行该方法
            '$route': 'fetchData'
        },
        events: {
            addFileUpload(file, component) {
                    this.fileName = file.name;
                    this.attachmentId = '';
                },
                afterFileUpload(file, component) {
                    if (!file.error) {
                        this.$router.push({
                            name: 'positionSetting',
                            query: {
                                orgId: this.position.unitId
                            }
                        });
                        var message = this.$t('common.editedSuccess');
                        if (this.$route.name === 'addPosition') {
                            message = this.$t('common.addedSuccess');
                        }
                        Message({
                            type: 'success',
                            message: message
                        });
                    }
                }
        },
        components: {
            Panel: require('../../components/basic/panel.vue'),
            FileUpload: require('../../components/basic/FileUpload.vue')
        }
}

</script>
