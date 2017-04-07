<style lang="css" scoped>

.main {
    transition: all 0.2s ease-out 0s;
    height: 100%;
    margin-left: 230px;
    min-width: 1119px;
    position: relative;
    z-index: 11;
}
.expanded-transitio{
  margin-left: 0;
}

</style>

<template lang="html">

<div class="main" id="main" :class="{'expanded-transitio': expanded}">
    <i-navbar></i-navbar>
    <breadcrumb>
        <breadcrumb-item v-for="item in urls" :key="item.id" :link="item.url">{{item.name}}</breadcrumb-item>
    </breadcrumb>
    <div id="content" class="content rel">
        <router-view></router-view>
    </div>
</div>

</template>

<script>

import iNavbar from './navbar.vue';
import Breadcrumb from '../components/nav/breadcrumb.vue';
import BreadcrumbItem from '../components/nav/breadcrumb-item.vue';
import Selectors from '../components/Selectors/index';
import Vuetable from '../components/table/Vuetable.vue';
import VuetablePagination from '../components/table/VuetablePagination.vue';

import UiCheckbox from '../components/keen-ui/UiCheckbox.vue';
import UiCollapsible from '../components/keen-ui/UiCollapsible.vue';
import UiIcon from '../components/keen-ui/UiIcon.vue';
import UiIconButton from '../components/keen-ui/UiIconButton.vue';
import UiMenu from '../components/keen-ui/UiMenu.vue';
import UiMenuOption from '../components/keen-ui/UiMenuOption.vue';
import UiPopover from '../components/keen-ui/UiPopover.vue';
import UiProgressCircular from '../components/keen-ui/UiProgressCircular.vue';
import UiProgressLinear from '../components/keen-ui/UiProgressLinear.vue';
import UiTab from '../components/keen-ui/UiTab.vue';
import UiTabs from '../components/keen-ui/UiTabs.vue';
import UiTooltip from '../components/keen-ui/UiTooltip.vue';

import { merge } from '../util/assist';
let Components = {
  Vuetable,
  VuetablePagination,
  // KUI
  UiCheckbox,
  UiCollapsible,
  UiIcon,
  UiIconButton,
  UiMenu,
  UiMenuOption,
  UiPopover,
  UiProgressCircular,
  UiProgressLinear,
  UiTab,
  UiTabs,
  UiTooltip
};
merge(Components,Selectors);
let initComponents = (Vue, components) => {
    if (!components) components = Object.keys(Components);
    components.forEach((key) => Vue.component(key, Components[key]));
};
initComponents(Vue);
export default {
    data() {
            return {};
        },
        props: {
            urls: {
                type: Array,
                default: []
            }
        },
        computed: {
          expanded () {
            return this.$store.state.main.expanded
          }
        },
        ready() {},
        attached() {},
        methods: {},
        components: {
            'iNavbar': iNavbar,
            Breadcrumb: Breadcrumb,
            BreadcrumbItem: BreadcrumbItem
        },
        events: {
            'main:initHomeView': function(expanded) {
                this.$broadcast('main:initHomeView', expanded);
            },
            'main:searchEmployeeView': function(searchText) {
                this.$broadcast('main:searchEmployeeView', searchText);
            }
        }
};

</script>
