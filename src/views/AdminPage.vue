<script setup>
import TheHeader from '../components/TheHeader.vue'
import NavigationPanel from '../components/NavigationPanel.vue'


import TheDashboard from '../components/TheDashboard.vue'
import Sponsors from '../components/Sponsors.vue'
import Students from '../components/Students.vue'




// modal windows
import SponsorModalFilter from '../components/modals/SponsorModalFilter.vue'
import StudentsModalFilter from '../components/modals/StudentsModalFilter.vue'
</script>

<script>
export default {
    name: "AdminPage",
    component: {
        TheHeader,
        NavigationPanel,
        TheDashboard,
        Sponsors,
        Students,
        SponsorModalFilter,
        StudentsModalFilter,

    },
    methods: {
        updateSelectedComponent(newSelectedComponent) {
            let path = `/admin/${newSelectedComponent}`
            this.$router.push(path)
        },
    },
    computed: {
        tabActived() {
            let activeTab;
            let el = this.$store.state.tabView;
            for (const key in el) {
                if (`/admin/${el[key].value}` == this.$route.path) {
                    activeTab = this.$store.state.tabView[key].id
                    this.$store.commit('CHANGE_TAB_ACTIVE', el[key])
                    let data = JSON.stringify(el)
                    localStorage.setItem('tabView', data)
                }
            }
            return activeTab
        },
    },
    mounted() {
        if (this.$route.path === '/admin/dashboard') {
            this.selectedComponent = 'dashboard';
        } else if (this.$route.path === '/admin/sponsors') {
            this.selectedComponent = 'sponsors';
        } else if (this.$route.path === '/admin/students') {
            this.selectedComponent = 'students';
        }

        const activeItem = this.$store.state.tabView.find(item => item.active);
        if (activeItem) {
            this.$router.push(`/admin/${activeItem.value}`);
        }
    }
}
</script>


<template>
    <the-header />
    <navigation-panel @updateSelectedComponent="updateSelectedComponent" />
    <div class="wrapper">
        <TheDashboard v-if="tabActived == 1" />
        <sponsors v-else-if="tabActived == 2" />
        <students v-else-if="tabActived == 3" />
    </div>

    <sponsor-modal-filter />
    <students-modal-filter />
</template>