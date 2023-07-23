<script setup>
import AddStudent from '../components/AddStudent.vue'
import TheHeader from '../components/TheHeader.vue';
</script>

<script>
export default {
    components: { AddStudent, TheHeader },
}
</script>


<template>
    <the-header />
    <add-student />
</template>