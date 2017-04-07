'use strict';

export default function() {
    var routes = [{
            path: '/',
            name: 'login',
            component: function(resolve) {
                require(['../views/login.vue'], resolve)
            }
        }, {
            path: '/error',
            name: 'error',
            component: function(resolve) {
                require(['../views/error.vue'], resolve)
            }
        }, {
            path: '/help',
            name: 'help',
            component: function(resolve) {
                require(['../views/help.vue'], resolve)
            }
        }, {
            path: '/ihr',
            name: 'ihr',
            component: function(resolve) {
                require(['../views/app.vue'], resolve)
            },
            children: [{
                    path: '/ihr/search/:type/:condition',
                    name: 'search',
                    component: function(resolve) {
                        require(['../views/search/search.vue'], resolve)
                    }
                }, {
                    path: '/ihr/setting/staffAreaTemplate',
                    name: 'staffAreaTemplate',
                    component: function(resolve) {
                        require(['../views/setting/staffAreaTemplate/staffAreaTemplate.vue'], resolve)
                    }
                }, {
                    path: '/ihr/setting/staffAreaTemplate/templateType/add',
                    name: 'addAreaTemplate',
                    component: function(resolve) {
                        require(['../views/setting/staffAreaTemplate/templateUpdate.vue'], resolve)
                    }
                }, {
                    path: '/ihr/setting/staffAreaTemplate/templateType/edit/:areaTemplateId',
                    name: 'editAreaTemplate',
                    component: function(resolve) {
                        require(['../views/setting/staffAreaTemplate/templateUpdate.vue'], resolve)
                    }
                }, {
                    path: '/ihr/setting/staffAreaTemplate/templateType/view/:areaTemplateId',
                    name: 'viewAreaTemplate',
                    component: function(resolve) {
                        require(['../views/setting/staffAreaTemplate/templateView.vue'], resolve)
                    }
                },
                /********************** 员工自助端 **********************/
                {
                    path: '/ihr/myRecord',
                    name: 'myRecord',
                    component: function(resolve) {
                        require(['../views/myRecord/career-record.vue'], resolve)
                    }
                }, {
                    path: '/ihr/myProfile',
                    name: 'myProfile',
                    component: function(resolve) {
                        require(['../views/staff/employeeView.vue'], resolve)
                    }
                }, {
                    path: '/ihr/myPerformance/annualPerformance',
                    name: 'myPerformance',
                    component: function(resolve) {
                        require(['../views/myPerformance/annualPerformance/annual-performance.vue'], resolve)
                    }
                }, {
                    path: '/ihr/myPerformance/annualPerformance/annualPerformanceConfirm/:id/:schemeName/:state',
                    name: 'annualPerformanceConfirm',
                    component: function(resolve) {
                        require(['../views/myPerformance/annualPerformance/annual-performance-confirm.vue'], resolve)
                    }
                }, {
                    path: '/ihr/myPerformance/orgPerformance/:openId',
                    name: 'myOrgPerformance',
                    component: function(resolve) {
                        require(['../views/myPerformance/org-performance.vue'], resolve)
                    }
                }, {
                    path: '/ihr/myPerformance/view/:openId/:sid/:processTemplateId/:procInstId/:schemeEmployeeId/:employeeId/:id/:back',
                    name: 'performanceView',
                    component: function(resolve) {
                        require(['../views/myPerformance/view.vue'], resolve)
                    }
                }, {
                    path: '/ihr/myPerformance/process/view/:openId/:sid/:processTemplateId/:procInstId/:schemeEmployeeId',
                    name: 'performanceViewProcess',
                    component: function(resolve) {
                        require(['../views/myPerformance/viewprocess.vue'], resolve)
                    }
                }, {
                    path: '/ihr/myPerformance/furnish/:openId/:sid/:processTemplateId/:indicatorsSetting/:schemeEmployeeId/:procInstId/:employeeId',
                    name: 'furnish',
                    component: function(resolve) {
                        require(['../views/myPerformance/furnish.vue'], resolve)
                    }
                }, {
                    path: '/ihr/myPerformance/self_evaluate/:openId/:sid/:procInstId/:schemeEmployeeId',
                    name: 'selfevaluate',
                    component: function(resolve) {
                        require(['../views/myPerformance/selfEvaluate.vue'], resolve)
                    }
                }, {
                    path: '/ihr/myPerformance/evaluate/:openId/:sid/:procInstId/:schemeEmployeeId/:employeeId',
                    name: 'evaluate',
                    component: function(resolve) {
                        require(['../views/myPerformance/evaluate.vue'], resolve)
                    }
                }, {
                    path: '/ihr/myPerformance/approve/:openId/:sid/:procInstId/:schemeEmployeeId/:employeeId',
                    name: 'approve',
                    component: function(resolve) {
                        require(['../views/myPerformance/approve.vue'], resolve)
                    }
                },

                /************************* END ************************/
                {
                    path: '/ihr/',
                    name: 'defaultHome',
                    component: function(resolve) {
                        require(['../views/home.vue'], resolve)
                    }
                }, {
                    path: '/ihr/home',
                    name: 'home',
                    component: function(resolve) {
                        require(['../views/home.vue'], resolve)
                    }
                }, {
                    path: '/ihr/notification',
                    name: 'notification',
                    component: function(resolve) {
                        require(['../views/notification/notification.vue'], resolve)
                    }
                }, {
                    path: '/ihr/notification/view/:id',
                    name: 'viewNotification',
                    component: function(resolve) {
                        require(['../views/notification/viewNotification.vue'], resolve)
                    }
                }, {
                    path: '/ihr/notificationmanage',
                    name: 'notificationManage',
                    component: function(resolve) {
                        require(['../views/notification/admin/notification.vue'], resolve)
                    }
                }, {
                    path: '/ihr/notification/view/manage/:id',
                    name: 'viewNotificationManage',
                    component: function(resolve) {
                        require(['../views/notification/viewNotification.vue'], resolve)
                    }
                }, {
                    path: '/ihr/notification/admin/add',
                    name: 'addNotification',
                    component: function(resolve) {
                        require(['../views/notification/admin/notificationUpdate.vue'], resolve)
                    }
                }, {
                    path: '/ihr/staff/partTimeRole',
                    name: 'staffPartTimeRole',
                    component: function(resolve) {
                        require(['../views/staff/partTimeRole/partTimeRole.vue'], resolve)
                    }
                }, {
                    path: '/ihr/staff/partTimeRole/view/:employeeId',
                    name: 'staffPartTimeRoleView',
                    component: function(resolve) {
                        require(['../views/staff/employeeView.vue'], resolve)
                    }
                }, {
                    path: '/ihr/staff/partTimeRole/interim',
                    name: 'interim',
                    component: function(resolve) {
                        require(['../views/staff/partTimeRole/interimPartTime.vue'], resolve)
                    }
                }, {
                    path: '/ihr/staff/partTimeRole/transfer/:employeeId/:partTimeId',
                    name: 'partTimeTransfer',
                    component: function(resolve) {
                        require(['../views/staff/partTimeRole/transfer.vue'], resolve)
                    }
                }, {
                    path: '/ihr/staff/partTimeRole/terminate/:employeeId/:partTimeId',
                    name: 'partTimeTerminate',
                    component: function(resolve) {
                        require(['../views/staff/partTimeRole/terminate.vue'], resolve)
                    }
                }, {
                    path: '/ihr/staff/interns',
                    name: 'interns',
                    component: function(resolve) {
                        require(['../views/staff/interns.vue'], resolve)
                    }
                }, {
                    path: '/ihr/staff/interns/view/:employeeId',
                    name: 'internsView',
                    component: function(resolve) {
                        require(['../views/staff/employeeView.vue'], resolve)
                    },
                    meta: {extra: '/ihr/staff/interns'}
                }, {
                    path: '/ihr/staff/interns/add',
                    name: 'internsAdd',
                    component: function(resolve) {
                        require(['../views/staff/internsUpdate.vue'], resolve)
                    },
                    meta: {extra: '/ihr/staff/interns'}
                }, {
                    path: '/ihr/staff/interns/edit/:employeeId',
                    name: 'internsEdit',
                    component: function(resolve) {
                        require(['../views/staff/internsUpdate.vue'], resolve)
                    },
                    meta: {extra: '/ihr/staff/interns'}
                }, {
                    path: '/ihr/staff/interns/internsResign/:employeeId',
                    name: 'internsResign',
                    component: function(resolve) {
                        require(['../views/staff/internsResign.vue'], resolve)
                    },
                    meta: {extra: '/ihr/staff/interns'}
                }, {
                    path: '/ihr/staff/interns/internsJoinCompany/:employeeId',
                    name: 'internsJoinCompany',
                    component: function(resolve) {
                        require(['../views/staff/internsJoinCompany.vue'], resolve)
                    },
                    meta: {extra: '/ihr/staff/interns'}
                }, {
                    path: '/ihr/staff/outsource',
                    name: 'outsource',
                    component: function(resolve) {
                        require(['../views/staff/outsource.vue'], resolve)
                    }
                }, {
                    path: '/ihr/staff/outsource/view/:employeeId',
                    name: 'outsourceView',
                    component: function(resolve) {
                        require(['../views/staff/employeeView.vue'], resolve)
                    },
                    meta: {extra: '/ihr/staff/outsource'}
                }, {
                    path: '/ihr/staff/outsource/add',
                    name: 'outsourceAdd',
                    component: function(resolve) {
                        require(['../views/staff/internsUpdate.vue'], resolve)
                    },
                    meta: {extra: '/ihr/staff/outsource'}
                }, {
                    path: '/ihr/staff/outsource/edit/:employeeId',
                    name: 'outsourceEdit',
                    component: function(resolve) {
                        require(['../views/staff/internsUpdate.vue'], resolve)
                    },
                    meta: {extra: '/ihr/staff/outsource'}
                }, {
                    path: '/ihr/staff/outsource/terminate/:employeeId',
                    name: 'terminate',
                    component: function(resolve) {
                        require(['../views/staff/internsResign.vue'], resolve)
                    },
                    meta: {extra: '/ihr/staff/outsource'}
                }, {
                    path: '/ihr/staff/employees',
                    name: 'employees',
                    component: function(resolve) {
                        require(['../views/staff/employees.vue'], resolve)
                    }
                }, {
                    path: '/ihr/staff/employees/resignedEmployees',
                    name: 'resignedEmployees',
                    component: function(resolve) {
                        require(['../views/staff/employees/resignedEmployees.vue'], resolve)
                    }
                }, {
                    path: '/ihr/staff/employees/resignedEmployees/edit/:employeeId',
                    name: 'resignedEmployeeEdit',
                    component: function(resolve) {
                        require(['../views/staff/internsUpdate.vue'], resolve)
                    },
                    meta: {extra: '/ihr/staff/employees/resignedEmployees'}
                }, {
                    path: '/ihr/staff/employees/resignedEmployees/:employeeId',
                    name: 'resignedEmployeesView',
                    component: function(resolve) {
                        require(['../views/staff/employeeView.vue'], resolve)
                    },
                    meta: {extra: '/ihr/staff/employees/resignedEmployees'}
                }, {
                    path: '/ihr/staff/employees/regularEmployees',
                    name: 'regularEmployees',
                    component: function(resolve) {
                        require(['../views/staff/employees/regularEmployees.vue'], resolve)
                    }
                }, {
                    path: '/ihr/staff/employees/regularEmployees/add',
                    name: 'employeeAdd',
                    component: function(resolve) {
                        require(['../views/staff/internsUpdate.vue'], resolve)
                    },
                    meta: {extra: '/ihr/staff/employees/regularEmployees'}
                }, {
                    path: '/ihr/staff/employees/regularEmployees/edit/:employeeId',
                    name: 'employeeEdit',
                    component: function(resolve) {
                        require(['../views/staff/internsUpdate.vue'], resolve)
                    },
                    meta: {extra: '/ihr/staff/employees/regularEmployees'}
                }, {
                    path: '/ihr/staff/employees/regularEmployees/terminate/:employeeId',
                    name: 'empTerminate',
                    component: function(resolve) {
                        require(['../views/staff/internsResign.vue'], resolve)
                    },
                    meta: {extra: '/ihr/staff/employees/regularEmployees'}
                }, {
                    path: '/ihr/staff/employees/regularEmployees/view/:employeeId',
                    name: 'regularEmployeesView',
                    component: function(resolve) {
                        require(['../views/staff/employeeView.vue'], resolve)
                    },
                    meta: {extra: '/ihr/staff/employees/regularEmployees'}
                }, {
                    path: '/ihr/staff/employees/employeesOnProbation',
                    name: 'employeesOnProbation',
                    component: function(resolve) {
                        require(['../views/staff/employees/employeesOnProbation.vue'], resolve)
                    }
                }, {
                    path: '/ihr/staff/employees/employeesOnProbation/:employeeId',
                    name: 'employeesOnProbationView',
                    component: function(resolve) {
                        require(['../views/staff/employeeView.vue'], resolve)
                    },
                    meta: {extra: '/ihr/staff/employees/employeesOnProbation'}
                }, {
                    path: '/ihr/staff/employees/employeesOnProbation/completeProbation/:employeeId',
                    name: 'completeProbation',
                    component: function(resolve) {
                        require(['../views/staff/employees/completeProbation.vue'], resolve)
                    },
                    meta: {extra: '/ihr/staff/employees/employeesOnProbation'}
                }, {
                    path: '/ihr/staff/employees/employeesOnProbation/extendProbation/:employeeId',
                    name: 'extendProbation',
                    component: function(resolve) {
                        require(['../views/staff/employees/extendProbation.vue'], resolve)
                    },
                    meta: {extra: '/ihr/staff/employees/employeesOnProbation'}
                }, {
                    path: '/ihr/staff/employees/transferEmployee/:employeeId',
                    name: 'transferEmployee',
                    component: function(resolve) {
                        require(['../views/staff/employees/transferEmployee.vue'], resolve)
                    },
                    meta: {extra: '/ihr/staff/employees/regularEmployees'}
                }, {
                    path: '/ihr/staff/employees/promoteEmployee/:employeeId',
                    name: 'promoteEmployee',
                    component: function(resolve) {
                        require(['../views/staff/employees/promoteEmployee.vue'], resolve)
                    },
                    meta: {extra: '/ihr/staff/employees/regularEmployees'}
                }, {
                    path: '/ihr/staff/employees/partTimeRole/:employeeId',
                    name: 'partTimeRole',
                    component: function(resolve) {
                        require(['../views/staff/employees/partTimeRole.vue'], resolve)
                    },
                    meta: {extra: '/ihr/staff/employees/regularEmployees'},
                }, {
                    path: '/ihr/staff/employees/overseasPosting/:employeeId',
                    name: 'overseasPosting',
                    component: function(resolve) {
                        require(['../views/staff/employees/overseasPosting.vue'], resolve)
                    },
                    meta: {extra: '/ihr/staff/employees/regularEmployees'}
                },

                // --------------------- organization(组织机构) begin --------------

                {
                    path: '/ihr/organization/organizationSetting',
                    name: 'organizationSetting',
                    component: function(resolve) {
                        require(['../views/organization/organizationSetting.vue'], resolve)
                    }
                }, {
                    path: '/ihr/organization/organizationSetting/add/:oid',
                    name: 'add_organization',
                    component: function(resolve) {
                        require(['../views/organization/crud-organization.vue'], resolve)
                    }
                }, {
                    path: '/ihr/organization/organizationSetting/edit/:oid',
                    name: 'edit_organization',
                    component: function(resolve) {
                        require(['../views/organization/crud-organization.vue'], resolve)
                    }
                }, {
                    path: '/ihr/organization/organizationSetting/change/:oid',
                    name: 'change_organization',
                    component: function(resolve) {
                        require(['../views/organization/crud-organization.vue'], resolve)
                    }
                }, {
                    path: '/ihr/organization/organizationSetting/changeTir/:oid',
                    name: 'change_tir',
                    component: function(resolve) {
                        require(['../views/organization/change-tir.vue'], resolve)
                    }
                }, {
                    path: '/ihr/organization/organizationSetting/merge/:oid',
                    name: 'merge_organization',
                    component: function(resolve) {
                        require(['../views/organization/merge-organization.vue'], resolve)
                    }
                },
                {
                    path: '/ihr/organization/organizationSetting/annul/:oid',
                    name: 'annul_organization',
                    component: function(resolve) {
                        require(['../views/organization/annul-organization.vue'], resolve)
                    }
                },
                {
                    path: '/ihr/organization/organizationChart',
                    name: 'organizationChart',
                    component: function(resolve) {
                        require(['../views/organization/organizationChart.vue'], resolve)
                    }
                }, {
                    path: '/ihr/organization/organizationHistoryChart',
                    name: 'organizationHistoryChart',
                    component: function(resolve) {
                        require(['../views/organization/organizationHistoryChart.vue'], resolve)
                    }
                },
                //------------------------ end ----------------------------
                {
                    path: '/ihr/system/role',
                    name: 'role',
                    component: function(resolve) {
                        require(['../views/system/role.vue'], resolve)
                    }
                },
                {
                    path: '/ihr/system/role/add',
                    name: 'addRole',
                    component: function(resolve) {
                        require(['../views/system/roleUpdate.vue'], resolve)
                    }
                },
                {
                    path: '/ihr/system/role/edit',
                    name: 'editRole',
                    component: function(resolve) {
                        require(['../views/system/roleUpdate.vue'], resolve)
                    }
                },
                {
                    path: '/ihr/system/role/view/:roleId',
                    name: 'roleView',
                    component: function(resolve) {
                        require(['../views/system/roleView.vue'], resolve)
                    }
                },
                {
                    path: '/ihr/system/role/functionPermission/:roleId',
                    name: 'functionPermission',
                    component: function(resolve) {
                        require(['../views/system/roleFunctionPermission.vue'], resolve)
                    }
                },
                {
                    path: '/ihr/system/userPermissions',
                    name: 'userPermissions',
                    component: function(resolve) {
                        require(['../views/system/userPermissions.vue'], resolve)
                    }
                },
                {
                    path: '/ihr/system/userPermissions/add',
                    name: 'addUserPermissions',
                    component: function(resolve) {
                        require(['../views/system/userPermissionsUpdate.vue'], resolve)
                    }
                },
                {
                    path: '/ihr/system/userPermissions/edit/:userId',
                    name: 'editUserPermissions',
                    component: function(resolve) {
                        require(['../views/system/userPermissionsUpdate.vue'], resolve)
                    }
                },
                {
                    path: '/ihr/system/userPermissions/view',
                    name: 'viewUserPermissions',
                    component: function(resolve) {
                        require(['../views/system/userPermissionsView.vue'], resolve)
                    }
                },
                {
                    path: '/ihr/system/users',
                    name: 'users',
                    component: function(resolve) {
                        require(['../views/system/users.vue'], resolve)
                    }
                },
                {
                    path: '/ihr/system/users/add',
                    name: 'addUser',
                    component: function(resolve) {
                        require(['../views/system/userUpdate.vue'], resolve)
                    }
                },
                {
                    path: '/ihr/system/users/edit/:loginId',
                    name: 'editUser',
                    component: function(resolve) {
                        require(['../views/system/userUpdate.vue'], resolve)
                    }
                },
                {
                    path: '/ihr/system/menu',
                    name: 'menu',
                    component: function(resolve) {
                        require(['../views/system/menu.vue'], resolve)
                    }
                },
                {
                    path: '/ihr/system/processSettings',
                    name: 'processSettings',
                    component: function(resolve) {
                        require(['../views/system/processSettings.vue'], resolve)
                    }
                },
                {
                    path: '/ihr/system/processSettings/add',
                    name: 'addProcessSettings',
                    component: function(resolve) {
                        require(['../views/system/processSettingsUpdate.vue'], resolve)
                    },
                    meta: {extra: '/ihr/system/processSettings'}
                },
                {
                    path: '/ihr/system/processSettings/edit/:ptid',
                    name: 'editProcessSettings',
                    component: function(resolve) {
                        require(['../views/system/processSettingsUpdate.vue'], resolve)
                    },
                    meta: {extra: '/ihr/system/processSettings'}
                },
                {
                    path: '/ihr/system/processSettings/view/:ptid',
                    name: 'checkProcess',
                    component: function(resolve) {
                        require(['../views/system/checkProcess.vue'], resolve)
                    },
                    meta: {extra: '/ihr/system/processSettings'}
                },
                {
                    path: '/ihr/system/log',
                    name: 'log',
                    component: function(resolve) {
                        require(['../views/system/log.vue'], resolve)
                    }
                },
                {
                    path: '/ihr/system/loginlog',
                    name: 'loginlog',
                    component: function(resolve) {
                        require(['../views/system/loginlog.vue'], resolve)
                    }
                },
                {
                    path: '/ihr/system/mail',
                    name: 'mail',
                    component: function(resolve) {
                        require(['../views/system/mail.vue'], resolve)
                    }
                },
                {
                    path: '/ihr/system/mail/add',
                    name: 'addMail',
                    component: function(resolve) {
                        require(['../views/system/mailUpdate.vue'], resolve)
                    }
                },
                {
                    path: '/ihr/system/mail/edit/:mailId',
                    name: 'editMail',
                    component: function(resolve) {
                        require(['../views/system/mailUpdate.vue'], resolve)
                    }
                },
                {
                    path: '/ihr/system/dict',
                    name: 'dict',
                    component: function(resolve) {
                        require(['../views/system/dict.vue'], resolve)
                    }
                },
                {
                    path: '/ihr/system/dict/add',
                    name: 'addDict',
                    component: function(resolve) {
                        require(['../views/system/dictUpdate.vue'], resolve)
                    }
                },
                {
                    path: '/ihr/system/dict/edit/:dictId',
                    name: 'editDict',
                    component: function(resolve) {
                        require(['../views/system/dictUpdate.vue'], resolve)
                    }
                },
                {
                    path: '/ihr/system/job',
                    name: 'job',
                    component: function(resolve) {
                        require(['../views/system/job.vue'], resolve)
                    }
                },
                {
                    path: '/ihr/system/job/add',
                    name: 'addJob',
                    component: function(resolve) {
                        require(['../views/system/jobUpdate.vue'], resolve)
                    }
                },
                {
                    path: '/ihr/system/job/edit/:id',
                    name: 'editJob',
                    component: function(resolve) {
                        require(['../views/system/jobUpdate.vue'], resolve)
                    }
                },
                {
                    path: '/ihr/system/job/jobtrigger/:id',
                    name: 'jobTrigger',
                    component: function(resolve) {
                        require(['../views/system/jobTrigger.vue'], resolve)
                    }
                },
                {
                    path: '/ihr/system/trigger',
                    name: 'trigger',
                    component: function(resolve) {
                        require(['../views/system/trigger.vue'], resolve)
                    }
                },
                {
                    path: '/ihr/system/trigger/job',
                    name: 'triggerJob',
                    component: function(resolve) {
                        require(['../views/system/triggerJob.vue'], resolve)
                    }
                },
                {
                    path: '/ihr/system/trigger/add',
                    name: 'addTrigger',
                    component: function(resolve) {
                        require(['../views/system/triggerUpdate.vue'], resolve)
                    }
                },
                {
                    path: '/ihr/system/trigger/edit/:id',
                    name: 'editTrigger',
                    component: function(resolve) {
                        require(['../views/system/triggerUpdate.vue'], resolve)
                    }
                },
                {
                    path: '/ihr/reports/employeeClassification',
                    name: 'employeeClassification',
                    component: function(resolve) {
                        require(['../views/reports/employeeClassification.vue'], resolve)
                    }
                },
                {
                    path: '/ihr/reports/employeeTurnover',
                    name: 'employeeTurnover',
                    component: function(resolve) {
                        require(['../views/reports/employeeTurnover.vue'], resolve)
                    }
                },
                {
                    path: '/ihr/reports/employeeInformation',
                    name: 'employeeInformation',
                    component: function(resolve) {
                        require(['../views/reports/employeeInformation.vue'], resolve)
                    }
                },
                /***********************职位******************************/

                {
                    path: '/ihr/position/group',
                    name: 'group',
                    component: function(resolve) {
                        require(['../views/position/group.vue'], resolve)
                    }
                },
                {
                    path: '/ihr/position/group/add/:jobFamilyId/:jobFamilyName',
                    name: 'addGroup',
                    component: function(resolve) {
                        require(['../views/position/addGroup.vue'], resolve)
                    }
                },
                {
                    path: '/ihr/position/group/edit/:jobFamilyId',
                    name: 'editGroup',
                    component: function(resolve) {
                        require(['../views/position/addGroup.vue'], resolve)
                    }
                },
                {
                    path: '/ihr/position/title',
                    name: 'title',
                    component: function(resolve) {
                        require(['../views/position/title.vue'], resolve)
                    }
                },
                {
                    path: '/ihr/position/title/add/:jobFamilyId/:jobFamilyName',
                    name: 'addTitle',
                    component: function(resolve) {
                        require(['../views/position/addTitle.vue'], resolve)
                    }
                },
                {
                    path: '/ihr/position/title/edit/:standardJobId',
                    name: 'editTitle',
                    component: function(resolve) {
                        require(['../views/position/addTitle.vue'], resolve)
                    }
                },
                {
                    path: '/ihr/position/title/titleDetails/:id',
                    name: 'titleDetails',
                    component: function(resolve) {
                        require(['../views/position/titleDetails.vue'], resolve)
                    }
                },
                {
                    path: '/ihr/position/positionSetting',
                    name: 'positionSetting',
                    component: function(resolve) {
                        require(['../views/position/positionSetting.vue'], resolve)
                    }
                },
                {
                    path: '/ihr/position/positionSetting/add/:id/:orgShortName',
                    name: 'addPosition',
                    component: function(resolve) {
                        require(['../views/position/addPosition.vue'], resolve)
                    }
                },
                {
                    path: '/ihr/position/positionSetting/edit/:positionId/:orgShortName',
                    name: 'editPosition',
                    component: function(resolve) {
                        require(['../views/position/addPosition.vue'], resolve)
                    }
                },
                {
                    path: '/ihr/position/positionSetting/positionDetails/:positionId/:orgId',
                    name: 'positionDetails',
                    component: function(resolve) {
                        require(['../views/position/positionDetails.vue'], resolve)
                    }
                },
                { //creat on 2016-12-03
                    path: '/ihr/position/reportLineChart',
                    name: 'positionReportLineChart',
                    component: function(resolve) {
                        require(['../views/position/reportLineChart.vue'], resolve);
                    }
                },



                /******************************position end*****************************/


                {
                    path: '/ihr/performance/indicator',
                    name: 'indicator',
                    component: function(resolve) {
                        require(['../views/performance/indicator.vue'], resolve);
                    }
                },
                {
                    path: '/ihr/performance/indicator/add',
                    name: 'addIndicator',
                    component: function(resolve) {
                        require(['../views/performance/addIndicator.vue'], resolve);
                    }
                },
                {
                    path: '/ihr/performance/indicator/edit/:id',
                    name: 'editIndicator',
                    component: function(resolve) {
                        require(['../views/performance/addIndicator.vue'], resolve);
                    }
                },
                {
                    path: '/ihr/performance/reportLineTable',
                    name: 'reportLineTable',
                    component: function(resolve) {
                        require(['../views/performance/reportLineTable.vue'], resolve);
                    }
                },

                /*************************组织************************************/

                {
                    path: '/ihr/performance/orgPerformance/reportRelationship',
                    name: 'reportRelationship',
                    component: function(resolve) {
                        require(['../views/performance/reportManagement.vue'], resolve);
                    }
                },
                {
                    path: '/ihr/performance/orgPerformance/orgTemplate',
                    name: 'orgTemplate',
                    component: function(resolve) {
                        require(['../views/performance/orgTemplate.vue'], resolve);
                    }
                },
                {
                    path: '/ihr/performance/orgPerformance/orgTemplate/add/:id',
                    name: 'addOrgTemplate',
                    component: function(resolve) {
                        require(['../views/performance/addOrgTemplate.vue'], resolve);
                    }
                },
                {
                    path: '/ihr/performance/orgPerformance/orgTemplate/edit/:id',
                    name: 'editOrgTemplate',
                    component: function(resolve) {
                        require(['../views/performance/addOrgTemplate.vue'], resolve);
                    }
                },
                {
                    path: '/ihr/performance/orgPerformance/orgTemplate/:id',
                    name: 'viewOrgTemplate',
                    component: function(resolve) {
                        require(['../views/performance/viewOrgTemplate.vue'], resolve);
                    }
                },
                {
                    path: '/ihr/performance/orgPerformance/orgScheme',
                    name: 'orgScheme',
                    component: function(resolve) {
                        require(['../views/performance/orgScheme.vue'], resolve);
                    }
                },
                {
                    path: '/ihr/performance/orgPerformance/orgScheme/:step/:id',
                    name: 'orgSchemeView',
                    component: function(resolve) {
                        require(['../views/performance/orgSchemeView.vue'], resolve);
                    }
                },
                {
                    path: '/ihr/performance/orgPerformance/orgScheme/add/:step/:id/:orgType',
                    name: 'addOrgScheme',
                    component: function(resolve) {
                        require(['../views/performance/addOrgScheme.vue'], resolve);
                    }
                },
                {
                    path: '/ihr/performance/orgPerformance/orgScheme/edit/:step/:id/:orgType',
                    name: 'editOrgScheme',
                    component: function(resolve) {
                        require(['../views/performance/addOrgScheme.vue'], resolve);
                    }
                },
                {
                    path: '/ihr/performance/orgPerformance/orgScheme/manageOrgScheme/:step/:id/:orgType',
                    name: 'manageOrgScheme',
                    component: function(resolve) {
                        require(['../views/performance/manageOrgScheme.vue'], resolve);
                    }
                },
                {
                    path: '/ihr/performance/orgPerformance/orgScheme/viewPlanStatistics/:id/:status/:entrance',
                    name: 'viewPlanStatistics',
                    component: function(resolve) {
                        require(['../views/performance/viewPlanStatistics.vue'], resolve);
                    }
                },
                {
                    path: '/ihr/performance/orgPerformance/orgScheme/viewResultStatistics/:id',
                    name: 'viewResultStatistics',
                    component: function(resolve) {
                        require(['../views/performance/viewResultStatistics.vue'], resolve);
                    }
                },

                /************************新个人***************************************/

                {
                    path: '/ihr/performance/individualPerformance/individualTemplate',
                    name: 'individualTemplate',
                    component: function(resolve) {
                        require(['../views/performance/individualTemplate.vue'], resolve);
                    }
                },
                {
                    path: '/ihr/performance/individualPerformance/individualTemplate/add',
                    name: 'addIndividualTemplate',
                    component: function(resolve) {
                        require(['../views/performance/addIndividualTemplate.vue'], resolve);
                    }
                },
                {
                    path: '/ihr/performance/individualPerformance/individualTemplate/edit/:id',
                    name: 'editIndividualTemplate',
                    component: function(resolve) {
                        require(['../views/performance/addIndividualTemplate.vue'], resolve);
                    }
                },
                {
                    path: '/ihr/performance/individualPerformance/individualTemplate/:id',
                    name: 'viewIndividualTemplate',
                    component: function(resolve) {
                        require(['../views/performance/viewIndividualTemplate.vue'], resolve);
                    }
                },
                {
                    path: '/ihr/performance/individualPerformance/individualScheme',
                    name: 'individualScheme',
                    component: function(resolve) {
                        require(['../views/performance/individualScheme.vue'], resolve);
                    }
                },
                {
                    path: '/ihr/performance/individualPerformance/individualScheme/:step/:id',
                    name: 'individualSchemeView',
                    component: function(resolve) {
                        require(['../views/performance/individualSchemeView.vue'], resolve);
                    }
                },
                {
                    path: '/ihr/performance/individualPerformance/individualScheme/add/:step/:id',
                    name: 'addIndividualScheme',
                    component: function(resolve) {
                        require(['../views/performance/addIndividualScheme.vue'], resolve);
                    }
                },
                {
                    path: '/ihr/performance/individualPerformance/individualScheme/edit/:step/:id',
                    name: 'editIndividualScheme',
                    component: function(resolve) {
                        require(['../views/performance/addIndividualScheme.vue'], resolve);
                    }
                },
                {
                    path: '/ihr/performance/individualPerformance/individualScheme/manageIndividualScheme/:step/:id',
                    name: 'manageIndividualScheme',
                    component: function(resolve) {
                        require(['../views/performance/manageIndividualScheme.vue'], resolve);
                    }
                },
                {
                    path: '/ihr/performance/individualPerformance/individualScheme/individualViewPlanStatistics/:id/:status/:entrance',
                    name: 'individualViewPlanStatistics',
                    component: function(resolve) {
                        require(['../views/performance/individualViewPlanStatistics.vue'], resolve);
                    }
                },
                {
                    path: '/ihr/performance/individualPerformance/individualScheme/individualViewResultStatistics/:id',
                    name: 'individualViewResultStatistics',
                    component: function(resolve) {
                        require(['../views/performance/individualViewResultStatistics.vue'], resolve);
                    }
                },
                // /**********************************end******************************************/

                {
                    path: '/ihr/performance/annualPerformance',
                    name: 'annualPerformance',
                    component: function(resolve) {
                        require(['../views/performance/annualPerformance.vue'], resolve);
                    }
                },
                {
                    path: '/ihr/performance/annualPerformance/add/:step/:id',
                    name: 'addAnnualPerformance',
                    component: function(resolve) {
                        require(['../views/performance/addAnnualPerformance.vue'], resolve);
                    }
                },
                {
                    path: '/ihr/performance/annualPerformance/edit/:step/:id',
                    name: 'editAnnualPerformance',
                    component: function(resolve) {
                        require(['../views/performance/addAnnualPerformance.vue'], resolve);
                    }
                },
                {
                    path: '/ihr/performance/annualPerformance/viewFinalResult/:id',
                    name: 'viewFinalResult',
                    component: function(resolve) {
                        require(['../views/performance/viewFinalResult.vue'], resolve);
                    }
                },
                {
                    path: '/ihr/performance/annualPerformance/manageAnnual/:step/:id',
                    name: 'manageAnnual',
                    component: function(resolve) {
                        require(['../views/performance/manageAnnualPerformance.vue'], resolve);
                    }
                },
                {
                    path: '/ihr/performance/annualPerformance/:step/:id',
                    name: 'viewAnnual',
                    component: function(resolve) {
                        require(['../views/performance/viewAnnualPerformance.vue'], resolve);
                    }
                },

                {
                    path: '/ihr/bindloginid/view',
                    name: 'bindLoginID',
                    component: function(resolve) {
                        require(['../views/staff/bindLoginID.vue'], resolve)
                    }
                }
            ]
        },
        {
            path: '*',
            redirect: '/error'
        }
    ];
    return routes;
}
