
import {
    default as Schema
} from '../schema/index';
export default new Schema({
    nickname: {
        label: 'UserName',
        required: true

    },
    password: {
        label: 'PassWord',
        required: true
    }
});
