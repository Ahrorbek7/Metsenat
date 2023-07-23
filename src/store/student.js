import axios from 'axios'

export default {
    actions: {
        fetchStudents({ commit, state }, page) {
            if (typeof page == 'number') {
                state.pageNumber = page
            } else if (page == 'minus') {
                state.pageNumber--
            } else if (page == 'plus') {
                state.pageNumber++
            }
            axios.get(`https://metsenatclub.xn--h28h.uz/api/v1/student-list/?page=${state.pageNumber}`)
                .then((res) => {
                    commit("UPDATE_STUDENTS", res.data)
                })
        },
        postStudent(context, payload) {
            axios.post(`https://metsenatclub.xn--h28h.uz/api/v1/student-create/`, payload)
                .then((res) => {
                    console.log('Talaba qo`shildi: ', res);
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        getUniversity(context) {
            axios.get('https://metsenatclub.xn--h28h.uz/api/v1/institute-list/')
                .then((res) => {
                    context.commit('UPDATE_UNVERSITIES', res.data)
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        detailStudent(context, payload) {
            axios.get(`https://metsenatclub.xn--h28h.uz/api/v1/student-detail/${payload}`)
                .then((res) => {
                    context.commit('SINGLE_STUDENT', res.data)
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        updateStudent(context, payload) {
            axios.put(`https://metsenatclub.xn--h28h.uz/api/v1/student-update/${payload.id}/`, payload.data)
                .then((res) => {
                    console.log('Talaba yangilanishi: ', res);
                    context.dispatch('detailStudent', payload.id)
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    },
    mutations: {
        UPDATE_STUDENTS(state, payload) {
            state.students = payload.results
            state.pagesCount = payload.count
        },
        UPDATE_UNVERSITIES(state, payload) {
            state.universityList = payload
        },
        SINGLE_STUDENT(state, payload) {
            state.detailStudentItem = payload
        }
    },
    state: {
        students: [],
        universityList: [],
        pageNumber: 1,
        pagesCount: null,
        detailStudentItem: {}
    },
    getters: {
        getStudentsList(state) {
            return state.students
        },
        getUniversityList(state) {
            return state.universityList
        },
        studentsCount(state) {
            return {
                count: state.pagesCount,
                active: state.pageNumber
            }
        },
        singleStudent(state) {
            return state.detailStudentItem
        }
    }
}