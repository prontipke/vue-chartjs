import lineChart from './components/lineChart.vue'
const HelloWorldSimple = {
  install(Vue) {
    Vue.component('mai-line-chartjs', lineChart)
  },
}
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(HelloWorldSimple)
}
export default HelloWorldSimple
