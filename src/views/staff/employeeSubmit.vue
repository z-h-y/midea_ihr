<template lang="html">
  <div class="btn-group">
      <ui-button color="primary mr10" @click="submitForm" :loading="loading">{{$t('button.submit')}}</ui-button>
      <ui-button class="btn-default-bd" @click="cancel" type="flat">{{$t('button.cancel')}}</ui-button>
  </div>
  <ui-confirm :header="show.confirmedhd" @confirmed="confirmed" :show.sync="show.confirmed" close-on-confirm autofocus="confirm-button">
      {{ show.confirmedText }}
  </ui-confirm>
</template>

<script>
export default {
  props: [
    {
        name: 'formConfirmed',
        type: Function,
        required: true
    },{
        name: 'formCancel',
        type: Function,
        required: true
    },{
      name: 'isFormValidate',
      type: Function,
      default() {
        return true;
      }
    }
  ],
  data() {
    return {
      show: {
        confirmed: false,
        confirmedhd: '',
        confirmedText: '',
        confirmedType: ''
      },
      loading: false
    };
  },
  computed: {},
  ready() {},
  attached() {},
  methods: {
    submitForm() {
      var passed = this.isFormValidate();
      if (!passed) {
        return;
      }
      this.formConfirmed();
      // this.show.confirmed = true;
      // this.show.confirmedhd = 'Submit';
      // this.show.confirmedText = 'Are you sure to submit?';
      // this.show.confirmedType = 'submit';
    },
    cancel() {
      this.formCancel();
      // this.show.confirmed = true;
      // this.show.confirmedhd = 'Cancel';
      // this.show.confirmedText = 'Cancel and back?';
      // this.show.confirmedType = 'cancel';
    },
    confirmed() {
      this.loading = true;
      switch (this.show.confirmedType) {
        case 'cancel':
          this.formCancel();
          break;
        case 'submit':
          this.formConfirmed();
          break;
      }
    }
  },
  components: {}
};
</script>

<style lang="css">
</style>
