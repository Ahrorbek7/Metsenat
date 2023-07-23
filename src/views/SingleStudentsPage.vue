<script setup>
import TheHeader from '../components/TheHeader.vue'
import SingleStudents from '../components/single/SingleStudents.vue'
</script>

<script>
export default {
    name: "SinglePage",
    component: {
        TheHeader,
        SingleStudents
    }
}
</script>

<template>
    <TheHeader />
    <SingleStudents />
</template>

<style lang="scss" scoped></style>