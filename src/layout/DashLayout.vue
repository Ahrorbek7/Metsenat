<script>
import Chart from '../components/Chart.vue'
export default {
    name:"DashLayout",
    components:{
        Chart
    }
}
</script>
<template>
    <div>
        <Chart />
    <slot />    
    </div>
</template>