<template>
    <div id="app">
        <!-- <lineChart /> -->
        <div>
            <lineChart
                :labels="labels"
                :datasets="datasets"
                :maintainAspectRatio="false"
                :setHeightChart="setHeightChart"
                :disableLegend="disableLegend"
                positionDatalabels="top"
                minWidth="300"
            />
            <barChart
                :labels="labelsBarChart"
                :datasets="datasetsBarChart"
                :maintainAspectRatio="false"
                :setHeightChart="setHeightBarChart"
                :disableLegend="disableLegendBarChart"
                positionDatalabels="center"
                minWidth="600"
                axis="y"
                datalabelsPercent
                customTooltip
                :dataCustomTooltip="aa"
                customDatalabels
                :dataCustomDatalabels="aa"
            />
            <pieChart
                chartID="0001"
                :labels="labelsPieChart"
                :datasets="datasetsPieChart"
                :maintainAspectRatio="true"
                :disableLegend="false"
                positionDatalabels="center"
               
                datalabelsPercent
            
            />
            <!-- customTooltip
                :dataCustomTooltip="pie"
                customDatalabels
                :dataCustomDatalabels="pie" -->
        </div>
    </div>
</template>

<script>
import lineChart from './components/lineChart.vue'
import barChart from './components/barChart.vue'
import pieChart from './components/pieChart.vue'

export default {
    name: 'App',
    components: {
        lineChart,
        barChart,
        pieChart,
    },
    data() {
        return {
                    // pie
            pie: {
                // data:[
                //     { label:'รพ.1', sum_adjrw: '1', case_count: '11', compensation: '111' },
                //     { label:'รพ.2', sum_adjrw: '2', case_count: '22', compensation: '222' },
                //     { label:'รพ.3',sum_adjrw: '3', case_count: '33', compensation: '333' },
                // ],
                data: [
                    {
                        label: 'Votes1',
                        data: [
                            { label: 'รพ.1', sum_adjrw: '1Votes1รพ.1', case_count: '11', compensation: '111' },
                            { label: 'รพ.2', sum_adjrw: '2Votes1รพ.2', case_count: '22', compensation: '222' },
                            { label: 'รพ.3', sum_adjrw: '3Votes1รพ.3', case_count: '33', compensation: '333' },
                        ],
                    },
                    {
                        label: 'Votes2',
                        data: [
                            { label: 'รพ.1', sum_adjrw: '1Votes2รพ.1', case_count: '11', compensation: '111' },
                            { label: 'รพ.2', sum_adjrw: '2Votes2รพ.2', case_count: '22', compensation: '222' },
                            { label: 'รพ.3', sum_adjrw: '3Votes2รพ.3', case_count: '33', compensation: '333' },
                        ],
                    },
                ],
                index: [
                    { index: 'sum_adjrw', text: 'Sum AdjRW', unit: '' },
                    { index: 'case_count', text: 'จำนวนเคส', unit: 'เคส' },
                    { index: 'compensation', text: 'ค่าชดเชย', unit: 'บาท' },
                ],
            },
            labelsPieChart: ['รพ.1', 'รพ.2', 'รพ.3'],
            datasetsPieChart: [
                {
                    label: 'Votes1',
                    data: [400, 600, 500],
                    backgroundColor: ['#36a2eb', '#ff9f40', '#ff6384'],
                    labelColortext: '#1e1e1e', //default black
                },
                {
                    label: 'Votes2',
                    data: [600, 400, 500],
                    backgroundColor: ['#36a2eb', '#ff9f40', '#ff6384'],
                    labelColortext: '#1e1e1e', //default black
                },
            ],
            // line
            aa: {
                // data:[
                //     { label:'รพ.1', sum_adjrw: '1', case_count: '11', compensation: '111' },
                //     { label:'รพ.2', sum_adjrw: '2', case_count: '22', compensation: '222' },
                //     { label:'รพ.3',sum_adjrw: '3', case_count: '33', compensation: '333' },
                // ],
                data: [
                    {
                        label: 'Votes1',
                        data: [
                            { label: 'รพ.1', sum_adjrw: '1Votes1รพ.1', case_count: '11', compensation: '111' },
                            { label: 'รพ.2', sum_adjrw: '2Votes1รพ.2', case_count: '22', compensation: '222' },
                            { label: 'รพ.3', sum_adjrw: '3Votes1รพ.3', case_count: '33', compensation: '333' },
                        ],
                    },
                    {
                        label: 'Votes2',
                        data: [
                            { label: 'รพ.1', sum_adjrw: '1Votes2รพ.1', case_count: '11', compensation: '111' },
                            { label: 'รพ.2', sum_adjrw: '2Votes2รพ.2', case_count: '22', compensation: '222' },
                            { label: 'รพ.3', sum_adjrw: '3Votes2รพ.3', case_count: '33', compensation: '333' },
                        ],
                    },
                ],
                index: [
                    { index: 'sum_adjrw', text: 'Sum AdjRW', unit: '' },
                    { index: 'case_count', text: 'จำนวนเคส', unit: 'เคส' },
                    { index: 'compensation', text: 'ค่าชดเชย', unit: 'บาท' },
                ],
            },
            setHeightChart: '200',
            showDatalabels: true,
            disableLegend: true,
            labels: ['red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [
                {
                    label: 'Votes',
                    data: [7, 8, 9, 10, 11, 12],
                    lineWidth: 1,
                    lineColor: 'green',
                    labelColor: 'Yellow',
                    labelColortext: 'pink', //default black
                },
                {
                    label: 'Votes',
                    data: [1, 2, 3, 4, 5, 6],
                    lineColor: 'red',
                    labelColor: 'blue',
                    labelColortext: 'red',
                },
                {
                    label: 'Votes',
                    data: [13, 14, 15, 16, 17, 18],
                    lineColor: 'red',
                    labelColor: 'blue',
                    labelColortext: 'red',
                },
                {
                    label: 'Votes',
                    data: [19, 20, 21, 22, 23, 24],
                    lineColor: 'red',
                    labelColor: 'blue',
                    labelColortext: 'red',
                },
            ],
            // bar
            setHeightBarChart: '600',
            showDatalabelsBarChart: true,
            disableLegendBarChart: true,
            labelsBarChart: ['รพ.1', 'รพ.2', 'รพ.3'],
            datasetsBarChart: [
                {
                    label: 'Votes1',
                    data: [400, 600, 500],
                    backgroundColor: ['#003eff', '#003eff', '#003eff'],
                    labelColortext: '#1e1e1e', //default black
                },
                // {
                //     label: 'Votes2',
                //     data: [600, 400, 500],
                //     backgroundColor: ['#ff2d00', '#ff2d00', '#ff2d00'],
                //     labelColortext: '#1e1e1e', //default black
                // },
            ],
            // pie
            labelspie: ['red', 'blue', 'green'],
            datasetspie: [
                {
                    backgroundColor: '#ff2d00',
                    data: 500,
                },
                {
                    backgroundColor: '#003eff',
                    data: 500,
                },
                {
                    backgroundColor: '#00ff32',
                    data: 500,
                },
            ],
        }
    },
}
</script>

<style></style>
