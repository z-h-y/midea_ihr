

import {
    convert,
    getDictMapping,
    formatDate
}
from '../../util/assist.js';

export default {
	veteran: {
		  label:'veteran',
			default() {
				return  '1'; 
			},
			mapping: function() {
					return getDictMapping('PROCESS_SUBMIT_TYPE');
			}
	},
	employeeName:{
    required: true,
    whitespace: false
	},
	employeeId:{

	},
	countryScope:{
				multiSelect: false
	},
	suggestions:{
		label:'Suggestions'
	}
}
