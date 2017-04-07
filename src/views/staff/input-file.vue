<template lang="html">
  <div class="upload-file-com">
    <input v-on:change="file" type="file" :name="name" value="" @change="change($event)" :accept="accept">
    <span class="button-name">Upload</span>
    <span class="file-name" :title="fileName">{{fileName}}</span>
    <i v-show="fileName || fileName === '0'" class="fa fa-trash-o" aria-hidden="true" @click="del"></i>
  </div>

</template>

<script>
export default {
  props: [
    {
      name: 'name',
      require: true
    },
    {
      name: 'fileName',
      default() {
        return '';
      }
    },
    {
      name: 'accept',
      default() {
        return '*';
      }
    },
    {
      name: 'changeFile',
      type: Function,
      default() {
        return function() {};
      }
    },
    {
      name: 'delFile',
      type: Function,
      default() {
        return function() {};
      }
    }
  ],
  data() {
    return {
      file: ''
    };
  },
  computed: {},
  mounted() {},
  
  methods: {
    change(e) {
      this.changeFile(e);
      var name = [];
      var files = Array.prototype.slice.call(e.srcElement.files, 0);
      files.forEach(function(item) {
        name.push(item.name);
      })
      this.fileName = name.join(',');
    },
    del() {
      this.fileName = '';
      this.file = '';
      this.delFile();
    }
  },
  components: {}
};
</script>

<style lang="css" scoped>
.upload-file-com {
  height: 28px;
  position: relative;
  overflow: hidden;
  padding-right: 20px;
}
input {
  position: absolute;
  opacity: 0;
  height: 28px;
  width: 160px;
  z-index: 2;
  top: 0;
  left: -80px;
  cursor: pointer;
}
span.button-name {
  position: absolute;
  z-index: 1;
  height: 28px;
  width: 80px;
  top: 0;
  left: 0;
  text-align: center;
  line-height: 28px;
  color: #fff;
  background-color: #6ec3ff;
}
span.file-name {
  position: absolute;
  width: 130px;
  height: 28px;
  line-height: 28px;
  margin-left: 90px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
i {
  position: absolute;
  right: 0;
  top: 6px;
  font-size: 16px;
  cursor: pointer;
}
</style>
