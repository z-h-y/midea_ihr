<style lang="less">
// html {
//     width: 100%;
//     height: 100%;
// }
// body {
//     position: relative;
//     width: 100%;
//     height: 100%;
//     margin: 0;
//     padding: 0;
//     font-size: 12px;
//     font-family: Helvetica,Arial,微软雅黑!important;
//     background: #f8f8f8;
//     color: #222;
// }
// .login-page {
//     width: 100%;
//     height: 100%;
//     min-height: 560px;
//     position: relative;
//     overflow: hidden;
//     background: #3aa2eb url("../static/images/public/login-bg.png") center no-repeat;
//     background-size: cover;
//     .login-body {
//         width: 1016px;
//         margin: 0 auto;
//         height: 100%;
//         position: relative;
//         .login-area {
//             position: absolute;
//             border: 1px solid #fff;
//             display: block;
//             background-color: #fff;
//             top: 50%;
//             left: 50%;
//             width: 454px;
//             height: 350px;
//             -webkit-transform: translate(20%, -50%);
//             transform: translate(10%, -50%);
//         }
//     }
//     .login-pop-content {
//         width: 100%;
//         height: 100%;
//         position: relative;
//         top: 30px;
//     }
//     .login-pop-form {
//         position: absolute;
//         top: 200px;
//         left: 50%;
//         padding: 4px;
//         transform: translate(-50%, -50%);
//     }
//     .tang-pass-login {
//         position: relative;
//         .form-item {
//             position: relative;
//             margin-bottom: 20px;
//             &:last-child {
//                 margin-bottom: 0;
//             }
//         }
//         .label-userName,
//         .label-userPass {
//             display: block;
//             position: absolute;
//             top: 14px;
//             left: 6px;
//             width: 0;
//             height: 15px;
//             overflow: hidden;
//             padding: 0 0 0 15px;
//             background-repeat: no-repeat;
//         }
//         .label-userName {
//             background-image: url("../static/images/public/user-ico.png");
//         }
//         .label-userPass {
//             background-image: url("../static/images/public/password-ico.png");
//         }
//         .text-label-userName,
//         .text-label-userPass {
//             width: 338px;
//             display: block;
//             position: relative;
//             height: 28px;
//             padding: 4px 10px;
//             border: 1px solid #d5d5d5;
//             transition: 0.3s;
//             font-size: 14px;
//             color: #666;
//             padding-left: 28px;
//             .field {
//                 position: absolute;
//                 top: 2px;
//                 left: 0;
//                 .field-content {
//                     width: 100%;
//                     height: 44px;
//                     left: 0;
//                     padding: 0;
//                     position: relative;
//                 }
//                 .text-editor {
//                     width: 100%;
//                     position: absolute;
//                     left: 28px;
//                     top: 0;
//                     input {
//                         background-color: transparent;
//                         border: none;
//                         height: 24px;
//                         &:-webkit-autofill {
//                             -webkit-box-shadow: 0 0 0 1000px white inset;
//                         }
//                     }
//                 }
//                 .field-hint {
//                     position: absolute;
//                     top: 35px;
//                 }
//             }
//         }
//         .login-btn {
//             width: 100%;
//             overflow: hidden;
//         }
//     }
//     .form-item.password {
//         margin-bottom: 30px;
//     }
//     .login-statement {
//         color: #fff;
//         font-size: 18px;
//         width: 450px;
//         position: absolute;
//         top: 50%;
//         transform: translate(5%, -55%);
//         .first-txt {
//             font-size: 28px;
//         }
//         .first {
//             line-height: 30px;
//         }
//         .second {
//             margin-top: 30px;
//         }
//     }
//     .login-logo {
//         height: 40px;
//         margin-top: 0;
//         background: url("../static/images/public/iHR-logo.png") no-repeat center;
//     }
//     .login-title {
//         margin: 30px auto;
//         width: 240px;
//         text-align: center;
//         font-family: Arial;
//         font-size: 15px;
//         color: #6a6e71;
//         background: #fff;
//         padding: 0 5px;
//         position: relative;
//         z-index: 9;
//     }
//     .login-line {
//         width: 340px;
//         height: 1px;
//         background: #e1e1e1;
//         margin: 0 0 0 -170px;
//         position: absolute;
//         left: 50%;
//         top: 78px;
//     }
//     .test-state {
//         color: #fff;
//         position: absolute;
//         right: 0;
//         top: -28px;
//         z-index: 9999;
//         font-size: 24px;
//     }
// }
</style>

<template lang="html">

<!-- <div id="loginPage" class="login-page">
    <div id="loginBody" class="login-body" @keydown="onkeydown($event)">
        <div class="login-statement">
            <div class="first">
                <span class="first-txt">Lead</span> the transformation of Midea to become an open capable and effective global organization
            </div>
            <div class="second">
                That is the Top Employer of the industry
            </div>
        </div>
        <div class="login-area">
            <div class="test-state">Beta</div>
            <div class="login-pop-content">
                <div class="login-logo"></div>
                <div class="login-line"></div>
                <div class="login-title">Human Capital Management System</div>
                <div class="login-pop-form">
                    <div class="tang-pass-login">
                        <v-form v-ref:myform :model="user" :schema="userSchema" label-width="200" label-suffix="" :cols="1">
                            <div class="form-item">
                                <label class="label-userName"></label>
                                <div class="text-label-userName">
                                    <text-field property="userName" label-width="0" :hide-label="true" placeholder="Username" editor-width="310"></text-field>
                                </div>
                            </div>
                            <div class="form-item password">
                                <label class="label-userPass"></label>
                                <div class="text-label-userPass">
                                    <text-field property="passWord" type="password" label-width="0" :hide-label="true" placeholder="Password" editor-width="310"></text-field>
                                </div>
                            </div>
                            <div class="form-item">
                                <ui-button class="login-btn" color="primary" @click="login">Log In</ui-button>
                            </div>
                        </v-form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div> -->

</template>

<script type="text/ecmascript-6">
// import {
//     default as Message
// }
// from '../components/basic/message';
// import {
//     default as Schema
// }
// from '../schema/index';
//
// export default {
//     data() {
//         var self = this;
//         let userSchema = new Schema({
//             userName: {
//                 label: 'Username',
//                 required: true
//             },
//             passWord: {
//                 label: 'Password',
//                 required: true,
//                 minLength: 1,
//                 maxLength: 20,
//                 rules: {
//                     type: 'custom',
//                     message: 'Please Input Correct Username or Password',
//                     validate() {
//                         return self.isCorrect;
//                     }
//                 }
//             }
//         });
//         return {
//             userSchema: userSchema,
//             user: userSchema.newModel(),
//             show: true,
//             isCorrect: true
//         };
//     },
//     methods: {
//         login() {
//             let _userModel = this.user;
//             const props = _userModel.$schema.props;
//             // let passed = _userModel.$schema.validate(_userModel, props);
//             var passed = _userModel.$schema.isFormValidate(this.$refs.myform);
//             if (passed) {
//                 this.$http.post('/security/login', {
//                     username: _userModel.userName,
//                     password: _userModel.passWord
//                 }, {
//                     emulateJSON: true
//                 }).then((response) => {
//                     if (response.data) {
//                         localStorage.setItem('ewptoken', response.data);
//                         this.$router.go({
//                             path: '/ihr/home'
//                         });
//                     }
//                 }, (response) => {
//                     this.isCorrect = false;
//                     _userModel.$schema.isFormValidate(this.$refs.myform);
//                     this.isCorrect = true;
//                 });
//             }
//         },
//         onkeydown: function(event) {
//             if (event.keyCode == 13) {
//                 this.login();
//             }
//         }
//     }
// };
</script>
