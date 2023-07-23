<script setup>
import TheHeader from '../components/TheHeader.vue'
import SingleSponsor from '../components/single/SingleSponsor.vue'
</script>

<script>
export default {
    name: "SinglePage",
    component: {
        TheHeader,
        SingleSponsor
    }
}
</script>

<template>
    <TheHeader />
    <SingleSponsor />
</template>

<style lang="scss" scoped></style>