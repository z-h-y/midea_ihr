<template lang="html">
  <div class="">
    <div class="btn-group">
        <ui-button color="primary mr10" @click="submitForm" :loading="loading">{{$t('button.submit')}}</ui-button>
        <ui-button class="btn-default-bd" @click="cancel" type="flat">{{$t('button.cancel')}}</ui-button>
    </div>
    <ui-confirm :title="show.confirmedhd" @confirm="confirmed" :show="show.confirmed" close-on-confirm autofocus="confirm-button">
        {{ show.confirmedText }}
    </ui-confirm>
  </div>
</template>

<script>
export default {
  props: {
    formConfirmed: {
      type: Function,
      required: true
    },
    formCancel: {
      type: Function,
      required: true
    },
    isFormValidate: {
      type: Function,
      default() {
        return function() {};
      }
    }
  },
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
