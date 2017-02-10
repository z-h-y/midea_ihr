<template lang="html">
  <ui-modal id="select-menu " :show.sync="show.modal" transition="ui-modal-fade" header="Select Menu">
      <div class="select-cnt">
          <tree :data="regions" :level-config="levelConfig" :show-checkbox="showCheckbox" v-ref:tree :click-node="clickNode" :dblclick-node="dblclickNode"></tree>
      </div>
      <div slot="footer">
          <ui-button color="primary" @click="yes">Confirm</ui-button>
          <ui-button @click="show.modal = false">Cancel</ui-button>
      </div>
  </ui-modal>
</template>

<script type="text/ecmascript-6">
import {
    Datashaping
}
from '../../util/assist.js';
export default {
    props: {
        show: {}
    },
    data() {
        let _self = this;
        return {
            selData: {},
            regions: [],
            levelConfig: {
                labelProperty: 'menuName',
                recursive: true
            },
            showCheckbox: false,
            clickNode: function(node) {
                _self.selData = node; //树节点对象
            }
        }
    },
    ready() {
        this.$http.post('/system/menu/list').then((response) => {
            this.regions = Datashaping(response.json(), {
                orderBy: 'order_no',
                sorting: -1
            });
            this.menus = response.json();
        });
    },
    methods: {
        yes() {
            let _self = this;
            _self.show.modal = false;
            _self.$dispatch('menuselector', _self.selData);
        },
        dblclickNode() {
            this.yes();
        }
    },
    components: {
      Tree: require('../tree/tree.vue')
    }
}

</script>
