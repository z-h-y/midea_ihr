<template lang="html">
  <tree :data="regions" :level-config="levelConfig" :show-checkbox="showCheckbox" v-ref:tree :click-node.sync="clickNode"></tree>
  <button @click="getCheckedNodes">getCheckedNodes</button>
  {{clickNode | json}}
</template>

<script>
export default {
  data() {
    return {
      regions: [],
      levelConfig: {
        labelProperty: 'menuName',
        recursive: true
      },
      showCheckbox: true,
      clickNode: {}
    };
  },
  computed: {},
  ready() {
  },
  attached() {},
  methods: {
    getCheckedNodes() {
      console.log(this.$refs.tree.getCheckedNodes(true));
    }
  },
  components: {}
};
</script>

<style lang="css">
</style>
