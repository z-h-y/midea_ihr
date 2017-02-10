import Vue from 'vue';
let MessageConstructor = Vue.extend(require('./message.vue'));

let instance = {};
let instances = [];
let seed = 1;

let Message = (options) => {
    options = options || {};
    if (typeof options === 'string') {
        options = {
            message: options
        };
    }
    let userOnclone = options.onClose;
    let preid = 'message_'+ (seed-1);
    let id = 'message_' + seed++;

    options.onClose = () => {
        Message.close(id, userOnclone);
    };

    instance = new MessageConstructor({
        data: options
    });

    instance.id = id;
    instance.vm = instance.$mount();
    document.body.appendChild(instance.vm.$el);
    instance.vm.visible = true;
    instance.dom = instance.vm.$el;
    instances.push(instance);
    Message.close(preid);
};

Message.close = (id, userOnclone) => {
    for (let i = 0, len = instances.length; i < len; i++) {
        if (id === instances[i].id) {
            if (typeof userOnclone === 'function') {
                userOnclone([instances[i]]);
            }
            instances[i].vm.closed = true;
            instances.splice(i, 1);
            break;
        }
    }
};
export default Message;
