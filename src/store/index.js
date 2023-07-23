import { createStore } from 'vuex'
import sponsor from './sponsor.js'
import student from './student.js'
import dashboard from './dashboard.js'



const store = createStore({
    modules: {
        student,
        sponsor,
        dashboard
    },
    state() {
        return {
            tabView: [
                {
                    id: 1,
                    active: true,
                    title: 'Dashboard',
                    value: "dashboard"
                },
                {
                    id: 2,
                    active: false,
                    title: 'Homiylar',
                    value: "sponsors"
                },
                {
                    id: 3,
                    active: false,
                    title: 'Talabalar',
                    value: "students"
                }
            ],
            isModalFilterSponsor: false,
            isModalFilterStudents: false,
            sponsorSumsFilter: [
                {
                    money: 'Barchasi',
                    active: true,
                    type: 'all'
                },
                {
                    money: 1000000,
                    active: false
                },
                {
                    money: 5000000,
                    active: false
                },
                {
                    money: 7000000,
                    active: false
                },
                {
                    money: 10000000,
                    active: false
                },
                {
                    money: 30000000,
                    active: false
                },
                {
                    money: 50000000,
                    active: false
                },
            ],
            studentsFilter: 0,
            sponsorsFilter: 0,
            selectedStatus: 'all',
            selectedType: 'all',
            selectedUniversity: 'all',
        }
    },
    mutations: {
        NEW_TAB_VIEW(state, data) {
            state.tabView = data
        },
        CHANGE_TAB_ACTIVE(state, item) {
            for (const key in store.state.tabView) {
                state.tabView[key].active = false
            }
            item.active = true
        },
        CLEAR_SPONSOR_FILTER(state) {
            state.selectedStatus = 'all';
            for (const key in state.sponsorSumsFilter) {
                state.sponsorSumsFilter[key].active = false
            }
            state.sponsorSumsFilter[0].active = true
        },
        UPDATE_SPONSORS_FILTER(state) {
            state.sponsorsFilter++
        },
        CLEAR_STUDENTS_FILTER(state) {
            state.selectedUniversity = 'all';
            state.selectedType = 'all';
        },
        UPDATE_STUDENTS_FILTER(state) {
            state.studentsFilter++
        },
        TOGGLE_FILTER_SPONSOR(state) {
            state.isModalFilterSponsor = !state.isModalFilterSponsor;
        },
        TOGGLE_FILTER_STUDENTS(state) {
            state.isModalFilterStudents = !state.isModalFilterStudents;
        },
        UPDATE_SELECTED_STATUS(state, value) {
            state.selectedStatus = value;
        },
        UPDATE_SELECTED_TYPE(state, value) {
            state.selectedType = value;
        },
        UPDATE_SELECTED_UNIVERSITY(state, value) {
            state.selectedUniversity = value;
        },
    }
})


export default store