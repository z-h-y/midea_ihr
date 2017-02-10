export default {
    beforeEnter(el) {
        var ua = window.navigator.userAgent;
        var isSafari = ua.indexOf("Safari") != -1 && ua.indexOf("Version") != -1;
        if (isSafari) {
            return;
        };
        if (!el.dataset) {
            return;
        }
        el.dataset.oldPaddingTop = el.style.paddingTop;
        el.dataset.oldPaddingBottom = el.style.paddingBottom;
        el.style.height = '0';
        el.style.paddingTop = 0;
        el.style.paddingBottom = 0;
    },

    enter(el) {
        var ua = window.navigator.userAgent;
        var isSafari = ua.indexOf("Safari") != -1 && ua.indexOf("Version") != -1;
        if (isSafari) {
            return;
        };
        if (!el.dataset) {
            return;
        }
        el.dataset.oldOverflow = el.style.overflow;

        el.style.display = 'block';
        if (el.scrollHeight !== 0) {
            el.style.height = el.scrollHeight + 'px';
            el.style.paddingTop = el.dataset.oldPaddingTop;
            el.style.paddingBottom = el.dataset.oldPaddingBottom;
        } else {
            el.style.height = '';
            el.style.paddingTop = el.dataset.oldPaddingTop;
            el.style.paddingBottom = el.dataset.oldPaddingBottom;
        }

        el.style.overflow = 'hidden';
    },

    afterEnter(el) {
          var ua = window.navigator.userAgent;
          var isSafari = ua.indexOf("Safari") != -1 && ua.indexOf("Version") != -1;
          if (isSafari) {
              return;
          };

            if (!el.dataset) {
                return;
            }
            el.style.display = '';
            el.style.height = '';
            el.style.overflow = el.dataset.oldOverflow;
    },

    beforeLeave(el) {
        var ua = window.navigator.userAgent;
        var isSafari = ua.indexOf("Safari") != -1 && ua.indexOf("Version") != -1;
        if (isSafari) {
            return;
        };
        if (!el.dataset) {
            return;
        }
        el.dataset.oldPaddingTop = el.style.paddingTop;
        el.dataset.oldPaddingBottom = el.style.paddingBottom;
        el.dataset.oldOverflow = el.style.overflow;

        el.style.display = 'block';
        if (el.scrollHeight !== 0) {
            el.style.height = el.scrollHeight + 'px';
        }
        el.style.overflow = 'hidden';
    },

    leave(el) {
        var ua = window.navigator.userAgent;
        var isSafari = ua.indexOf("Safari") != -1 && ua.indexOf("Version") != -1;
        if (isSafari) {
            return;
        };
        if (!el.dataset) {
            return;
        }
        if (el.scrollHeight !== 0) {
            setTimeout(() => {
                el.style.height = 0;
                el.style.paddingTop = 0;
                el.style.paddingBottom = 0;
            });
        }
    },

    afterLeave(el) {
        var ua = window.navigator.userAgent;
        var isSafari = ua.indexOf("Safari") != -1 && ua.indexOf("Version") != -1;
        if (isSafari) {
            return;
        };
        if (!el.dataset) {
            return;
        }
        el.style.display = el.style.height = '';
        el.style.overflow = el.dataset.oldOverflow;
        el.style.paddingTop = el.dataset.oldPaddingTop;
        el.style.paddingBottom = el.dataset.oldPaddingBottom;
    }
};
