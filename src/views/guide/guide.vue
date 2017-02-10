<style lang="css">
</style>

<template lang="html">

<div class="content-wrap bde8 bg-w">
    <!-- 查询 -->
    <div class="p20 query">
        <div class="fix bg-w query-conditions">
            <ui-select class="uiSelect" name="option" label="Organization" :options="colorStrings"></ui-select>
            <ui-select class="uiSelect" name="option" label="Employement Name" :options="colorStrings"></ui-select>
            <ui-select class="uiSelect" name="option" label="Employement ID" :options="colorStrings"></ui-select>
            <ui-select class="uiSelect" name="option" label="Employes Status" :options="colorStrings"></ui-select>
            <ui-select class="uiSelect" name="option" label="Employement Category" :options="colorStrings"></ui-select>
            <div class="fix">
                <div class="ui-radio-label-text l">
                    <span>Part-time-Role</span>
                </div>
                <ui-radio-group class="radio-group" :options="options.group" :value.sync="favourite.group" name="favourite_1"></ui-radio-group>
            </div>
            <ui-button class="btn-shrink"><i class="fa fa-angle-double-down" aria-hidden="true"></i></ui-button>
            <div class="query-btn">
                <ui-button class="query-btn-search mr20" color="primary" @click = "loginMei">Search</ui-button>
                <ui-button class="query-btn-reset btn-default-bd" type="flat">Reset</ui-button>
            </div>
        </div>
    </div>
    <div class="content-main">
        <!-- 按钮 -->
        <div class="mb20 pl20 pt20 bte8">
            <div class="group">
                <ui-button class="mr10 dis-tc btn-primary-bd" @click="show.genericConfirm = true" color="primary" @click="onclick"><i class="fa fa-plus mr5"></i>ui-confirm</ui-button>
                <ui-button class="mr10 dis-tc btn-default-bd" @click="show.modal = true" icon="fa-plus" type="flat" text="xxxxxxx"></ui-button>
                <ui-button class="mr10 dis-tc btn-default-bd" :loading="loading.btn1" @click="onclickbtn" type="flat"><i class="fa fa-remove mr5"></i>Delete</ui-button>
                <ui-button class="dis-tc-t btn-default-bd" type="flat" has-dropdown-menu :menu-options="shareMenuOptions" open-dropdown-on="click" @menu-option-selected="menuOptionSelected">More <i class="fa fa-caret-down ml5"></i></ui-button>
                <!-- 询问框 -->
                <ui-confirm header="Delete" @confirmed="confirmed" @denied="denied" :show.sync="show.genericConfirm" close-on-confirm autofocus="confirm-button">
                    Do you want to confirm this?
                </ui-confirm>
                <!-- 弹框内容 -->
                <ui-modal :show.sync="show.modal" header="Scrolling Modal">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit maiores perspiciatis suscipit sit nemo. Similique dignissimos, quas nisi aperiam dolorum omnis tenetur impedit, cum eaque harum officia? Rerum ullam ratione non perferendis,
                        vel harum quam.</p>
                    <p>Provident iste, iusto adipisci, tenetur harum porro omnis sequi eveniet, accusantium facilis non ipsum. Excepturi deleniti tempore error atque aperiam quia dolorum perferendis. Libero accusamus dolor ipsam soluta impedit laboriosam
                        optio veritatis obcaecati atque, asperiores!</p>
                    <p>Quidem reprehenderit dolorem ducimus, expedita repellendus amet eaque voluptas molestiae debitis, adipisci obcaecati in nulla dolor eos ex illum. Quas molestiae dolores voluptatibus ullam et, quisquam nisi, consequuntur quod unde earum
                        corporis nam harum repellat.</p>
                    <p>Dolores sapiente saepe a explicabo quia possimus obcaecati quasi, quod asperiores dolore velit animi in eligendi incidunt, corporis at ut ipsum quos inventore quas suscipit tempore voluptatem voluptates. Quae dicta magni commodi sed,
                        nisi animi!
                    </p>
                </ui-modal>
            </div>
        </div>
        <!-- 表格 -->
        <div class="mb20 ml20 mr20 vuetable-wrapper">
            <vuetable api-url="http://vuetable.ratiw.net/api/users" :selected-to="selectedRow" pagination-path="" table-wrapper=".vuetable-wrapper" :fields="columns" :sort-order="sortOrder" :item-actions="itemActions" per-page="5">
            </vuetable>
        </div>
        <!-- 面板 -->
        <div class="mb20 ml20 mr20">
            <div class="panel">
                <div class="panel-tit">
                    <span>TO DO</span>
                    <a class="panel-more" href="">View All</a>
                </div>
                <div class="panel-content">
                    Panel content
                </div>
            </div>
        </div>
        <!-- 左右面板布局 -->
        <div class="mb20 ml20 mr20">
            <div class="leftRight-panel fix">
                <div class="left-panel p10">
                    树结构
                </div>
                <div class="right-panel p10">
                    表格数据
                </div>
            </div>
        </div>
    </div>
</div>

</template>

<script>
let dropdownOptions = [{
    id: 'edit',
    text: 'Edit',
    icon: 'edit',
    secondaryText: 'Ctrl+E'
}, {
    id: 'duplicate',
    text: 'Duplicate',
    icon: 'content_copy',
    secondaryText: 'Ctrl+D'
}, {
    // id: 'share',
    text: 'Share',
    icon: 'share',
    secondaryText: 'Ctrl+Shift+S',
    disabled: true
}, {
    type: 'divider'
}, {
    id: 'delete',
    text: 'Delete',
    icon: 'delete',
    secondaryText: 'Del'
}];

let group = [{
    value: 'yes',
    text: 'Yes'
}, {
    value: 'no',
    text: 'No'
}];
export default {
    data() {
            return {

                favourite: {
                    group: '',
                },
                options: {
                    group
                },
                tasks: [{
                    body: 'go to back',
                    completed: false
                }, {
                    body: 'go to company',
                    completed: true
                }, {
                    body: 'go to school',
                    completed: false
                }, ],
                colorStrings: ['Red', 'Blue', 'Green'],
                loading: {
                    btn1: false
                },
                show: {
                    genericConfirm: false,
                    modal: false
                },
                columns: [{
                        name: '__checkbox:id',
                        title: ''
                    },
                    'name',
                    'nickname',
                    'email',
                    'birthdate',
                    'gender',
                    '_actions'
                ],
                itemActions: [{
                    name: 'view-item',
                    label: '',
                    icon: 'zoom icon',
                    class: 'ui teal button'
                }, {
                    name: 'edit-item',
                    label: '',
                    icon: 'edit icon',
                    class: 'ui orange button'
                }, {
                    name: 'delete-item',
                    label: '',
                    icon: 'delete icon',
                    class: 'ui red button'
                }],

                shareMenuOptions: dropdownOptions,
                breadCrumbItem: []
            };
        },
        computed: {

        },
        ready() {
            this.$http.get('/data/breadcrumb.json').then((response) => {
                this.breadCrumbItem = response.json();
            }, (response) => {
                console.log('错误信息 ：' + response.statusText);
            });
        },
        attached() {},
        methods: {
            loginMei: function() {

              //  $.ajax({
              //   url: "http://10.16.72.88:8099/security/login",
              //   data: {
              //         username: "admin",
              //         password: "1"
              //   },
              //   success: function(response) {
              //
              //     console.log("1111111");
              //   }
              //  });
              this.$http.post('http://10.16.72.88:8099/security/login',{},
              {params:{username: "admin",password: "1"},emulateJSON:true}
              ).then((response) => {
                  this.oriMenus = response.json();
                  this.setUrls();
                  // this.menus = Datashaping(this.oriMenus);
              }, (response) => {
                  console.log('错误信息 ：' + response.statusText);
              });
            },
            toggleTask: function(task) {
                task.completed = !task.completed;
            },
            menuOptionSelected(option) {
                console.log('Selected', option.id);
            },
            onclickbtn() {
                this.loading.btn1 = true;
                let _this = this;
                setTimeout(function() {
                    _this.loading.btn1 = false;
                }, 2000);
            },
            viewProfile: function(id) {
                console.log('view profile with id:', id)
            },
            confirmed() {
                this.confirmResult = 'You confirmed the request.';
            },
            denied() {
                this.confirmResult = 'You denied the request.';
            }
        },
        events: {
            'vuetable:action': function(action, data) {
                console.log('vuetable:action', action, data)
                if (action == 'view-item') {
                    this.viewProfile(data.id)
                }
            },
            'vuetable:load-error': function(response) {
                console.log('Load Error: ', response)
            }
        }
};
</script>
