<template lang="html">
  <ui-modal ref="modal" id="select-menu" :show.sync="show.modal" transition="ui-modal-fade" title="Select Menu">
      <div class="select-cnt">
          <tree :data="regions" :level-config="levelConfig" :show-checkbox="showCheckbox" ref="tree" :click-node="clickNode" :dblclick-node="dblclickNode"></tree>
      </div>
      <div slot="footer">
          <ui-button color="primary" @click="yes">{{$t('button.confirm')}}</ui-button>
          <ui-button @click="close">{{$t('button.cancel')}}</ui-button>
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
        show: {},
        handleComfirmed: {
            type: Function,
            default () {
                return function() {};
            }
        },
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
    mounted() {
        this.$http.post('/system/menu/list').then((response) => {
            this.regions = Datashaping(response.json(), {
                orderBy: 'order_no',
                sorting: -1
            });
            this.menus = response.json();
        });
    },
    methods: {
      open() {
          this.$refs['modal'].open();
        },
        close() {
          this.$refs['modal'].close()
        },
        yes() {
            this.close();
            this.handleComfirmed(this.selData)
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
