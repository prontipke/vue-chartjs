<template>
  <div style="min-width: 500px">
    <canvas :id="chartID"></canvas>
  </div>
</template>

<script>
import { uuid } from 'vue-uuid'
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
    const formatted = (num / found.threshold).toFixed(precision) + found.suffix
    return formatted
  }
  return num
}
export default {
  props: {
    chartID: {
      type: String,
      default: uuid.v4(),
    },
  },
  data() {
    return {}
  },
  mounted() {
    console.log()
    const ctx = document.getElementById(this.chartID)

    new this.Chart(ctx, {
      type: 'line',
      plugins: [ChartDataLabels],
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: 'Votes',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1,
            borderColor: 'red',
            backgroundColor: 'red',
          },
          {
            label: 'Votes',
            data: [1, 2, 30000.5, 4, 5, 6],
            borderWidth: 1,
            borderColor: 'blue',
            backgroundColor: 'blue',
          },
        ],
      },
      options: {
        plugins: {
          // Change options for ALL labels of THIS CHART
          datalabels: {
            color: '#ffffff', // color text
            display: true, //set show
            borderRadius: 4,
            backgroundColor: function (context) {
              return context.dataset.backgroundColor
            },
            font: {
              weight: 'bold',
            },
            formatter: function (data) {
              return formatNumber(data)
            },
            padding: 3,
            align: 'top',
            anchor: 'end',
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    })
  },
  methods: {},
}
</script>

<style lang="scss" scoped></style>
