<template lang="html">
  <div>
      <button @click="getCheckedNodes">getCheckedNodes</button>
  </div>
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
  mounted() {
  },
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
