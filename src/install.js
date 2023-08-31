import lineChart from './components/lineChart.vue'
import barChart from './components/barChart.vue'
import pieChart from './components/pieChart.vue'
const ComponentChart = {
  install(Vue) {
    Vue.component('mai-line-chartjs', lineChart)
    Vue.component('mai-bar-chartjs', barChart)
    Vue.component('mai-pie-chartjs', pieChart)
  },
}
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(ComponentChart)
}
export default ComponentChart
