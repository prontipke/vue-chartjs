<template>
    <div>
        <div style="width: 100%; overflow-x: auto background-color:red;">
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
        if (precision === 0 && found.threshold !== 1) {
            formatted = (num / found.threshold).toFixed(1) + found.suffix
        } else {
            formatted = (num / found.threshold).toFixed(precision) + found.suffix
        }
        return formatted
    }
    return num
}

function setDatasets(dataset) {
    const mapDataset = dataset.map((e) => {
        return {
            label: e.label,
            data: e.data,
            borderWidth: e.lineWidth !== undefined ? e.lineWidth : 2,
            backgroundColor: e.backgroundColor,
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
            default: '', // active when maintainAspectRatio = false
        },
        responsive: {
            type: Boolean,
            default: true,
        },
        // set title
        title: {
            // ข้อความ title
            type: String,
            default: '', // if unset display = false
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
            default: '', // if unset display = false
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
            default: '', // if unset display = false
        },
        // set Datalabels
        disableDatalabels: {
            type: Boolean,
            default: false,
        },
        positionDatalabels: {
            type: String,
            default: 'top', // center,top,bottom,left,right
        },
        font: {
            type: String,
            default: 'Prompt',
        },
        // set tooltip
        disableTooltip: {
            type: Boolean,
            default: false,
        },
        isLabelBackground: {
            type: Boolean,
            default: false,
            // ใส่เมื่อต้องการสี true
        },
        prependUnit: {
            type: String,
            default: '',
        },
        precision: {
            type: Number,
            default: 2,
        },
        stacked: {
            type: Boolean,
            default: false,
        },
        datalabelsPercent: {
            type: Boolean,
            default: false,
        },
        //custom show tooltip
        customTooltip: {
            type: Boolean,
            default: false,
        },
        dataCustomTooltip: {
            type: Object,
            default: () => {},
        },
        customDatalabels: {
            type: Boolean,
            default: false,
        },
        dataCustomDatalabels: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            chart: null,
            sumStacked: [],
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
        sumAll() {
            let sumStacked = []
            if (this.stacked && this.datalabelsPercent) {
                sumStacked = this.datasets.length !== 0 ? Array(this.datasets[0].data.length).fill(0) : []
                for (let index = 0; index < this.datasets.length; index++) {
                    for (let index2 = 0; index2 < this.datasets[index].data.length; index2++) {
                        sumStacked[index2] = sumStacked[index2] + this.datasets[index].data[index2]
                    }
                }
                this.sumStacked = sumStacked
            } else if (!this.stacked && this.datalabelsPercent) {
                sumStacked = Array(this.datasets.length).fill(0)
                for (let index = 0; index < this.datasets.length; index++) {
                    for (let index2 = 0; index2 < this.datasets[index].data.length; index2++) {
                        sumStacked[index] = sumStacked[index] + this.datasets[index].data[index2]
                    }
                }
                this.sumStacked = sumStacked
            }
        },
        createChart() {
            const datasets = setDatasets(this.datasets)
            const setPositionLabels = setPositionDatalabels(this.positionDatalabels)
            const isLabelBackground = this.isLabelBackground
            const prependUnit = this.prependUnit
            this.sumAll()

            const self = this

            const ctx = document.getElementById(this.chartID)
            this.chart = new Chartjs(ctx.getContext('2d'), {
                type: 'pie',

                plugins: [ChartDataLabels],
                data: {
                    labels: this.labels,
                    datasets: datasets,
                },
                options: {
                    responsive: this.responsive, // # ปรับขนาดแบบ Responsesive
                    resizeDelay: 1, // # ใช้กำหนดเวลาเมื่อ Chart Resize (ms)
                    locale: 'th',
                    plugins: {
                        title: {
                            display: this.title !== '',
                            text: this.title,
                            position: this.titlePosition,
                            align: this.titleAlign,
                            padding: 5,
                            font: { weight: 300, size: 16, family: this.font },
                        },
                        subtitle: {
                            display: this.subtitle !== '',
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
                                display: this.legendTitle !== '',
                                text: this.legendTitle,
                                padding: 5,
                                labels: { font: { weight: 300, size: 14, family: this.font } },
                            },
                        },
                        datalabels: {
                            display: !this.disableDatalabels, // set show
                            color: function (context) {
                                return context.dataset.labelColortext
                            },
                            backgroundColor: function (context) {
                                if (isLabelBackground) return context.dataset.backgroundColor
                                else return ''
                            },
                            formatter: function (data, dataSet) {
                                if (self.customDatalabels) {
                                    let listDatalabels = []
                                    if (self.datasets.length === 1) {
                                        const dataDatalabels = self.dataCustomDatalabels.data[0].data.find((element) => {
                                            return element.label === self.labels[dataSet.dataIndex]
                                        })
                                        for (let index = 0; index < self.dataCustomDatalabels.index.length; index++) {
                                            const text =
                                                self.dataCustomDatalabels.index[index].text +
                                                    dataDatalabels[self.dataCustomDatalabels.index[index].index].toLocaleString('en-US') +
                                                    ' ' +
                                                    self.dataCustomDatalabels.index[index].unit || ''
                                            listDatalabels.push(text)
                                        }
                                    } else if (self.datasets.length > 1) {
                                        const Datalabels = self.dataCustomDatalabels.data.find((element) => element.label === dataSet.dataset.label)
                                        const dataDatalabels = Datalabels.data.find((element) => element.label === self.labels[dataSet.dataIndex])
                                        for (let index = 0; index < self.dataCustomDatalabels.index.length; index++) {
                                            const text =
                                                self.dataCustomDatalabels.index[index].text +
                                                    dataDatalabels[self.dataCustomDatalabels.index[index].index].toLocaleString('en-US') +
                                                    ' ' +
                                                    self.dataCustomDatalabels.index[index].unit || ''
                                            listDatalabels.push(text)
                                        }
                                    }

                                    return listDatalabels
                                } else {
                                    const cal = (data * 100) / self.sumStacked[dataSet.datasetIndex]
                                    if (self.stacked && self.datalabelsPercent) {
                                        return formatNumber(isNaN(cal) ? 0 : cal) + ' %'
                                    } else if (!self.stacked && self.datalabelsPercent) {
                                        return formatNumber(isNaN(cal) ? 0 : cal) + ' %'
                                    } else {
                                        return formatNumber(data, self.precision) + prependUnit
                                    }
                                }
                            },
                            align: setPositionLabels.align,
                            anchor: setPositionLabels.anchor,
                            borderRadius: 4,
                            font: { weight: 300, size: 14, family: this.font },
                            padding: 3,
                        },
                        tooltip: {
                            enabled: !this.disableTooltip, // set show,
                            titleFont: { weight: 300, size: 14, family: this.font },
                            bodyFont: { weight: 300, size: 14, family: this.font },
                            footerFont: { weight: 300, size: 14, family: this.font },
                            callbacks: {
                                label: (context) => {
                                    if (self.customTooltip) {
                                        const listTooltip = []
                                        if (self.datasets.length === 1) {
                                            const dataDataTooltip = self.dataCustomTooltip.data[0].data.find((element) => element.label === context.label)
                                            for (let index = 0; index < self.dataCustomTooltip.index.length; index++) {
                                                const text =
                                                    self.dataCustomTooltip.index[index].text +
                                                        ' : ' +
                                                        dataDataTooltip[self.dataCustomTooltip.index[index].index].toLocaleString('en-US') +
                                                        ' ' +
                                                        self.dataCustomTooltip.index[index].unit || ''
                                                listTooltip.push(text)
                                            }
                                        }
                                        if (self.datasets.length > 1) {
                                            const DataTooltip = self.dataCustomTooltip.data.find((element) => element.label === context.dataset.label)
                                            const dataDataTooltip = DataTooltip.data.find((element) => element.label === context.label)
                                            for (let index = 0; index < self.dataCustomTooltip.index.length; index++) {
                                                const text =
                                                    self.dataCustomTooltip.index[index].text +
                                                        ' : ' +
                                                        dataDataTooltip[self.dataCustomTooltip.index[index].index].toLocaleString('en-US') +
                                                        ' ' +
                                                        self.dataCustomTooltip.index[index].unit || ''
                                                listTooltip.push(text)
                                            }
                                        }
                                        return listTooltip
                                    } else {
                                        let label = context.dataset.label || ''
                                        if (label) {
                                            label += ':'
                                        }
                                        label = label + context.formattedValue.toLocaleString('en-US') + prependUnit
                                        return label
                                    }
                                },
                            },
                        },
                    },
                    animation: true,
                    interaction: {
                        intersect: true,
                    },
                },
            })
        },
        async update() {
            const datasets = await setDatasets(this.datasets)
            this.chart.data.labels = this.labels
            this.chart.data.datasets = datasets
            await this.chart.update()
        },
    },
}
</script>

<style scoped></style>
