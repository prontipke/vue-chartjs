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
        </div>
    </div>
</template>

<script>
import lineChart from './components/lineChart.vue'

export default {
    name: 'App',
    components: {
        lineChart
    },
    data() {
        return {
            // line
            setHeightChart: '200',
            showDatalabels: true,
            disableLegend:true,
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
