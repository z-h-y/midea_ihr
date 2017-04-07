<style lang="less">

.emp-com-hd {
    font-size: 14px;
    position: relative;
    .emp-com-hd-top {
        background-color: #fafafa;
        padding-left: 220px;
        height: 106px;
    }
    h3 {
        font-size: 24px;
        color: #545454;
        padding-top: 16px;
    }
    p {
        margin: 5px 0;
        font-size: 14px;
        color: #a5acbe;
    }
    .img-wrap{
      position: absolute;
      top:20px;
      left:20px;
      width:140px;
      height:140px;
      overflow: hidden;
      border-radius: 50%;
    }
    // .avatar {
    //     display: block;
    //     width:140px;
    //     height: 140px;
    //     vertical-align: middle;
    // }
    .avatar {
        width: 100%;
        float: right;
        position: relative;
    }
    .avatar img {
      position: absolute;
      border-radius: 50%;
    }
    .avatar-shadow {
      display: none;
    }
    .show-shadow .avatar-shadow {
      display: block;
    }
    .avatar input {
        position: absolute;
        height: 140px;
        width: 140px;
        opacity: 0;
        cursor: pointer;
    }
    ul li {
        float: left;
        width: 170px;
        min-height: 38px;
        padding-left: 60px;
        line-height: 38px;
        border: 1px solid transparent;
        border-radius: 30px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        background-color: #fafafa;
        color: #a5acbe;
    }
    .contact {
        border-bottom: 1px solid #e8e8e8;
        padding: 20px 0 20px 220px;
    }
    .contact li {
        position: relative;
        color: #a5acbe;
        margin-right: 155px;
        margin-bottom: 10px;
    }
    .contact-ico(@w, @h) {
        width: @w;
        height: @h;
        position: absolute;
        left: 0;
        top: 0;
    }
    .contact-ico-num {
        .contact-ico(36px, 36px);
        background: url("../../assets/images/public/staff-interns-phone.png") no-repeat center center;
    }
    .contact-ico-mail {
        .contact-ico(36px,
        36px);
        background: url("../../assets/images/public/staff-interns-mail.png") no-repeat center center;
    }
    .contact-ico-location {
        .contact-ico(36px,
        36px);
        background: url("../../assets/images/public/staff-interns-location.png") no-repeat center center;
    }
    .contact-ico-person {
        .contact-ico(36px,
        36px);
        background: url("../../assets/images/public/staff-interns-person.png") no-repeat center center;
    }
    .panel-content-label {
        padding: 10px 0;
        text-align: right;
        width: 150px;
        color: #a5acbe;
    }
    .panel-content-txt {
        float: left;
        padding: 10px 0 10px 20px;
        color: #a5acbe;
    }
    .text-manager-color {
        color: #11bf8c!important;
        margin-right: 4px;
    }
    .file-upload {
        display: block;
        height: 140px;
    }
    .file-upload span{
        display: block;
        font-size: 18px;
        padding: 1em;
        font-weight: bold;
        text-indent: -9999em;
    }
    .drop-active {
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        position: absolute;
        opacity: .4;
        background: #000;
    }
}

</style>

<template lang="html">
  <div class="emp-com-hd">
      <div class="img-wrap">
        <div class="avatar" :class="{'show-shadow': showShadow}">
          <img v-bind:src="avatar" alt="" width="140px" height="140px" />
          <img v-if="editAble" src="/assets/images/public/avatar-upload-bg.png" height="140" width="140" class="avatar-shadow" >
          <div class="" title="click to upload">
            <file-upload @addFileUpload="addFileUpload" @afterFileUpload="afterFileUpload" @fileUploadFail="fileUploadFail" v-if="editAble" title="avatar" class="file-upload" name="file" :post-action="files.url" :extensions="files.extensions" :accept="files.accept" :multiple="files.multiple" :size="files.size" ref="upload" :drop="files.drop" @mouseover="showShadow = true" @mouseout="showShadow = false"></file-upload>
          </div>
          <!-- <input v-if="editAble" type="file" name="file" multiple accept="image/gif,image/jpeg,image/jpg,image/png" @change="uploadAvatar($event)" title="click to upload" @mouseover="showShadow = true" @mouseout="showShadow = false"> -->
        </div>
      <!-- <img class="avatar" v-bind:src="avatar" /> -->
      </div>
      <div class="emp-com-hd-top">
          <h3>{{ empInfo.fullName }}</h3>
          <p>
              {{ empInfo.businessCardTitle }}
              {{ (empInfo.businessCardTitle && empInfo.localJobGrade) ? ',' : '' }}
              {{ empInfo.localJobGrade }}
          </p>
          <p>
              {{ empInfo.orgUnit.fullUnitName }}
          </p>
      </div>
      <ul class="contact fix">
          <li>
              {{ empInfo.officePhone }}
              <div class="contact-ico-num"></div>
          </li>
          <li>
              {{ empInfo.email }}
              <div class="contact-ico-mail"></div>
          </li>
          <li>
              {{ empInfo.officeAddress }}
              <div class="contact-ico-location"></div>
          </li>
          <li><span class="text-manager-color">{{$t('staff.manager')}}</span>{{ empInfo.parentEmployeeName }}
              <div class="contact-ico-person"></div>
          </li>
      </ul>
  </div>
</template>

<script>
import {default as Message} from '../../components/basic/message';
export default {
    props: {
      employeeId: {},
      employeeInfo: {},
      editAble: {
        default: false
      }
    },
    data() {
            return {
              avatar: '/assets/images/public/defaultAvatar.png',
              showShadow: false,
              empInfo: {
                orgUnit: {}
              },
              files: {
                url: Vue.config.APIURL + '/system/attachment/uploadFile',
                accept: 'image/*',
                size: 1024 * 1024 * 2,
                multiple: false,
                extensions: 'gif,jpg,jpeg,png',
                // extensions: ['gif','jpg','png'],
                // extensions: /\.(gif|png|jpg)$/i,
                files: [],
                upload: {},
                drop: true,
                auto: true
              }
            };
        },
        created() {
          if (this.employeeId) {
            this.getData(this.employeeId);
          }
        },
        methods: {
          getData(employeeId) {
            this.$http.get('/employee/employees/'+ employeeId).then((response) => {
                this.employeeInfo = response.data;
                this.empInfo = response.data;
                var photoId = response.data.photoId;
                if (photoId) {
                  this.avatar = Vue.config.APIURL + '/system/attachment/downloadImg/' + photoId;
                }
            }, (response) => {
                console.log('错误信息 ：' + response.statusText);
            });
          },
          addFileUpload(file, component) {
            if (this.files.auto) {
              component.active = true;
            }
          },
          afterFileUpload(file, component) {
            this.employeeInfo.photoId = file.data;
            this.avatar = Vue.config.APIURL + '/system/attachment/downloadImg/' + file.data;
            // this.$parent.submitForm('uploadAvatar');
            this.$http.post('/employee/employees/photo/' + this.employeeId, {photoId: this.employeeInfo.photoId}, {
                emulateJSON: true
            }).then(function(res) {
              Message({
                  type: 'success',
                  message: this.$t('common.uploadSuccess')
              });
            });
          },
          fileUploadFail(file, component) {
            Message({
                type: 'error',
                message: this.$t('staff.message.avatarTypeError')
            });
          }
        },
        components: {
          FileUpload: require('../../components/basic/FileUpload.vue')
        }
};

</script>
