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
                positionDatalabels="top"
                minWidth="600"
                axis="y"
            />
        </div>
    </div>
</template>

<script>
import lineChart from './components/lineChart.vue'
import barChart from './components/barChart.vue'

export default {
    name: 'App',
    components: {
        lineChart,
        barChart,
    },
    data() {
        return {
            // line
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
            setHeightBarChart: '00',
            showDatalabelsBarChart: true,
            disableLegendBarChart: true,
            labelsBarChart: ['รพ.1', 'รพ.2', 'รพ.3', 'รพ.4', 'รพ.5', 'รพ.6'],
            datasetsBarChart: [
                {
                    label: 'Votes',
                    data: [700, 800, 900, 100, 110, 120],
                    backgroundColor: ['#003eff', '#003eff', '#003eff', '#003eff', '#003eff', '#003eff'],
                    labelColortext: '#1e1e1e', //default black
                },
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
