
export default {
    indicatorName: {
        label: 'Indicator Name',
        required: true,
        whitespace: false,
    },
    unit: {
        label: 'Unit',
        required: true,
        whitespace: false,
    },
    weight: {
        label: 'Weight',
        required: true,
        whitespace: false,
        type: 'integer'
    },
    target: {
        label: 'Targets',
        required: true,
        whitespace: false,
        type: 'integer'
    },
    criteria: {
        label: 'Criteria/Formula',
        required: true,
        whitespace: false,
    },
    dataSources:{
      label:'Data Source Dept',
      required: true,
      whitespace: false,
    }
};
