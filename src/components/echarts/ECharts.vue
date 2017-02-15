<style>



</style>

<template>

<div class="echarts">
</div>

</template>

<script>

// import echarts from 'echarts'
let echarts = require('echarts/lib/echarts');
// 引入折现图
require('echarts/lib/chart/line');
require('echarts/lib/chart/bar');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/toolbox');

var colorPalette = [
    '#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80',
    '#8d98b3', '#e5cf0d', '#97b552', '#95706d', '#dc69aa',
    '#07a2a4', '#9a7fd1', '#588dd5', '#f5994e', '#c05050',
    '#59678c', '#c9ab00', '#7eb00a', '#6f5553', '#c14089'
];


var theme = {
    color: colorPalette,

    title: {
        textStyle: {
            fontWeight: 'normal',
            color: '#008acd'
        }
    },

    visualMap: {
        itemWidth: 15,
        color: ['#5ab1ef', '#e0ffff']
    },

    toolbox: {
        iconStyle: {
            normal: {
                borderColor: colorPalette[0]
            }
        }
    },

    tooltip: {
        backgroundColor: 'rgba(50,50,50,0.5)',
        axisPointer: {
            type: 'line',
            lineStyle: {
                color: '#008acd'
            },
            crossStyle: {
                color: '#008acd'
            },
            shadowStyle: {
                color: 'rgba(200,200,200,0.2)'
            }
        }
    },

    dataZoom: {
        dataBackgroundColor: '#efefff',
        fillerColor: 'rgba(182,162,222,0.2)',
        handleColor: '#008acd'
    },

    grid: {
        borderColor: '#eee'
    },

    categoryAxis: {
        axisLine: {
            lineStyle: {
                color: '#008acd'
            }
        },
        splitLine: {
            lineStyle: {
                color: ['#eee']
            }
        }
    },

    valueAxis: {
        axisLine: {
            lineStyle: {
                color: '#008acd'
            }
        },
        splitArea: {
            show: true,
            areaStyle: {
                color: ['rgba(250,250,250,0.1)', 'rgba(200,200,200,0.1)']
            }
        },
        splitLine: {
            lineStyle: {
                color: ['#eee']
            }
        }
    },

    timeline: {
        lineStyle: {
            color: '#008acd'
        },
        controlStyle: {
            normal: {
                color: '#008acd'
            },
            emphasis: {
                color: '#008acd'
            }
        },
        symbol: 'emptyCircle',
        symbolSize: 3
    },

    line: {
        smooth: true,
        symbol: 'emptyCircle',
        symbolSize: 3
    },

    candlestick: {
        itemStyle: {
            normal: {
                color: '#d87a80',
                color0: '#2ec7c9',
                lineStyle: {
                    color: '#d87a80',
                    color0: '#2ec7c9'
                }
            }
        }
    },

    scatter: {
        symbol: 'circle',
        symbolSize: 4
    },

    map: {
        label: {
            normal: {
                textStyle: {
                    color: '#d87a80'
                }
            }
        },
        itemStyle: {
            normal: {
                borderColor: '#eee',
                areaColor: '#ddd'
            },
            emphasis: {
                areaColor: '#fe994e'
            }
        }
    },

    graph: {
        color: colorPalette
    },

    gauge: {
        axisLine: {
            lineStyle: {
                color: [
                    [0.2, '#2ec7c9'],
                    [0.8, '#5ab1ef'],
                    [1, '#d87a80']
                ],
                width: 10
            }
        },
        axisTick: {
            splitNumber: 10,
            length: 15,
            lineStyle: {
                color: 'auto'
            }
        },
        splitLine: {
            length: 22,
            lineStyle: {
                color: 'auto'
            }
        },
        pointer: {
            width: 5
        }
    }
};

echarts.registerTheme('macarons', theme);

// enumerated ECharts events for now
const ACTION_EVENTS = [
    'legendselectchanged',
    'legendselected',
    'legendunselected',
    'datazoom',
    'datarangeselected',
    'timelinechanged',
    'timelineplaychanged',
    'restore',
    'dataviewchanged',
    'magictypechanged',
    'pieselectchanged',
    'pieselected',
    'pieunselected',
    'mapselectchanged',
    'mapselected',
    'mapunselected'
]

const MOUSE_EVENTS = [
    'click',
    'dblclick',
    'mouseover',
    'mouseout',
    'mousedown',
    'mouseup',
    'globalout'
]

export default {
    props: ['options', 'theme', 'initOptions', 'group'],
    data: function() {
        return {
            chart: null
        }
    },
    computed: {
        // Only recalculated when accessed from JavaScript.
        // Won't update DOM on value change because getters
        // don't depend on reactive values
        width: {
            cache: false,
            getter: function() {
                return this.chart.getWidth()
            }
        },
        height: {
            cache: false,
            getter: function() {
                return this.chart.getHeight()
            }
        },
        isDisposed: {
            cache: false,
            getter: function() {
                return this.chart.isDisposed()
            }
        }
    },
    methods: {
        // provide a explicit merge option method
        mergeOptions: function(options) {
            this.chart.setOption(options)
        },
        // just delegates ECharts methods to Vue component
        resize: function() {
            this.chart.resize()
        },
        dispatchAction: function(payload) {
            this.chart.dispatchAction(payload)
        },
        showLoading: function() {
            this.chart.showLoading()
        },
        hideLoading: function() {
            this.chart.hideLoading()
        },
        getDataURL: function() {
            return this.chart.getDataURL()
        },
        clear: function() {
            this.chart.clear()
        },
        dispose: function() {
            this.chart.dispose()
        }
    },
    mounted: function() {
      this.$nextTick(function() {
        let chart = echarts.init(this.$el, this.theme, this.initOptions)
            // use assign statements to tigger "options" and "group" setters
        chart.setOption(this.options)
        this.$watch('options', options => {
            chart.setOption(options, true)
        }, {
            deep: true
        })

        chart.group = this.group
        this.$watch('group', (group) => {
            chart.group = group
        })

        // expose ECharts events as custom events
        ACTION_EVENTS.forEach(event => {
                chart.on(event, params => {
                    this.$dispatch(event, params)
                })
            })
            // mouse events of ECharts should be renamed to prevent
            // name collision with DOM events
        MOUSE_EVENTS.forEach(event => {
            chart.on(event, params => {
                this.$dispatch('chart' + event, params)
            })
        })

        this.chart = chart
        window.addEventListener('resize', function() {
            chart.resize();
        });

        document.getElementById('menuExpanded').addEventListener('click', function() {
            var timer;
            clearTimeout(timer);
            timer = setTimeout(() => {
                chart.resize();
            }, 200);
        });
      })
    },
    connect: function(group) {
        if (typeof group !== 'string') {
            group = group.map(chart => chart.chart)
        }
        echarts.connect(group)
    },
    disconnect: function(group) {
        echarts.connect(group)
    },
    registerMap: function(name, geoData, area) {
        echarts.registerMap(name, geoData, area)
    },
    registerTheme: function(name, theme) {
        echarts.registerTheme(name, theme)
    }
}

</script>
