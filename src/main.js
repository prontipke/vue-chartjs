import Vue from 'vue'
import App from './App.vue'
import Chart from 'chart.js/auto';
// import { getRelativePosition } from 'chart.js/helpers';


Vue.prototype.Chart = Chart
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
