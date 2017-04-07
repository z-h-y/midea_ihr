<style lang="less">

.ihr-roleFunctionPermission {
    position: relative;
    .panel-content-table {
        tr {
            vertical-align: top;
        }
    }
    .ui-collapsible-body {
        padding-top: 36px;
    }
    .ui-checkbox {
        width: 180px;
        float: left;
        margin-left: 30px;
        margin-bottom: 20px;
    }
    .ui-checkbox-label-text {
        font-size: 14px;
        color: #6a707d;
    }
    .c-2a3c59 {
        color: #2a3c59;
    }
    .c-72777c {
        color: #72777c;
    }
    .b-radius4 {
        border-radius: 4px;
    }
}

</style>

<template lang="html">

<div class="content-wrap b-radius4 bg-w ihr-roleFunctionPermission">
    <div class="panel pb35">
        <div class="panel-tit">
            <span class="c-2a3c59 f18">Fuctions Permission</span>
        </div>
        <div class="panel-content">
            <ui-collapsible :open="true" v-for="menu of parentMenus" :key="menu.id" :header="menu.menuName">
                <table class="panel-content-table">
                    <tr v-for="m in getChildNodes(menu)">
                        <td style="width:155px;" class="f14 c-72777c">
                            {{m.menuName}}
                        </td>
                        <td class="pl15">
                            <ui-checkbox :name="m.menuId" :model.sync="selIds" :value="m.menuId" checked :disabled="true" >View</ui-checkbox>
                        </td>
                    </tr>
                </table>
            </ui-collapsible>
        </div>
    </div>
    <div class="btn-group">
        <ui-button @click="cancel" class="btn-default-bd" type="flat">{{$t('button.back')}}</ui-button>
    </div>
</div>

</template>

<script>

import {
    default as Message
}
from '../../components/basic/message';
import {
    convert
}
from '../../util/assist.js';
export default {
    data() {
            return {
                menus: [],
                selIds: [],
                parentMenus: []
            };
        },
        computed: {},
        ready() {

        },
        attached() {},
        methods: {
            cancel() {
                    let _self = this;
                    _self.$router.go({
                        name: 'role'
                    });
                },
                getChildNodes: function(treeObj) {
                    let _self = this;
                    let list = [];
                    if (treeObj == null) return "";
                    for (var m of _self.menus.roleMenuList) {
                        if ((m.parentMenuId === null || m.parentMenuId === "") && treeObj.menuId === m.menuId) {
                            _self.recursionFn(list, m);
                        }
                    }
                    return list;
                },
                recursionFn: function(list, node) {
                    let _self = this;
                    let childList = _self.getChildList(node);
                    if (childList.length > 0) {
                        list.push(node);
                        for (var m of childList) {
                            _self.recursionFn(list, m);
                        }
                    } else {
                        list.push(node);
                    }
                },
                getChildList: function(node) {
                    let _self = this;
                    let nodeList = [];
                    for (var m of _self.menus.roleMenuList) {
                        if (m.parentMenuId === node.menuId) {
                            nodeList.push(m);
                        }
                    }
                    return nodeList;
                },
                getParentNode: function() {
                    let _self = this;
                    let urls = [];
                    for (var m of _self.menus.roleMenuList) {
                        if (m.parentMenuId === null || m.parentMenuId === "") {
                            urls.push(m)
                        }
                    }
                    _self.parentMenus = urls;
                },
                initMenus() {
                    for (var m of this.menus.roleMenuList) {
                        if ('Y' === m.isHadPower) {
                            this.selIds.push(m.menuId)
                        }
                    }
                    this.getParentNode();
                }

        },
        components: {},
        route: {
            data(transition) {
                let _self = this;
                let roleId = transition.to.params.roleId;
                this.$http.post('/system/role/findRoleResource', {
                    roleId: roleId
                }, {
                    emulateJSON: true
                }).then((response) => {
                    this.menus = response.data;
                    this.initMenus();
                });
            }
        }
};

</script>
