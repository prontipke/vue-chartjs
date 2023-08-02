<template>
    <div>
        <div style="width: 100%; overflow-x: auto">
            <div :style="`min-width:${minWidth}px;margin-bottom:${minWidth === '' ? '' : 10}px;`">
                <canvas
                    :id="chartID"
                    :height="setHeightChart"
                ></canvas>
            </div>
        </div>
    </div>
</template>

<script>
import { uuid } from 'vue-uuid'
import Chartjs from 'chart.js/auto'
import ChartDataLabels from 'chartjs-plugin-datalabels'

// function set format number on lebel
function formatNumber(num, precision = 1) {
    const map = [
        { suffix: 'T', threshold: 1e12 },
        { suffix: 'B', threshold: 1e9 },
        { suffix: 'M', threshold: 1e6 },
        { suffix: 'K', threshold: 1e3 },
        { suffix: '', threshold: 1 },
    ]
    const found = map.find((x) => Math.abs(num) >= x.threshold)
    if (found) {
        let formatted = 0
        if (precision == 0 && found.threshold != 1) {
            formatted = (num / found.threshold).toFixed(1) + found.suffix
        } else {
            formatted = (num / found.threshold).toFixed(precision) + found.suffix
        }

        return formatted
    }
    return num
}

function setDatasets(dataset) {
    let mapDataset = dataset.map((e) => {
        return {
            label: e.label,
            data: e.data,
            borderWidth: e.lineWidth !== undefined ? e.lineWidth : 2,
            borderColor: e.lineColor,
            backgroundColor: e.labelColor,
            labelColortext: e.labelColortext !== undefined ? e.labelColortext : '#000000',
        }
    })
    return mapDataset
}

function setPositionDatalabels(position) {
    let setPosition = {
        align: 'center',
        anchor: 'center',
    }
    if (position === 'center') {
        setPosition = {
            align: 'center',
            anchor: 'center',
        }
    } else if (position === 'top') {
        setPosition = {
            align: 'end',
            anchor: 'end',
        }
    } else if (position === 'bottom') {
        setPosition = {
            align: 'start',
            anchor: 'start',
        }
    } else if (position === 'left') {
        setPosition = {
            align: 'left',
            anchor: 'center',
        }
    } else if (position === 'right') {
        setPosition = {
            align: 'right',
            anchor: 'center',
        }
    }
    return setPosition
}

export default {
    props: {
        chartID: {
            type: String,
            default: uuid.v4(),
        },
        labels: {
            type: Array,
            default: () => [],
        },
        datasets: {
            type: Array,
            default: () => [],
        },
        // set display chart
        minWidth: {
            type: String,
            default: '',
        },
        setHeightChart: {
            type: String,
            default: '500', // active when maintainAspectRatio = false
        },
        responsive: {
            type: Boolean,
            default: true,
        },
        maintainAspectRatio: {
            type: Boolean,
            default: true,
        },
        aspectRatio: {
            type: Number,
            default: 2, //1=square when maintainAspectRatio true
        },
        // set title
        title: {
            // ข้อความ title
            type: String,
            default: '', //if unset display = false
        },
        titlePosition: {
            // ใช้ในการกำหนดตำแหนงของ title
            type: String,
            default: 'top', // top,left,right,bottom
        },
        titleAlign: {
            type: String,
            default: 'center', // center,start,end
        },
        // set subtitle
        subtitle: {
            // ข้อความ subtitle
            type: String,
            default: '', //if unset display = false
        },
        subtitlePosition: {
            // ใช้ในการกำหนดตำแหนงของ subtitle
            type: String,
            default: 'top', // top,left,right,bottom
        },
        subtitleAlign: {
            type: String,
            default: 'center', // center,start,end
        },
        disableLegend: {
            type: Boolean,
            default: false,
        },
        // set legend
        legendPosition: {
            // ใช้ในการกำหนดตำแหนงของ Legent
            type: String,
            default: 'bottom', // top,left,right,bottom
        },
        legendAlign: {
            type: String,
            default: 'center', // center,start,end
        },
        legendTitle: {
            type: String,
            default: '', //if unset display = false
        },
        // set Datalabels
        disableDatalabels: {
            type: Boolean,
            default: false,
        },
        positionDatalabels: {
            type: String,
            default: 'top', //center,top,bottom,left,right
        },
        // set show Label Y and X
        disableLabelY: {
            // จะ disable label แกน y
            type: Boolean,
            default: false,
        },
        disableLabelX: {
            // จะ disable label แกน X
            type: Boolean,
            default: false,
        },
        // set font all
        font: {
            type: String,
            default: 'Prompt',
        },
        // set tooltip
        disableTooltip: {
            type: Boolean,
            default: false,
        },
        positionScalesX: {
            type: String,
            default: 'bottom',
        },
        positionScalesY: {
            type: String,
            default: 'left',
        },
        precision: {
            type: Number,
            default: 2,
        },
    },
    data() {
        return {
            chart: null,
        }
    },
    watch: {
        datasets() {
            this.update()
        },
    },
    mounted() {
        this.createChart()
    },
    methods: {
        createChart() {
            let datasets = setDatasets(this.datasets)
            let setPositionLabels = setPositionDatalabels(this.positionDatalabels)
            const self = this
            const ctx = document.getElementById(this.chartID)
            this.chart = new Chartjs(ctx.getContext('2d'), {
                type: 'line',
                plugins: [ChartDataLabels],
                data: {
                    labels: this.labels,
                    datasets: datasets,
                },
                options: {
                    responsive: this.responsive, // # ปรับขนาดแบบ Responsesive
                    maintainAspectRatio: this.maintainAspectRatio,
                    aspectRatio: this.aspectRatio, // # อัตราส่วน heigth : "aspectRatio"
                    resizeDelay: 1, // # ใช้กำหนดเวลาเมื่อ Chart Resize (ms)
                    locale: 'th',
                    layout: {
                        padding: {
                            top: 30,
                            right: 30,
                        },
                    },
                    plugins: {
                        title: {
                            display: this.title === '' ? false : true,
                            text: this.title,
                            position: this.titlePosition,
                            align: this.titleAlign,
                            padding: 5,
                            font: { weight: 300, size: 16, family: this.font },
                        },
                        subtitle: {
                            display: this.subtitle === '' ? false : true,
                            text: this.subtitle,
                            position: this.subtitlePosition,
                            align: this.subtitleAlign,
                            padding: 5,
                            font: { weight: 300, size: 16, family: this.font },
                        },
                        legend: {
                            position: this.legendPosition,
                            align: this.legendAlign,
                            display: !this.disableLegend, // # การแสดงข้อมูลที่โชว์ในตราง
                            labels: { font: { weight: 300, size: 16, family: this.font } },
                            title: {
                                // #  Title ของตราง legend
                                display: this.legendTitle === '' ? false : true,
                                text: this.legendTitle,
                                padding: 5,
                                labels: { font: { weight: 300, size: 14, family: this.font } },
                            },
                        },
                        datalabels: {
                            display: !this.disableDatalabels, //set show
                            color: function (context) {
                                return context.dataset.labelColortext
                            },
                            backgroundColor: function (context) {
                                return context.dataset.backgroundColor
                            },
                            formatter: function (data) {
                                return formatNumber(data, self.precision)
                            },
                            align: setPositionLabels.align,
                            anchor: setPositionLabels.anchor,
                            borderRadius: 4,
                            font: { weight: 300, size: 14, family: this.font },
                            padding: 3,
                        },
                        tooltip: {
                            enabled: !this.disableTooltip, //set show,
                            titleFont: { weight: 300, size: 14, family: this.font },
                            bodyFont: { weight: 300, size: 14, family: this.font },
                            footerFont: { weight: 300, size: 14, family: this.font },
                            callbacks: {
                                label: (context) => {
                                    let label = context.dataset.label || ''
                                    if (label) {
                                        label += ':'
                                    }
                                    label += context.formattedValue.toLocaleString('en-US')
                                    return label
                                },
                            },
                        },
                    },
                    animation: true,
                    interaction: {
                        intersect: true,
                    },
                    scales: {
                        x: {
                            position: this.positionScalesX,
                            stacked: false, // ตัวที่ทำให้เป็น Stack
                            display: !this.disableLabelX,
                            grid: {
                                display: true,
                            },
                            ticks: {
                                font: { weight: 300, size: 14, family: this.font },
                            },
                        },
                        y: {
                            position: this.positionScalesY,
                            beginAtZero: true,
                            stacked: false, // ตัวที่ทำให้เป็น Stack
                            display: !this.disableLabelY,
                            grid: {
                                display: true,
                            },
                            ticks: {
                                font: { weight: 300, size: 14, family: this.font },
                            },
                        },
                    },
                },
            })
        },
        async update() {
            let datasets = await setDatasets(this.datasets)
            this.chart.data.labels = this.labels
            this.chart.data.datasets = datasets
            await this.chart.update()
        },
    },
}
</script>

<style scoped></style>
