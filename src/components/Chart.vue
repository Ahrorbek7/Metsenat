<template>
    <div class="dash-chart">
      <apexchart ref="chart" :options="options" :series="series" type="area" height="400px" />
    </div>
  </template>
  
  <script>
  import { defineComponent, onMounted, ref } from 'vue';
  import ApexCharts from 'apexcharts';
  
  export default {
    name: 'Chart',
    props: {
      options: {
        type: Object,
        required: true
      },
      series: {
        type: Array,
        required: true
      }
    },
    setup(props) {
      const chartRef = ref(null);
  
      onMounted(() =>{
        const chartOptions = {
          ...props.options,
          series: props.series
        };
  
        const chart = new ApexCharts(chartRef.value, chartOptions);
        chart.render();
      });
  
      return {
        chartRef
      };
    }
  };
  </script>
  
  <style>
  .dash-chart {
    width: 100%;
    height: 400px;
  }
  </style>
  