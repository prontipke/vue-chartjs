import lineChart from './components/lineChart.vue'
import barChart from './components/barChart.vue.vue'
const ComponentChart = {
  install(Vue) {
    Vue.component('mai-line-chartjs', lineChart)
    Vue.component('mai-bar-chartjs', barChart)
  },
}
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(ComponentChart)
}
export default ComponentChart
