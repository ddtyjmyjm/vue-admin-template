<template>
  <div class="dashboard-container">
    <div class="dashboard-text">欢迎！ {{ name }}</div>
    <div class="chart-wrapper">
      <bar-chart />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BarChart from './components/BarChart'
export default {
  name: 'Dashboard',
  components: {
    BarChart
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>
