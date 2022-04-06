<template>
    <Pie
        :chart-options="chartOptions"
        :width="220"
        :height="220"
        :chart-data="chartData"
    />
</template>

<script>
import { Pie } from 'vue-chartjs'
import { Chart, ArcElement, PieController, Tooltip } from 'chart.js'

Chart.register(ArcElement,PieController,Tooltip)

export default {
    name:'pie-chart',
    components: { Pie },
    props:{
        chartData:{
            type:Object,
            required: true
        }
    },
    data(){
        return{
            chartOptions: {
                responsive: true,
                plugins: {
                    tooltip: {
                        callbacks: {
                        label: function(context) {
                            const labelIndex = (context.datasetIndex * 2) + context.dataIndex;
                            return context.chart.data.labels[labelIndex] + ': ' + context.formattedValue + '%';
                        }
                        }
                    },
                },
            }
        }
    }
}
</script>

<style>

</style>