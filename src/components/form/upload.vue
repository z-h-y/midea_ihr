<style lang="less">
.upload {
    border-color: #e5e5e5 #eee #eee;
    width: 585px;
    /*width: 565px;*/
    padding-top: 0;
}

.upload h2 {
    color: #333;
    margin-bottom: 20px;
}

.upload li {
    list-style: none;
}

.upload .btn {
    background-color: #6ec3ff;
    color: #fff;
    border-radius: 3px;
}

.upload .btn-default {
    border: 1px solid #fff;
}

.upload .btn-primary {
    border: 1px solid #fff;
}
.upload .btn:disabled {
    background-color: rgba(0, 0, 0, 0.35);
    color: #eee;
    cursor: default;
}

.upload .btn .d-icon-plus {
    font-weight: bold;
    font-size: 16px;
    line-height: 1;
    margin-right: 10px;
}

.upload-operate button {
    margin-right: 5px;
    width: 95px;
}

.upload-operate .btn-file {
    display: inline-block;
    vertical-align: middle;
    text-align: center;
    line-height: 36px;
    width: 88px;
    height: 36px;
    position: relative;
    overflow: hidden;
}
.upload-operate {
  .file-upload {
      display: inline-block;
      height: 32px;
      width: 80px;
      background-color: #6ec3ff;
      vertical-align: middle;
  }
  .file-upload span{
      display: block;
      font-size: 16px;
      line-height: 32px;
      color: #fff;
      text-align: center;
  }
}

.upload-operate .btn-file input {
    position: absolute;
    cursor: pointer;
    width: 182px;
    height: 36px;
    top: 0;
    left: -95px;
    opacity: 0;
}

/* 上传文件列表 */

.upload-files {
    overflow: hidden;
    margin-bottom: 20px;
    border: 2px dashed #dee4e9;
    padding: 20px 0 0 20px;
}

.upload-files-tip {
    font-size: 20px;
    color: #a5acbe;
    line-height: 120px;
    text-indent: 50px;
}

.upload-file {
    position: relative;
    float: left;
    margin: 0 20px 20px 0;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 110px;
    height: 110px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.075);
    padding: 4px 4px 28px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.upload-file .rm-btn {
    position: absolute;
    top: 4px;
    right: 4px;
    cursor: pointer;
}

.upload-file-pic {
    width: 100%;
    height: 100%;
    display: block;
}

.upload-file-name {
    font-size: 13px;
    width: 100%;
}

/* 上传结果列表 */

.upload-result {
    margin-top: 40px;
    color: rgb(101, 107, 121);
    border-radius: 3px;
}

.upload-result-title {
    text-align: left;
    line-height: 1.5;
    font-size: 18px;
}

.upload-result-title span {
    font-size: 12px;
    color: #666;
}

.upload-result-title span em {
    color: #FF1C1C;
    font-style: normal;
}

.upload-result table {
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
}

.upload-result td,
.upload-result th {
    text-align: center;
    border-bottom: 1px solid rgba(216, 210, 210, 0.35);
    padding: 8px;
    line-height: 1.5;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.upload-result thead th {
    font-weight: 600;
    text-transform: uppercase;
}
.upload-result tbody tr:nth-of-type(odd) {
    background-color: #fff;
}

.upload-result button + button {
    margin-left: 5px;
}

.upload-result-pic {
    width: 100%;
}

.upload-result-link {
    white-space: normal;
    text-overflow: initial;
}

.upload-result-link a {
    color: #254563;
}
.upload-result-link a:hover {
    color: #55aff0;
    text-decoration: underline;
}

.upload-result-clipboard {
    opacity: 0;
}
.local-file {
  width: 110px;
  height: 110px;
}
</style>

<template>
<div class="upload {{uploadClass}}">
    <!-- 上传文件 -->
    <ul class="upload-files" v-on:dragenter.stop.prevent v-on:dragover.stop.prevent v-on:drop.stop.prevent="onFileDrop">
        <li v-if="files.length === 0 && defaultFiles.length === 0" class="upload-files-tip">Drop Picture here</li>
        <li class="upload-file" v-for="file in defaultFiles" title="{{file.attachmentName}}">
            <img class="upload-file-pic" v-bind:src="imgUrl + file.attachmentId" alt="">
            <span class="upload-file-name">{{file.attachmentName}}</span>
            <i class="rm-btn fa fa-times" aria-hidden="true" @click="removeDefaultFile($index)"></i>
        </li>
        <li class="upload-file" v-for="file in files" title="{{file.name}}">
            <img class="local-file upload-file-pic" src="../../static/images/doc.png" v-bind:src="file.imgUrl" alt="" v-bind:style="file.filter">
            <span class="upload-file-name">{{file.name}}</span>
            <i class="rm-btn fa fa-times" aria-hidden="true" @click="removeFile($index)"></i>
        </li>
    </ul>
    <form class="upload-operate" enctype="multipart/form-data">
        <!-- <span type="button" class="btn btn-default btn-file">
            <input type="file" name="picture[]" @change="onChange($event)" v-bind:multiple="multiple" v-bind:accept="accept">
            <em class="d-icon-plus">+</em>Add
        </span> -->
        <file-upload title="Add" class="file-upload" :name="filesOption.name" :post-action="filesOption.url" :extensions="filesOption.extensions" :accept="filesOption.accept" :multiple="filesOption.multiple" :size="filesOption.size" v-ref:upload :drop="filesOption.drop"></file-upload>
        <span style="font-size:16px;color:red;">(only can be upload file type: <i style="font-style:nomal;color:blue;font-size:16px;">png/jpeg/jpg/doc/pdf</i>,Maximam: <i style="font-style:nomal;color:blue;font-size:16px;">2M</i>)</span>
        <!-- <button type="button" class="btn btn-primary" @click="upload()" :disabled="uploading">{{uploading ? 'Uploading...' : 'Upload'}}</button> -->
    </form>
    <!-- 上传结果 -->
    <!-- <div class="upload-result">
        <h3 class="upload-result-title">Upload result<span>（Upload history save up to <em>{{maxRecords}}</em>）</span></h3>
        <table>
            <thead>
                <tr>
                    <th width="40px">#</th>
                    <th width="70px">image</th>
                    <th width="100px">name</th>
                    <th width="80px">size</th>
                    <th>link</th>
                    <th width="120px">operate</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in result">
                    <td>{{$index}}</td>
                    <td><img class="upload-result-pic" v-bind:src="item.url"></td>
                    <td>{{item.name}}</td>
                    <td>{{item.size | size}}</td>
                    <td class="upload-result-link"><a href="{{item.url}}" target="_blank">{{item.url}}</a></td>
                    <td>
                        <button class="btn btn-primary" @click="copyUrl(item.url)">copy</button>
                        <button class="btn btn-default" @click="deleteRecord($index)">remove</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <input class="upload-result-clipboard" v-el:clipboard type="text" v-model="copyText" contenteditable>
    </div> -->
</div>
</template>

<script type="text/ecmascript-6">
import {
    default as Message
}
from '../basic/message';

export default {
    props: {
        uploadClass: {
            type: String,
            default: ''
        },
        defaultFiles: {
            type: Array,
            default () {
                return [];
            }
        },
        url: {
            type: String,
            default: ''
        },
        multiple: {
            type: Boolean,
            default: true
        },
        minNum: {
            type: Number
        },
        maxNum: {
            type: Number
        },
        maxFilesize: {
            type: Number
        },
        accept: {
            type: String,
            default: '*'
        },
        filesOption: {},
        uploadResult: {}
    },
    data() {
        return {
            maxRecords: 20,
            uploading: false,
            imgUrl: Vue.config.APIURL + '/system/attachment/downloadImg/',
            files: [],
            errorMsg: '',
            result: JSON.parse(localStorage.getItem('uploadPicture[]')) || []
        };
    },
    methods: {
        upload() {
            if (this.minNum && this.files.length < this.minNum) {
                this.errorMsg = 'The number of files is less than the specified range';
                this.promatMessage(this.errorMsg);
                return;
            }

            if (this.uploading) return;
            this.uploading = true;

            var formData = new FormData();

            this.files.forEach(function(file) {
                formData.append('picture[]', file);
            });

            this.$http.post(this.url, formData, (data) => {
                var result = this.result;

                this.uploading = false;

                data.forEach(function(item, index) {
                    var file = this.files[index];

                    item = item || 'Upload Fail';

                    result.unshift({
                        url: item.replace(/(.)(..)(.{29}(.+))/, 'http://fuss.test.ele.me/$1/$2/$3.$4'),
                        name: file.name,
                        size: file.size
                    });
                });
            }, (e) => {
                this.uploading = false;
                this.errorMsg = 'System exception.'
                this.promatMessage(this.errorMsg);
            });
        },
        promatMessage(message) {
            Message({
                type: 'error',
                message: message
            });
        },
        deleteRecord(index) {
            this.result.splice(index, 1);
        },
        copyUrl(url) {
            this.copyText = url;
            this.$els.clipboard.select();
            document.execCommand('copy', true);
        },
        parseFiles(rawFiles) {
            var [i, len] = [0, rawFiles.length];

            for (; i < len; i++) {
                rawFiles[i].imgUrl = URL.createObjectURL(rawFiles[i]);
            }

            return Array.prototype.slice.call(rawFiles, 0);
        },
        onFileDrop(e) {
            var files = e.dataTransfer.files;


            var isValidator = this.isFileValidator(files);
            if (!isValidator) {
                alert(this.errorMsg);
                return;
            }
            this.files = this.parseFiles(files);
            this.$parent.model[this.$parent.property] = this.files;
        },
        onChange(e) {
            var srcElement__src = e.srcElement.files;
            var isValidator = this.isFileValidator(srcElement__src);

            if (!isValidator) {
                e.target.value = '';
                return;
            }

            // var message = 'not available file type! Please Select file type of: jpg/doc/pdf/png.';
            // var fileType = srcElement__src[0].name.split('.')[1];
            // var allType = ['jpg','png','pdf','doc','docx'];
            // var isAllow = allType.indexOf(fileType);
            // //检测文件类型是否为可以接受的类型
            // if(isAllow < 0) {
            //     this.promatMessage(message);
            //     return false;
            // }
            // 检测是否超过文件最大限制
            if (this.maxNum && srcElement__src.length + this.files.length > this.maxNum) {
                this.errorMsg = 'The number of files exceeds the range';
                this.promatMessage(this.errorMsg);
                return;
            }
            this.files = this.files.concat(this.parseFiles(srcElement__src));
            this.$parent.model[this.$parent.property] = this.files;
            e.target.value = '';
        },
        // 检测文件是否符合要求
        isFileValidator(files) {
            var curFiles = this.files;
            var isValidator = true;
            var allFilesize = 0;

            // 检测文件类型是否为可以接受的类型
            var message = 'not available file type! Please Select file type of: jpg/jpeg/doc/pdf/png.';
            var fileType = files[0].name.split('.')[1];
            fileType = fileType.toLowerCase();
            var allType = ['jpeg', 'jpg', 'png', 'pdf', 'doc', 'docx'];
            var isAllow = allType.indexOf(fileType);
            //检测文件类型是否为可以接受的类型
            if (isAllow < 0) {
                this.promatMessage(message);
                return false;
            }

            // 是否超过限制的数量
            if (this.maxNum && curFiles.length + files.length > this.maxNum) {
                this.errorMsg = 'The number of files is less than the specified range';
                this.promatMessage(this.errorMsg);
                return false;
            }

            for (var i = 0, len = files.length; i < len; i++) {
                if (!isValidator) {
                    break;
                }
                allFilesize += files[i].size;
                // 是否大小超过限制
                if ((this.maxFilesize && files[i].size > this.maxFilesize) || allFilesize > 10 * 1024 * 1024) {
                    isValidator = false;
                    this.errorMsg = 'File:' + files[i].name + ' The size exceeds the limit.';
                    this.promatMessage(this.errorMsg);
                    break;
                }

                // 是否存在同名的文件
                for (var j = 0, j_len = curFiles.length; j < j_len; j++) {
                    if (files[i].name === curFiles[j].name) {
                        this.errorMsg = 'File:' + files[i].name + ' already exists';
                        isValidator = false;
                        this.promatMessage(this.errorMsg);
                        break;
                    }
                }
            }
            return isValidator;
        },
        removeFile(index) {
            this.files.splice(index, 1);
            this.$refs.upload.files.splice(index, 1);
        },
        removeDefaultFile(index) {
            this.$parent.removeIds.push(this.defaultFiles[index].attachmentId);
            this.defaultFiles.splice(index, 1);
        }

    },
    watch: {
        'result' (newValue, oldVal) {
            var maxRecords = this.maxRecords;

            if (newValue.length >= maxRecords) {
                this.result = newValue.slice(0, maxRecords);
            }
            localStorage.setItem('uploadPicture[]', JSON.stringify(newValue));
        }
    },
    events: {
      addFileUpload(file, component) {
          if (file.name !== '' && !file.error) {
            if (window.URL) {
              file.imgUrl = URL.createObjectURL(this.$refs.upload._files[file.id].file);
            } else {
              file.imgUrl = '../../static/images/public/transparent.png';
            }
            this.files.push(file);
          }
      },
      afterFileUpload(file, component) {
          this.uploadResult(file);
      },
      fileUploadFail(file, component) {
        Message({type: 'error', message: this.$t('staff.message.fileUploadType')});
      }
    },
    components: {
        FileUpload: require('../basic/FileUpload.vue')
    }
};
</script>
